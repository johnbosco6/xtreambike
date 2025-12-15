import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import CartContent from "@/components/cart/cart-content"
import BackButton from "@/components/navigation/back-button"

export default function CartPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* PWA Back Navigation */}
          <BackButton fallbackUrl="/shop" label="Continuer vos achats" />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-4">
              Votre <span className="text-gradient">Panier</span>
            </h1>
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              Vérifiez vos articles avant de procéder au paiement.
            </p>
          </div>

          <CartContent />
        </div>
      </div>
      <FooterLegal />
    </main>
  )
}
