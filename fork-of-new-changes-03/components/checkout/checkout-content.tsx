"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { CreditCard, Truck, Shield, Check, ChevronDown, ChevronUp } from "lucide-react"

export default function CheckoutContent() {
  const { state, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const getDeliveryCost = (country: string) => {
    const deliveryCosts = {
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

  const deliveryCost = getDeliveryCost(formData.country)
  const totalWithDelivery = state.total + deliveryCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      setCurrentStep(4) // Success step
    }, 2000)
  }

  if (state.items.length === 0 && currentStep !== 4) {
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

  // Success page
  if (currentStep === 4) {
    return (
      <div className="text-center py-8 md:py-16">
        <div className="glass-card p-6 md:p-8 rounded-xl max-w-md mx-auto">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0BEFD5]/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Check className="w-6 h-6 md:w-8 md:h-8 text-[#0BEFD5]" />
          </div>
          <h2 className="text-lg md:text-xl font-light mb-4">Commande confirmée !</h2>
          <p className="font-light opacity-70 mb-6 text-sm md:text-base">
            Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
          </p>
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
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs opacity-70">Qté: {item.quantity}</span>
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
            {/* Mobile-Optimized Progress Steps */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step ? "bg-[#0BEFD5] text-black" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`mt-2 text-xs md:text-sm text-center ${
                          currentStep >= step ? "text-white" : "text-white/50"
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
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-lg md:text-xl font-light mb-4 md:mb-6">Informations de livraison</h2>

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

                  <button type="button" onClick={() => setCurrentStep(2)} className="button-primary w-full py-4">
                    Continuer vers le paiement
                  </button>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-lg md:text-xl font-light mb-4 md:mb-6">Informations de paiement</h2>

                  <div>
                    <label className="block text-sm font-light mb-2">Numéro de carte *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light mb-2">Date d'expiration *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light mb-2">Nom sur la carte *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-base"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={() => setCurrentStep(1)} className="button-secondary flex-1 py-4">
                      Retour
                    </button>
                    <button type="button" onClick={() => setCurrentStep(3)} className="button-primary flex-1 py-4">
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
                    <h3 className="font-medium mb-3 text-sm md:text-base">Adresse de livraison</h3>
                    <p className="text-sm opacity-80">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.postalCode} {formData.city}
                      <br />
                      {formData.country}
                    </p>
                  </div>

                  <div className="glass-effect p-4 rounded-lg">
                    <h3 className="font-medium mb-3 text-sm md:text-base">Méthode de paiement</h3>
                    <p className="text-sm opacity-80">Carte se terminant par {formData.cardNumber.slice(-4)}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={() => setCurrentStep(2)} className="button-secondary flex-1 py-4">
                      Retour
                    </button>
                    <button type="submit" className="button-primary flex-1 py-4">
                      Confirmer la commande
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
                    <h4 className="text-sm font-light line-clamp-2">{item.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs opacity-70">Qté: {item.quantity}</span>
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
              <div className="flex items-center gap-2 text-xs opacity-70">
                <Truck className="w-4 h-4" />
                <span>Livraison gratuite en France</span>
              </div>
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
