import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import CheckoutContent from "@/components/checkout/checkout-content"
import BackButton from "@/components/navigation/back-button"

export default function CheckoutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-24 md:pt-32 lg:pt-36 pb-8 md:pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* PWA Back Navigation */}
          <div className="pt-8 md:pt-12 lg:pt-16">
            <BackButton fallbackUrl="/cart" label="Retour au panier" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider uppercase mb-3 md:mb-4">
              <span className="text-gradient">Finaliser</span> votre commande
            </h1>
            <p className="text-sm md:text-base lg:text-lg font-light opacity-70 mb-4 md:mb-8">
              Quelques étapes simples pour recevoir vos protections X-Trem Grip.
            </p>
          </div>

          <CheckoutContent />
        </div>
      </div>
      <FooterLegal />
    </main>
  )
}
