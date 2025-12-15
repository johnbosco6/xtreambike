import Link from "next/link"
import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import ProductGallery from "@/components/shop/product-gallery"
import ProductInfo from "@/components/shop/product-info"
import RelatedProducts from "@/components/shop/related-products"
import PaymentMethods from "@/components/shop/payment-methods"
import BackButton from "@/components/navigation/back-button"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* PWA Back Navigation */}
          <div className="pt-12 md:pt-16 lg:pt-20">
            <BackButton fallbackUrl="/shop" label="Retour à la boutique" />
          </div>

          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8">
            <nav className="flex text-xs md:text-sm opacity-70 overflow-x-auto pb-2 whitespace-nowrap">
              <Link href="/" className="hover:text-[#FFFF00]">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <Link href="/shop" className="hover:text-[#FFFF00]">
                Boutique
              </Link>
              <span className="mx-2">/</span>
              <span>Protection de cadre</span>
            </nav>
          </div>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
            <ProductGallery productId={params.id} />
            <ProductInfo productId={params.id} />
          </div>

          {/* Payment Methods */}
          <PaymentMethods />

          {/* Related Products */}
          <RelatedProducts />
        </div>
      </div>
      <FooterLegal />
    </main>
  )
}
