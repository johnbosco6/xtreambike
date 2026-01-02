"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, Truck, Shield, Check, ChevronDown, ChevronUp, Store, Home, Loader2, X } from "lucide-react"
import MondialRelayWidget from "./mondial-relay-widget"

type ShippingMethod = "home" | "relay"

export default function CheckoutContent() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentStep, setCurrentStep] = useState(1)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("home")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const [formData, setFormData] = useState({
    // Contact Info (Always required)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Address Info (For Home Delivery)
    address: "",
    city: "",
    postalCode: "",
    country: "France",

    // Payment Info
    cardNumber: "", // Kept for UI but not processed if using SumUp
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [selectedRelayPoint, setSelectedRelayPoint] = useState<any>(null)

  const [paymentStatus, setPaymentStatus] = useState<"idle" | "verifying" | "paid" | "failed">("idle")

  // Check for SumUp callback
  useEffect(() => {
    const checkoutId = searchParams.get("checkoutId") || searchParams.get("id")
    const paymentSuccess = searchParams.get("payment-success")

    if (paymentSuccess === "true") {
      // Legacy/Manual mock success
      setCurrentStep(4)
      clearCart()
      return
    }

    if (checkoutId) {
      setPaymentStatus("verifying")
      fetch(`/api/sumup/verify?checkoutId=${checkoutId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "PAID") {
            setPaymentStatus("paid")
            setCurrentStep(4)
            clearCart()
          } else {
            setPaymentStatus("failed")
            // Don't advance step, stay on checkout to retry
          }
        })
        .catch(err => {
          console.error("Verification failed", err)
          setPaymentStatus("failed")
        })
    }
  }, [searchParams, clearCart])

  const getDeliveryCost = (country: string, method: ShippingMethod) => {
    // Mondial Relay is usually cheaper
    if (method === "relay") return 3.50

    const deliveryCosts: Record<string, number> = {
      France: 4.19,
      Spain: 6.47,
      Belgium: 4.43,
      Italy: 6.8,
      Luxembourg: 4.6,
      Poland: 6.5,
      Portugal: 6.8,
    }
    return deliveryCosts[country] || 4.19
  }

  const deliveryCost = getDeliveryCost(formData.country, shippingMethod)
  const totalWithDelivery = state.total + deliveryCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      if (shippingMethod === "relay" && !selectedRelayPoint) {
        alert("Veuillez sélectionner un Point Relais.")
        return
      }
      setCurrentStep(2)
      return
    }

    if (currentStep === 2) {
      setCurrentStep(3)
      return
    }

    if (currentStep === 3) {
      // Initiate SumUp Payment
      setIsProcessingPayment(true)
      try {
        // Use the checkout page itself as the return URL to handle callback logic
        const returnUrl = `${window.location.origin}/checkout`

        const response = await fetch("/api/sumup/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalWithDelivery,
            email: formData.email,
            returnUrl: returnUrl,
            items: state.items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              color: item.color
            })),
            customerName: `${formData.firstName} ${formData.lastName}`,
            shippingAddress: shippingMethod === "home" ? {
              address: formData.address,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country
            } : null,
            deliveryMethod: shippingMethod,
            deliveryDetails: shippingMethod === "relay" ? selectedRelayPoint : null,
            shippingCost: deliveryCost
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Payment initialization failed")
        }

        if (data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else if (data.checkoutId) {
          // Redirect to SumUp Checkout Page
          // We use the standard checkout URL structure
          window.location.href = `https://checkout.sumup.com/page/pay?id=${data.checkoutId}`
        } else {
          throw new Error("No checkout ID received")
        }

      } catch (err: any) {
        console.error(err)
        alert("Une erreur est survenue lors de l'initialisation du paiement: " + err.message)
        setIsProcessingPayment(false)
      }
    }
  }

  if (state.items.length === 0 && currentStep !== 4 && paymentStatus !== "failed") {
    return (
      <div className="text-center py-8 md:py-16">
        <div className="glass-card p-6 md:p-8 rounded-xl max-w-md mx-auto">
          <h2 className="text-lg md:text-xl font-light mb-4">Votre panier est vide</h2>
          <p className="font-light opacity-70 mb-6 text-sm md:text-base">
            Ajoutez des articles à votre panier avant de procéder au paiement.
          </p>
          <Link href="/shop" className="button-primary w-full text-center block">
            Retourner à la boutique
          </Link>
        </div>
      </div>
    )
  }

  // Verifying State
  if (paymentStatus === "verifying") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-[#0BEFD5] mb-4" />
        <h2 className="text-xl font-light">Vérification de votre paiement...</h2>
      </div>
    )
  }

  // Success page
  if (currentStep === 4) {
    return (
      <div className="text-center py-8 md:py-16">
        <div className="glass-card p-6 md:p-8 rounded-xl max-w-md mx-auto relative overflow-hidden">
          {/* Success Banner Background */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#0BEFD5]"></div>

          <div className="w-16 h-16 bg-[#0BEFD5]/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-[#0BEFD5]/50">
            <Check className="w-8 h-8 text-[#0BEFD5]" />
          </div>

          <h2 className="text-2xl font-light mb-2 text-[#0BEFD5]">Paiement Validé</h2>
          <p className="text-lg font-medium mb-6">Commande confirmée !</p>

          <div className="bg-white/5 rounded-lg p-4 mb-8 text-left border border-white/10">
            <p className="font-light text-sm opacity-80 mb-2">
              Merci pour votre achat. Votre commande a bien été enregistrée.
            </p>
            <p className="font-bold text-sm text-white">
              Veuillez surveiller votre boîte mail pour la confirmation et les détails d'expédition.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/shop" className="button-primary w-full text-center block">
              Continuer vos achats
            </Link>
            <Link href="/" className="button-secondary w-full text-center block">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Mobile Order Summary Toggle */}
      <div className="lg:hidden">
        {/* Failure Banner */}
        {paymentStatus === "failed" && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-red-400 mb-2">Paiement Refusé</h3>
            <p className="text-sm opacity-80 mb-4">
              La transaction n'a pas pu aboutir. Veuillez vérifier vos informations ou utiliser un autre moyen de paiement.
            </p>
            <button
              onClick={() => setPaymentStatus("idle")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full glass-card p-4 rounded-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Voir le résumé</span>
            <span className="text-lg font-medium">{totalWithDelivery.toFixed(2)} €</span>
          </div>
          {showOrderSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showOrderSummary && (
          <div className="glass-card p-4 rounded-xl mt-3">
            <div className="space-y-3 mb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-10 h-10 bg-black/20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-light line-clamp-1">{item.name}</h4>
                    <div className="flex flex-col mt-1 gap-1">
                      <span className="text-xs opacity-70">
                        {item.color && <span className="mr-2">Couleur: {item.color}</span>}
                        Qté: {item.quantity}
                      </span>
                      <span className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Sous-total</span>
                <span>{state.total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Livraison</span>
                <span className="text-[#0BEFD5]">{deliveryCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-medium border-t border-white/10 pt-2">
                <span>Total</span>
                <span>{totalWithDelivery.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="glass-card p-4 md:p-6 rounded-xl">
            {/* Progress Steps */}
            <div className="mb-6 md:mb-8">
              {/* Failure Banner (Desktop/Main) */}
              {paymentStatus === "failed" && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <X className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-red-400 mb-2">Paiement Refusé</h3>
                  <p className="text-sm opacity-80 mb-4">
                    La transaction n'a pas pu aboutir. Veuillez vérifier vos informations ou utiliser un autre moyen de paiement.
                  </p>
                  <button
                    onClick={() => setPaymentStatus("idle")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step ? "bg-[#0BEFD5] text-black" : "bg-white/10 text-white/50"
                          }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`mt-2 text-xs md:text-sm text-center ${currentStep >= step ? "text-white" : "text-white/50"
                          }`}
                      >
                        {step === 1 ? "Livraison" : step === 2 ? "Paiement" : "Confirmation"}
                      </span>
                    </div>
                    {step < 3 && (
                      <div className={`h-0.5 w-full mx-2 ${currentStep > step ? "bg-[#0BEFD5]" : "bg-white/10"}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg md:text-xl font-light">Mode de livraison</h2>

                  {/* Shipping Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setShippingMethod("home")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${shippingMethod === "home"
                        ? "bg-[#0BEFD5]/10 border-[#0BEFD5]"
                        : "bg-white/5 border-transparent hover:bg-white/10"
                        }`}
                    >
                      <div className={`p-2 rounded-full ${shippingMethod === "home" ? "bg-[#0BEFD5] text-black" : "bg-white/10"}`}>
                        <Home className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Livraison à Domicile</div>
                        <div className="text-sm opacity-70 mt-1">Livré directement chez vous</div>
                        <div className="text-sm font-medium mt-2 text-[#0BEFD5]">
                          {getDeliveryCost(formData.country, "home").toFixed(2)} €
                        </div>
                      </div>
                      {shippingMethod === "home" && <div className="ml-auto bg-[#0BEFD5] p-1 rounded-full"><Check className="w-3 h-3 text-black" /></div>}
                    </div>

                    <div
                      onClick={() => setShippingMethod("relay")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${shippingMethod === "relay"
                        ? "bg-[#E3003F]/10 border-[#E3003F]"
                        : "bg-white/5 border-transparent hover:bg-white/10"
                        }`}
                    >
                      <div className={`p-2 rounded-full ${shippingMethod === "relay" ? "bg-[#E3003F] text-white" : "bg-white/10"}`}>
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Mondial Relay</div>
                        <div className="text-sm opacity-70 mt-1">Retrait en Point Relais®</div>
                        <div className="text-sm font-medium mt-2 text-[#E3003F]">
                          {getDeliveryCost(formData.country, "relay").toFixed(2)} €
                        </div>
                      </div>
                      {shippingMethod === "relay" && <div className="ml-auto bg-[#E3003F] p-1 rounded-full"><Check className="w-3 h-3 text-white" /></div>}
                    </div>
                  </div>

                  {/* Common Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-md font-medium pt-4">Vos coordonnées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light mb-2">Prénom *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light mb-2">Nom *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-light mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>

                  {/* Address Form (Only for Home Delivery) */}
                  {shippingMethod === "home" && (
                    <div className="space-y-4 pt-2">
                      <h3 className="text-md font-medium">Adresse de livraison</h3>
                      <div>
                        <label className="block text-sm font-light mb-2">Adresse *</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                          placeholder="123 Rue de la République"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1">
                          <label className="block text-sm font-light mb-2">Ville *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                            placeholder="Paris"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-light mb-2">Code postal *</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                            placeholder="75001"
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-sm font-light mb-2">Pays *</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base appearance-none"
                          >
                            <option value="France">France</option>
                            <option value="Spain">Espagne</option>
                            <option value="Belgium">Belgique</option>
                            <option value="Italy">Italie</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Poland">Pologne</option>
                            <option value="Portugal">Portugal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mondial Relay Widget (Only for Relay Method) */}
                  {shippingMethod === "relay" && (
                    <div className="pt-2">
                      <MondialRelayWidget
                        onSelect={setSelectedRelayPoint}
                        selectedPoint={selectedRelayPoint}
                      />
                    </div>
                  )}

                  <button type="submit" className="button-primary w-full py-4 mt-6">
                    Continuer vers le paiement
                  </button>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-lg md:text-xl font-light mb-4 md:mb-6">Récapitulatif & Paiement</h2>

                  <div className="glass-card p-4 rounded-xl border border-white/10">
                    <p className="text-sm opacity-80 mb-4">Vous êtes sur le point de payer avec <strong>SumUp</strong>.</p>

                    {/* Supported Payment Methods Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-white/10 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <CreditCard className="w-3 h-3" /> Carte Bancaire
                      </div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Apple Pay</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Google Pay</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Visa</div>
                      <div className="bg-white/10 px-2 py-1 rounded text-xs">Mastercard</div>
                    </div>

                    <p className="text-xs opacity-50">Vous serez redirigé vers la page sécurisée de SumUp pour finaliser votre transaction en toute sécurité.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={() => setCurrentStep(1)} className="button-secondary flex-1 py-4">
                      Retour
                    </button>
                    <button type="submit" className="button-primary flex-1 py-4">
                      Vérifier la commande
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-lg md:text-xl font-light mb-4 md:mb-6">Confirmation de commande</h2>

                  <div className="glass-effect p-4 rounded-lg">
                    <h3 className="font-medium mb-3 text-sm md:text-base">
                      {shippingMethod === "home" ? "Adresse de livraison" : "Point Relais"}
                    </h3>
                    <p className="text-sm opacity-80">
                      <strong>{formData.firstName} {formData.lastName}</strong>
                      <br />
                      {formData.email} | {formData.phone}
                      <br /><br />
                      {shippingMethod === "home" ? (
                        <>
                          {formData.address}
                          <br />
                          {formData.postalCode} {formData.city}
                          <br />
                          {formData.country}
                        </>
                      ) : (
                        <>
                          <span className="text-[#E3003F]">Point Relais: {selectedRelayPoint?.name}</span>
                          <br />
                          {selectedRelayPoint?.address}
                          <br />
                          {selectedRelayPoint?.zipCode} {selectedRelayPoint?.city}
                        </>
                      )}
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded-lg">
                    <h3 className="font-medium mb-3 text-sm md:text-base">Paiement</h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-white p-1 rounded">
                        {/* Simple SumUp Icon/Text representation */}
                        <span className="text-black font-bold text-xs">sumup</span>
                      </div>
                      <span className="text-sm">Paiement sécurisé via SumUp</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={isProcessingPayment}
                      className="button-secondary flex-1 py-4 disabled:opacity-50"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="button-primary flex-1 py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessingPayment ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                      {isProcessingPayment ? "Traitement..." : `Payer ${totalWithDelivery.toFixed(2)} €`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Desktop Order Summary */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="glass-card p-6 rounded-xl sticky top-24">
            <h2 className="text-xl font-light mb-6">Votre commande</h2>

            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative w-12 h-12 bg-black/20 rounded-lg overflow-hidden">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-light line-clamp-1">{item.name}</h4>
                    <div className="flex flex-col mt-1 gap-1">
                      <span className="text-xs opacity-70">
                        {item.color && <span className="mr-2">Couleur: {item.color}</span>}
                        Qté: {item.quantity}
                      </span>
                      <span className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Sous-total</span>
                <span>{state.total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Livraison</span>
                <span className="text-[#0BEFD5]">{deliveryCost.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-lg font-medium border-t border-white/10 pt-3">
                <span>Total</span>
                <span>{totalWithDelivery.toFixed(2)} €</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {shippingMethod === "home" ? (
                <div className="flex items-center gap-2 text-xs opacity-70">
                  <Truck className="w-4 h-4" />
                  <span>Livraison à domicile</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs opacity-70 text-[#E3003F]">
                  <Store className="w-4 h-4" />
                  <span>Retrait en Point Relais</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs opacity-70">
                <Shield className="w-4 h-4" />
                <span>Paiement sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2 text-xs opacity-70">
                <CreditCard className="w-4 h-4" />
                <span>Garantie satisfait ou remboursé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
