"use client"

import { useState } from "react"
import ProductGrid from "@/components/shop/product-grid"
import FilterSidebar from "@/components/shop/filter-sidebar"
import BrandCategories from "@/components/shop/brand-categories"
import { Menu, X, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ShopPage() {
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    priceRange: [0, 100] as [number, number],
  })

  const handleBrandSelect = (brand: string | null) => {
    setSelectedBrand(brand)
    if (brand && brand !== "ALL") {
      setFilters({
        ...filters,
        brands: [brand],
      })
    } else if (brand === "ALL") {
      setFilters({
        ...filters,
        brands: [],
      })
    } else {
      setFilters({
        brands: [],
        categories: [],
        priceRange: [0, 100] as [number, number],
      })
    }
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  const showProducts = selectedBrand !== null

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
              alt="X-tream Grip"
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
              {showProducts
                ? `Protections X-tream Grip pour ${selectedBrand === "ALL" ? "toutes les marques" : selectedBrand}`
                : "Découvrez notre gamme complète de protections X-tream Grip"}
            </p>
          </div>

          {showProducts && (
            <button
              className="flex-shrink-0 lg:hidden glass-effect p-2 sm:p-3 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
              aria-label={showFilters ? "Fermer les filtres" : "Ouvrir les filtres"}
            >
              {showFilters ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          )}
        </div>

        {!showProducts ? (
          <BrandCategories selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 mb-4 sm:mb-6 lg:mb-0`}>
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>

            <div className="flex-1 min-w-0">
              <BrandCategories selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
              <ProductGrid filters={filters} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
