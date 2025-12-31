"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import ProductGrid from "@/components/shop/product-grid"

export default function ShopPage() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={handleBack}
            className="flex-shrink-0 glass-effect p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-colors mt-1"
            aria-label="Retour"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex-shrink-0 sm:hidden">
            <Image
              src="/images/logo.png"
              alt="X-Trem Grip"
              width={40}
              height={40}
              className="w-8 h-8 object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-1 sm:mb-2 leading-tight">
              Boutique
            </h1>
            <p className="text-xs sm:text-sm md:text-base opacity-70 leading-relaxed">
              Découvrez notre gamme complète de protections X-Trem Grip
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="text-center py-20 text-gray-500">Chargement des produits...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  )
}
