import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import AboutHero from "@/components/about/about-hero"
import AboutStory from "@/components/about/about-story"
import AboutValues from "@/components/about/about-values"
import AboutPartners from "@/components/about/about-partners"
import BackButton from "@/components/navigation/back-button"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {/* PWA Back Navigation */}
      <div className="container mx-auto px-4 lg:px-6 pt-32 md:pt-36 lg:pt-40">
        <BackButton fallbackUrl="/" label="Retour à l'accueil" />
      </div>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutPartners />
      <FooterLegal />
    </main>
  )
}
