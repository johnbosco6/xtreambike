"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    brands: string[]
    categories: string[]
    priceRange: [number, number]
  }
  onFiltersChange: (filters: any) => void
}

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    categories: true,
    price: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]

    onFiltersChange({
      ...filters,
      brands: newBrands,
    })
  }

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]

    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      brands: [],
      categories: [],
      priceRange: [0, 100] as [number, number],
    })
  }

  const brands = [
    "Beta",
    "Fantic",
    "GasGas",
    "Honda",
    "Husqvarna",
    "Kawasaki",
    "Kove",
    "KTM",
    "Sherco",
    "Stark Varg",
    "Suzuki",
    "Triumph",
    "YCF",
    "Yamaha",
  ]

  const categories = ["50cc", "65cc", "80cc", "85cc", "125cc", "150cc", "250cc", "300cc", "350cc", "400cc", "450cc", "Électrique", "Rally", "Accessoires", "Protection plastique"]

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Filtres</h2>
        <button onClick={clearAllFilters} className="text-sm text-[#0BEFD5] hover:text-[#0BEFD5]/80 transition-colors">
          Effacer tout
        </button>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("brands")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium">Marque</h3>
          {expandedSections.brands ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.brands && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="rounded border-white/20 bg-transparent text-[#0BEFD5] focus:ring-[#0BEFD5]"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium">Cylindrée</h3>
          {expandedSections.categories ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-white/20 bg-transparent text-[#0BEFD5] focus:ring-[#0BEFD5]"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium">Prix</h3>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">€{filters.priceRange[0]}</span>
              <span className="text-sm">-</span>
              <span className="text-sm">€{filters.priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={filters.priceRange[1]}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)] as [number, number],
                })
              }
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        )}
      </div>
    </div>
  )
}
