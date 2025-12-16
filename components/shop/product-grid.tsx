"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown } from "lucide-react"

export default function ProductGrid() {
  const [sortOption, setSortOption] = useState("featured")

  const products = [
    {
      id: 1,
      name: "HUSQVARNA 125-300TC / 250-450FC 23-25 Grip pour protection plastique ORIGINAL",
      price: "17,99 €",
      brand: "HUSQVARNA",
      category: "Protection plastique",
      image: "/images/products/husqvarna-grip-protection.png",
      colors: ["Gris", "Noir"],
      description:
        "Grip pour protection plastique spécialement conçu pour HUSQVARNA 125-300TC et 250-450FC modèles 2023-2025. Protection ORIGINAL offrant une adhérence maximale et une protection optimale de vos plastiques.",
    },
    {
      id: 2,
      name: "FANTIC XXF250 21-25 / XXF450 21-25 Protection de cadre",
      price: "29,99 €",
      brand: "FANTIC",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/fantic-xxf-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 15,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour FANTIC XXF250 et XXF450 modèles 2021-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 3,
      name: "HONDA CRF250R 22-25 / CRF450R 21-25 Protection de cadre",
      price: "24,99 €",
      brand: "HONDA",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/honda-crf-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 12,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour HONDA CRF250R et CRF450R modèles 2021-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 4,
      name: "KAWASAKI 125KX 03-08 / 250KX 03-04 Protection de cadre",
      price: "15,99 €",
      brand: "KAWASAKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kx-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 18,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI 125KX et 250KX modèles 2003-2008. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 5,
      name: "KAWASAKI 250KXF 15-20 Protection de cadre",
      price: "20,99 €",
      brand: "KAWASAKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 10,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI 250KXF modèles 2015-2020. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 6,
      name: "KAWASAKI 250KXF 2025 / 450KXF 24-25 Protection de cadre",
      price: "29,99 €",
      brand: "KAWASAKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf-2025-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 20,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI 250KXF 2025 et 450KXF 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 7,
      name: "KAWASAKI 250KXF 21-24 / 450KXF 19-23 Protection de cadre",
      price: "25,99 €",
      brand: "KAWASAKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf-19-24-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 12,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI 250KXF 2021-2024 et 450KXF 2019-2023. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 8,
      name: "KOVE 450 RALLY 24-25 Protection de cadre",
      price: "19,99 €",
      brand: "KOVE",
      category: "Protection de cadre",
      bikeType: "Rally",
      image: "/images/products/kove-450-rally-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 15,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour KOVE 450 RALLY modèles 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 9,
      name: "STARK MX 22-25 / EX 24-25 Protection de cadre",
      price: "9,99 €",
      brand: "STARK",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/stark-mx-ex-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 25,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour STARK MX 2022-2025 et EX 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 10,
      name: "SUZUKI 125RM 01-12 / 250RM 01-08 Protection de cadre",
      price: "15,99 €",
      brand: "SUZUKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rm-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 18,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour SUZUKI 125RM 2001-2012 et 250RM 2001-2008. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 11,
      name: "SUZUKI 250RMZ 19-24 / 450RMZ 18-24 Protection de cadre",
      price: "29,99 €",
      brand: "SUZUKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rmz-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 15,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour SUZUKI 250RMZ 2019-2024 et 450RMZ 2018-2024. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 12,
      name: "SUZUKI 450RMZ 08-17 Protection de cadre",
      price: "29,99 €",
      brand: "SUZUKI",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rmz-08-17-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 12,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour SUZUKI 450RMZ modèles 2008-2017. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
    {
      id: 13,
      name: "TRIUMPH TF 250-X 24-25 Protection de cadre",
      price: "24,99 €",
      brand: "TRIUMPH",
      category: "Protection de cadre",
      bikeType: "Motocross",
      image: "/images/products/triumph-tf-frame-protection.png",
      colors: ["Gris", "Noir"],
      stock: 10,
      inStock: true,
      description:
        "Protection de cadre spécialement conçue pour TRIUMPH TF 250-X modèles 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
    },
  ]

  // Simple sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return parseFloat(a.price.replace(",", ".")) - parseFloat(b.price.replace(",", "."))
    } else if (sortOption === "price-desc") {
      return parseFloat(b.price.replace(",", ".")) - parseFloat(a.price.replace(",", "."))
    }
    return 0
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm opacity-70">{sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""}</p>
        <div className="relative">
          <button className="glass-effect px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Trier par:{" "}
            {sortOption === "featured"
              ? "Populaire"
              : sortOption === "price-asc"
                ? "Prix croissant"
                : sortOption === "price-desc"
                  ? "Prix décroissant"
                  : "Nouveautés"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {sortedProducts.map((product) => (
          <Link href={`/shop/product/${product.id}`} key={product.id} className="group">
            <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col">
              <div className="relative h-48 md:h-64 overflow-hidden bg-black/20">
                {product.image ? (
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-[#4A2CD6]/20 to-[#0BEFD5]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl md:text-6xl font-light opacity-20 mb-2">{product.brand}</div>
                      <div className="text-sm opacity-60">{product.category}</div>
                    </div>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#4A2CD6]/80 text-white text-xs px-2 py-1 rounded">{product.brand}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-[#0BEFD5]/80 text-black text-xs px-2 py-1 rounded">{product.category}</span>
                </div>
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <h3 className="font-medium text-sm md:text-base mb-2">{product.name}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.colors.map((color, index) => (
                    <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <p className="font-medium text-base md:text-lg">{product.price}</p>
                    <p className="text-xs opacity-70">Prix</p>
                  </div>
                  <span className="button-secondary text-xs px-2 py-1 md:px-3 md:py-1.5 cursor-pointer">Voir</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
