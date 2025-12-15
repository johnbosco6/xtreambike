"use client"

import { ArrowLeft } from "lucide-react"
import Image from "next/image"

interface BrandCategoriesProps {
  selectedBrand: string | null
  onBrandSelect: (brand: string | null) => void
}

export default function BrandCategories({ selectedBrand, onBrandSelect }: BrandCategoriesProps) {
  // Copied and sorted from brands-section.tsx
  const brands = [
    {
      name: "Beta",
      logo: "/images/logos/beta-transparent.png",
      description: "Enduro",
    },
    {
      name: "Fantic",
      logo: "/images/logos/fantic.png",
      description: "Enduro",
    },
    {
      name: "GasGas",
      logo: "/images/logos/gasgas.png",
      description: "Motocross",
    },
    {
      name: "Honda",
      logo: "/images/logos/honda-new.png",
      description: "Motocross",
    },
    {
      name: "Husqvarna",
      logo: "/images/logos/husqvarna.png",
      description: "Motocross",
    },
    {
      name: "Kawasaki",
      logo: "/images/logos/kawasaki-transparent.png",
      description: "Motocross",
    },
    {
      name: "Kove",
      logo: "/images/logos/kove-transparent.png",
      description: "Rally",
    },
    {
      name: "KTM",
      logo: "/images/logos/ktm-new.png",
      description: "Motocross",
    },
    {
      name: "Sherco",
      logo: "/images/logos/sherco.png",
      description: "Enduro",
    },
    {
      name: "Stark Varg",
      logo: "/images/logos/stark-varg.png",
      description: "Électrique",
    },
    {
      name: "Suzuki",
      logo: "/images/logos/suzuki.png",
      description: "Motocross",
    },
    {
      name: "Triumph",
      logo: "/images/logos/triumph-transparent.png",
      description: "Motocross",
    },
    {
      name: "Yamaha",
      logo: "/images/logos/yamaha-transparent.png",
      description: "Motocross & Enduro",
    },
    {
      name: "YCF",
      logo: "/images/logos/ycf.png",
      description: "Dirt Bike",
    },
    {
      name: "WORKS CONNECTION",
      logo: "/images/logos/works-connection.png", // Assuming logo exists or use placeholder logic if failed
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
            className="glass-card p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group text-center min-h-[120px] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
          >
            <div className="relative w-full h-16">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                fill
                className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
            {/* <h3 className="font-medium text-sm md:text-base mb-1">{brand.name}</h3> */}
            {/* <p className="text-xs opacity-60">{brand.description}</p> */}
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
