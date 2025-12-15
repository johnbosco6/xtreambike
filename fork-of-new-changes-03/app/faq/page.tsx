import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import FaqAccordion from "@/components/faq/faq-accordion"
import FaqContact from "@/components/faq/faq-contact"
import BackButton from "@/components/navigation/back-button"

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* PWA Back Navigation */}
          <BackButton fallbackUrl="/" label="Retour à l'accueil" />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-4">
              Questions <span className="text-gradient">Fréquentes</span>
            </h1>
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              Trouvez rapidement des réponses à vos questions concernant nos produits, commandes et services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FaqAccordion />
            </div>
            <div>
              <FaqContact />
            </div>
          </div>
        </div>
      </div>
      <FooterLegal />
    </main>
  )
}
