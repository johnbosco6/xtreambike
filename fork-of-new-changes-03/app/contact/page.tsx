import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import BackButton from "@/components/navigation/back-button"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-32 md:pt-36 lg:pt-40 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* PWA Back Navigation */}
          <BackButton fallbackUrl="/" label="Retour à l'accueil" />

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-wider uppercase mb-4">
              Contactez <span className="text-gradient">Nous</span>
            </h1>
            <p className="text-base md:text-lg font-light opacity-70 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre
              choix de produits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <FooterLegal />
    </main>
  )
}
