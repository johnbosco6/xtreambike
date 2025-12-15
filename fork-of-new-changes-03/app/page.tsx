import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BrandStory from "@/components/brand-story"
import ValuesSection from "@/components/values-section"
import BrandsSection from "@/components/brands-section"
import TestimonialSection from "@/components/testimonial-section"
import CTASection from "@/components/cta-section"
import FooterLegal from "@/components/footer-legal"
import ProductShowcase from "@/components/product-showcase"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <BrandStory />
      <ValuesSection />
      <BrandsSection />
      <TestimonialSection />
      <CTASection />
      <ProductShowcase />
      <FooterLegal />
    </main>
  )
}
