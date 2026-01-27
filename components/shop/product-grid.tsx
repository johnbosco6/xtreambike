"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown, Search, Filter, X } from "lucide-react"
import { products } from "@/lib/products-data"
import { brands } from "@/lib/brands"

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get("brand") || ""

  // States
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState(initialBrand)
  const [selectedType, setSelectedType] = useState("")
  const [selectedDisplacement, setSelectedDisplacement] = useState<number | "">("")
  const [selectedYear, setSelectedYear] = useState<number | "">("")
  const [selectedColor, setSelectedColor] = useState("")
  const [sortOption, setSortOption] = useState("brand-asc")

  // Sync URL params with state
  useEffect(() => {
    const brandFromUrl = searchParams.get("brand")
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl)
    }
  }, [searchParams])

  // Available options derived from data
  const availableDisplacements = useMemo(() => {
    const allDisplacements = products.flatMap((p) => p.displacements || [])
    return Array.from(new Set(allDisplacements)).sort((a, b) => a - b)
  }, [])

  const availableTypes = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort()
  }, [])

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    products.forEach((p) => {
      if (p.yearStart && p.yearEnd) {
        for (let year = p.yearStart; year <= p.yearEnd; year++) {
          years.add(year)
        }
      }
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [])

  const availableColors = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.color).filter(Boolean))).sort()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Search Query
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.compatibility?.some((comp) => comp.toLowerCase().includes(searchLower)) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.features?.some((feature) => feature.toLowerCase().includes(searchLower))

      if (!matchesSearch) return false

      // 2. Brand Filter
      // Case-insensitive comparison for robustness
      if (selectedBrand && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false

      // 3. Type Filter
      if (selectedType && product.category !== selectedType) return false

      // 4. Displacement Filter
      if (selectedDisplacement && (!product.displacements || !product.displacements.includes(selectedDisplacement))) {
        return false
      }

      // 5. Year Filter
      if (selectedYear && product.yearStart && product.yearEnd) {
        if (selectedYear < product.yearStart || selectedYear > product.yearEnd) {
          return false
        }
      }

      // 6. Color Filter
      if (selectedColor && product.color !== selectedColor) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedBrand, selectedType, selectedDisplacement, selectedYear, selectedColor])

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.priceNumber - b.priceNumber
        case "price-desc":
          return b.priceNumber - a.priceNumber
        case "brand-asc":
          return a.brand.localeCompare(b.brand)
        case "brand-desc":
          return b.brand.localeCompare(a.brand)
        default:
          return a.brand.localeCompare(b.brand)
      }
    })
  }, [filteredProducts, sortOption])

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedBrand("")
    setSelectedType("")
    setSelectedDisplacement("")
    setSelectedYear("")
    setSelectedColor("")
  }

  const hasActiveFilters = searchQuery || selectedBrand || selectedType || selectedDisplacement || selectedYear || selectedColor

  return (
    <div>
      {/* Brand Logos Filter */}
      <div className="mb-10">
        <h3 className="text-lg font-light mb-4 opacity-80">Sélectionnez votre marque</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {brands.map((brand, index) => {
            const isSelected = selectedBrand === brand.name
            return (
              <button
                key={index}
                onClick={() => setSelectedBrand(isSelected ? "" : brand.name)}
                className={`
                  flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl p-4 flex items-center justify-center transition-all duration-300
                  ${isSelected
                    ? "bg-gradient-to-br from-[#0BEFD5]/20 to-[#0BEFD5]/5 border-[#0BEFD5] shadow-[0_0_15px_rgba(11,239,213,0.3)] scale-105"
                    : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                  }
                  border backdrop-blur-sm group
                `}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    fill
                    className={`object-contain transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] brightness-125 contrast-125 ${isSelected ? "scale-110" : "hover:scale-105"}`}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher (ex: CRF450, Protection cadre...)"
            className="block w-full pl-10 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          {/* Marque Dropdown (Mobile/Desktop Sync) */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="flex-1 min-w-[140px] bg-black/20 border border-white/10 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
          >
            <option value="">Toutes marques</option>
            {brands.map((b) => (
              <option key={b.name} value={b.name} className="text-black">{b.name}</option>
            ))}
          </select>

          {/* Cylindrée */}
          <select
            value={selectedDisplacement}
            onChange={(e) => setSelectedDisplacement(e.target.value ? Number(e.target.value) : "")}
            className="flex-1 min-w-[120px] bg-black/20 border border-white/10 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
          >
            <option value="">Cylindrée</option>
            {availableDisplacements.map((d) => (
              <option key={d} value={d} className="text-black">{d}cc</option>
            ))}
          </select>

          {/* Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 min-w-[180px] bg-black/20 border border-white/10 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
          >
            <option value="">Type de produit</option>
            {availableTypes.map((t) => (
              <option key={t} value={t} className="text-black">{t}</option>
            ))}
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : "")}
            className="flex-1 min-w-[120px] bg-black/20 border border-white/10 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
          >
            <option value="">Année</option>
            {availableYears.map((y) => (
              <option key={y} value={y} className="text-black">{y}</option>
            ))}
          </select>

          {/* Color */}
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="flex-1 min-w-[120px] bg-black/20 border border-white/10 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
          >
            <option value="">Couleur</option>
            {availableColors.map((c) => (
              <option key={c} value={c} className="text-black">{c}</option>
            ))}
          </select>

          {/* Sort */}
          <div className="relative min-w-[160px]">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full appearance-none bg-black/20 border border-white/10 text-white py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
            >
              <option value="brand-asc" className="text-black">Marque (A-Z)</option>
              {/* <option value="brand-desc">Marque (Z-A)</option> */}
              <option value="price-asc" className="text-black">Prix croissant</option>
              <option value="price-desc" className="text-black">Prix décroissant</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ArrowUpDown className="h-4 w-4" />
            </div>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Effacer</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Link href={`/shop/product/${product.id}`} key={product.id} className="group block h-full">
              <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(11,239,213,0.15)] hover:border-[#0BEFD5]/30 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-[#0046BD]/20 to-[#FFFFFF]/10 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                  <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-2"
                    />
                  </div>
                  {/* Badge */}
                  {product.inStock && (
                    <div className="absolute top-3 right-3 bg-[#0BEFD5] text-black text-[10px] font-bold px-2 py-1 rounded">
                      EN STOCK
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-black/40 backdrop-blur-sm">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      {/* Brand & Displacement Badge */}
                      <div className="flex gap-1 flex-wrap">
                        <div className="text-xs font-semibold text-[#0BEFD5] tracking-wider uppercase bg-[#0BEFD5]/10 px-2 py-0.5 rounded">
                          {product.brand}
                        </div>
                        {product.displacements && product.displacements.length > 0 && (
                          <div className="text-xs font-semibold text-white/70 tracking-wider uppercase bg-white/5 px-2 py-0.5 rounded">
                            {product.displacements.length > 1 ? "MULTI" : `${product.displacements[0]}cc`}
                          </div>
                        )}
                      </div>
                      {/* <div className="text-xs text-gray-400">{product.category}</div> */}
                    </div>
                    <h3 className="text-sm font-medium leading-snug mb-3 group-hover:text-[#0BEFD5] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    {/* Category Tag */}
                    <p className="text-xs text-gray-400 mb-3">{product.category}</p>
                  </div>

                  <div className="space-y-3">
                    {/* Color Badge */}
                    {product.color && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-white/30"
                          style={{ backgroundColor: product.colorHex }}
                          title={product.color}
                        />
                        <span className="text-xs text-gray-400">{product.color}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-lg font-bold text-white">{product.price}</span>
                      <span className="text-xs text-[#0BEFD5] border border-[#0BEFD5] px-2 py-1 rounded hover:bg-[#0BEFD5] hover:text-black transition-colors uppercase font-medium">
                        Voir
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-card rounded-xl">
          <p className="text-xl text-gray-300 mb-2">Aucun produit trouvé</p>
          <p className="text-gray-500">Essayez de modifier votre recherche ou vos filtres</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-[#0BEFD5] hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      )}
    </div>
  )
}
