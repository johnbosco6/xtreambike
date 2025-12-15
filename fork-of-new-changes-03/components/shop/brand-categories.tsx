"use client"

import { ArrowLeft } from "lucide-react"

interface BrandCategoriesProps {
  selectedBrand: string | null
  onBrandSelect: (brand: string | null) => void
}

export default function BrandCategories({ selectedBrand, onBrandSelect }: BrandCategoriesProps) {
  const brands = [
    {
      name: "YAMAHA",
      description: "Motocross & Enduro",
    },
    {
      name: "KAWASAKI",
      description: "Motocross",
    },
    {
      name: "HONDA",
      description: "Motocross",
    },
    {
      name: "SUZUKI",
      description: "Motocross",
    },
    {
      name: "STARK",
      description: "Électrique",
    },
    {
      name: "FANTIC",
      description: "Enduro",
    },
    {
      name: "BETA",
      description: "Enduro",
    },
    {
      name: "HUSQVARNA",
      description: "Motocross",
    },
    {
      name: "KOVE",
      description: "Rally",
    },
    {
      name: "TRIUMPH",
      description: "Motocross",
    },
    {
      name: "WORKS CONNECTION",
      description: "Accessoires",
    },
  ]

  if (selectedBrand) {
    const brand = brands.find((b) => b.name === selectedBrand)
    return (
      <div className="mb-8">
        <button
          onClick={() => onBrandSelect(null)}
          className="flex items-center gap-2 glass-effect px-6 py-3 rounded-lg text-sm mb-6 hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-white/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux marques
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-light mb-2">{selectedBrand}</h2>
          <p className="text-sm opacity-70">{brand?.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-light mb-4">Choisissez votre marque</h2>
        <p className="text-sm md:text-base opacity-70">
          Sélectionnez la marque de votre moto pour découvrir nos protections X-tream Grip
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => onBrandSelect(brand.name)}
            className="glass-card p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group text-center min-h-[80px] flex flex-col justify-center"
          >
            <h3 className="font-medium text-sm md:text-base mb-1">{brand.name}</h3>
            <p className="text-xs opacity-60">{brand.description}</p>
          </button>
        ))}
      </div>

      <div className="text-center mt-8">
        <button onClick={() => onBrandSelect("ALL")} className="button-primary px-6 py-3">
          Voir tous les produits
        </button>
      </div>
    </div>
  )
}
