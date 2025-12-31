"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown, Search } from "lucide-react"
import { products } from "@/lib/products-data"

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const initialBrand = searchParams.get("brand") || ""
  const [sortOption, setSortOption] = useState("brand-asc")
  const [searchQuery, setSearchQuery] = useState(initialBrand)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.compatibility?.some((comp) => comp.toLowerCase().includes(searchLower))

      return matchesSearch
    })
  }, [searchQuery])

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

  return (
    <div>
      {/* Controls Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher votre moto (ex: YZ125, CRF450...)"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-lg leading-5 bg-white/5 text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-[#0BEFD5] sm:text-sm transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Trier par:</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 text-white py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
            >
              <option value="brand-asc" className="text-black">Marque (A-Z)</option>
              {/* <option value="brand-desc">Marque (Z-A)</option> */}

              <option value="price-asc" className="text-black">Prix croissant</option>
              <option value="price-desc" className="text-black">Prix décroissant</option>
              {/* <option value="featured">Pertinence</option> */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <ArrowUpDown className="h-4 w-4" />
            </div>
          </div>
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
                      <div className="text-xs font-semibold text-[#0BEFD5] tracking-wider uppercase bg-[#0BEFD5]/10 px-2 py-0.5 rounded">
                        {product.brand}
                      </div>
                      <div className="text-xs text-gray-400">{product.category}</div>
                    </div>
                    <h3 className="text-sm font-medium leading-snug mb-3 group-hover:text-[#0BEFD5] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {/* Colors */}
                    <div className="flex gap-1.5">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>

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
        </div>
      )}
    </div>
  )
}
