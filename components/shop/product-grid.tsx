"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpDown } from "lucide-react"

export default function ProductGrid({
  filters,
}: {
  filters?: {
    brands: string[]
    categories: string[]
    priceRange: [number, number]
    bikeTypes: string[]
  }
}) {
  const [sortOption, setSortOption] = useState("featured")

  const products = [
    // YAMAHA Products - Updated with new images
    {
      id: 1,
      name: "YZ125 (2005-2025)",
      price: "19,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "YAMAHA",
      category: "125cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ125. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 2,
      name: "YZ250 (2005-2025)",
      price: "19,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "YAMAHA",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ250. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 3,
      name: "YZ65 (2018-2025)",
      price: "9,99 €",
      variants: ["Protection de plaque latérale"],
      brand: "YAMAHA",
      category: "65cc",
      bikeType: "Motocross",
      image: null,
      description:
        "Protection de plaque latérale pour YAMAHA YZ65. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco.",
    },
    {
      id: 4,
      name: "YZ250F (2019-2023)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "YAMAHA",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ250F 2019-2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 5,
      name: "YZ250F (2024-2025)",
      price: "29,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "YAMAHA",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ250F 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 6,
      name: "YZ450F (2018-2022)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "YAMAHA",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ450F 2018-2022. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 7,
      name: "YZ450F (2023-2025)",
      price: "29,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "YAMAHA",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour YAMAHA YZ450F 2023-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 29,
      name: "YZ250F/450F Protection Plaque Latérale Gauche (2024-2025)",
      price: "14,99 €",
      variants: ["Protection de plaque latérale gauche"],
      brand: "YAMAHA",
      category: "Protection plastique",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-side-plate-left-installed.jpeg",
      description:
        "Protection de plaque latérale gauche spécialement conçue pour YAMAHA YZ250F/450F 2024-2025. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco. Cette protection offre une surface antidérapante tout en préservant l'esthétique de votre moto.",
    },
    {
      id: 30,
      name: "YZ250F/450F Protection Plaque Latérale Droite (2024-2025)",
      price: "14,99 €",
      variants: ["Protection de plaque latérale droite"],
      brand: "YAMAHA",
      category: "Protection plastique",
      bikeType: "Motocross",
      image: "/images/products/yamaha-yz250f-450f-side-plate-right-installed.jpeg",
      description:
        "Protection de plaque latérale droite spécialement conçue pour YAMAHA YZ250F/450F 2024-2025. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco. Cette protection offre une surface antidérapante tout en préservant l'esthétique de votre moto.",
    },
    {
      id: 32,
      name: "YZ250F/450F Protection Plaque Latérale Bleue Gauche (2023-2025)",
      price: "14,99 €",
      variants: ["Protection de plaque latérale gauche bleue"],
      brand: "YAMAHA",
      category: "Protection plastique",
      bikeType: "Motocross",
      image: null,
      description:
        "Protection de plaque latérale gauche en coloris bleu spécialement conçue pour YAMAHA YZ250F/450F 2023-2025. Cette protection s'intègre parfaitement avec les plastiques d'origine Yamaha tout en offrant une surface antidérapante optimale.",
    },
    {
      id: 33,
      name: "YZ250F/450F Protection Plaque Latérale Bleue Droite (2023-2025)",
      price: "14,99 €",
      variants: ["Protection de plaque latérale droite bleue"],
      brand: "YAMAHA",
      category: "Protection plastique",
      bikeType: "Motocross",
      image: null,
      description:
        "Protection de plaque latérale droite en coloris bleu spécialement conçue pour YAMAHA YZ250F/450F 2023-2025. Cette protection s'intègre parfaitement avec les plastiques d'origine Yamaha tout en offrant une surface antidérapante optimale.",
    },

    // KAWASAKI Products - Updated with new images
    {
      id: 8,
      name: "KX125 (2003-2008)",
      price: "19,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "125cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX125 2003-2008. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 9,
      name: "KX250 (2003-2004)",
      price: "19,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX250 2003-2004. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 10,
      name: "KX250F (2015-2020)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf250-2015-20-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2015-2020. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 11,
      name: "KX250F (2021-2024)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2021-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 12,
      name: "KX250F (2025)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 13,
      name: "KX450F (2019-2023)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX450F 2019-2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 14,
      name: "KX450F (2024-2025)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "KAWASAKI",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour KAWASAKI KX450F 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // HONDA Products
    {
      id: 15,
      name: "CRF250R (2022-2025)",
      price: "24,99 €",
      variants: ["Protection de cadre"],
      brand: "HONDA",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour HONDA CRF250R 2022-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 16,
      name: "CRF450R (2021-2025)",
      price: "24,99 €",
      variants: ["Protection de cadre"],
      brand: "HONDA",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour HONDA CRF450R 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // SUZUKI Products - Updated with new images
    {
      id: 17,
      name: "RM125 (2001-2012)",
      price: "19,99 €",
      variants: ["Protection de cadre"],
      brand: "SUZUKI",
      category: "125cc",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour SUZUKI RM125 2001-2012. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 18,
      name: "RM250 (2001-2008)",
      price: "19,99 €",
      variants: ["Protection de cadre"],
      brand: "SUZUKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour SUZUKI RM250 2001-2008. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 19,
      name: "RMZ250 (2019-2024)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "SUZUKI",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour SUZUKI RMZ250 2019-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 20,
      name: "RMZ450 (2008-2017)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "SUZUKI",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rmz450-2008-17-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour SUZUKI RMZ450 2008-2017. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 21,
      name: "RMZ450 (2018-2024)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "SUZUKI",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour SUZUKI RMZ450 2018-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // STARK Products - Updated with new images
    {
      id: 22,
      name: "VARG MX (2022-2025)",
      price: "19,99 €",
      variants: ["Protection de cadre", "Protection de carter", "Protection de plaque latérale"],
      brand: "STARK",
      category: "Électrique",
      bikeType: "Motocross",
      image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
      description:
        "Protection de cadre, carter et plaque latérale spécialement conçue pour STARK VARG MX. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto électrique, afin d'améliorer le contrôle et les sensations de pilotage. Protections spécialement adaptées aux spécificités de la moto électrique STARK.",
    },
    {
      id: 23,
      name: "VARG EX (2024-2025)",
      price: "19,99 €",
      variants: ["Protection de cadre", "Protection de carter", "Protection de plaque latérale"],
      brand: "STARK",
      category: "Électrique",
      bikeType: "Enduro",
      image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
      description:
        "Protection de cadre, carter et plaque latérale spécialement conçue pour STARK VARG EX. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto électrique, afin d'améliorer le contrôle et les sensations de pilotage. Protections spécialement adaptées aux spécificités de la moto électrique STARK.",
    },

    // FANTIC Products
    {
      id: 24,
      name: "XXF250 (2021-2025)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "FANTIC",
      category: "250cc",
      bikeType: "Enduro",
      image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour FANTIC XXF250 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 25,
      name: "XXF450 (2021-2025)",
      price: "29,99 €",
      variants: ["Protection de cadre"],
      brand: "FANTIC",
      category: "450cc",
      bikeType: "Enduro",
      image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour FANTIC XXF450 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // TRIUMPH Products
    {
      id: 26,
      name: "TF 250-X (2024-2025)",
      price: "24,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "TRIUMPH",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour TRIUMPH TF 250-X 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 28,
      name: "TF 450-X (2025)",
      price: "24,99 €",
      variants: ["Protection de cadre", "Protection de plaque latérale"],
      brand: "TRIUMPH",
      category: "450cc",
      bikeType: "Motocross",
      image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour TRIUMPH TF 450-X 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // KOVE Products - Updated with new images
    {
      id: 27,
      name: "450 Rally (2024-2025)",
      price: "24,99 €",
      variants: ["Protection de cadre", "Protection thermique réservoir"],
      brand: "KOVE",
      category: "450cc",
      bikeType: "Rally",
      image: "/images/products/kove-450-rally-thermal-protection-installed-1.jpeg",
      description:
        "Protection thermique réservoir spécialement conçue pour KOVE 450 Rally 2024-2025. Cette protection thermique protège efficacement votre réservoir de la chaleur dégagée par l'échappement, tout en offrant une surface antidérapante pour un meilleur contrôle de la moto.",
    },

    // BETA Products
    {
      id: 34,
      name: "350RR (2023)",
      price: "27,99 €",
      variants: ["Protection de cadre"],
      brand: "BETA",
      category: "350cc",
      bikeType: "Enduro",
      image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour BETA 350RR 2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 35,
      name: "RR2T 250/300 (2024-2025)",
      price: "27,99 €",
      variants: ["Protection de cadre"],
      brand: "BETA",
      category: "250cc",
      bikeType: "Enduro",
      image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour BETA RR2T 250/300 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 36,
      name: "RR4T 350/450 (2024-2025)",
      price: "27,99 €",
      variants: ["Protection de cadre"],
      brand: "BETA",
      category: "350cc",
      bikeType: "Enduro",
      image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour BETA RR4T 350/450 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 37,
      name: "RX300 (2025)",
      price: "27,99 €",
      variants: ["Protection de cadre"],
      brand: "BETA",
      category: "300cc",
      bikeType: "Enduro",
      image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour BETA RX300 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // HUSQVARNA Products
    {
      id: 38,
      name: "TC125/250/300 (2025)",
      price: "26,99 €",
      variants: ["Protection de cadre"],
      brand: "HUSQVARNA",
      category: "125cc",
      bikeType: "Motocross",
      image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour HUSQVARNA TC125/250/300 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },
    {
      id: 39,
      name: "FC250/450 (2025)",
      price: "26,99 €",
      variants: ["Protection de cadre"],
      brand: "HUSQVARNA",
      category: "250cc",
      bikeType: "Motocross",
      image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
      description:
        "Protection de cadre spécialement conçue pour HUSQVARNA FC250/450 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
    },

    // WORKS CONNECTION Products - New category
    {
      id: 40,
      name: "Protection Maître Cylindre Arrière",
      price: "12,99 €",
      variants: ["Protection maître cylindre"],
      brand: "WORKS CONNECTION",
      category: "Accessoires",
      bikeType: "Universal",
      image: "/images/products/works-connection-rear-master-cylinder-protection-grey.png",
      description:
        "Protection de maître cylindre arrière WORKS CONNECTION. Cette protection spécialement conçue protège efficacement votre maître cylindre de frein arrière contre les impacts et les projections. Compatible avec la plupart des modèles de motocross et enduro.",
    },
  ]

  // Filter products based on the applied filters
  const filteredProducts = products.filter((product) => {
    // Brand filter
    if (filters?.brands?.length && !filters.brands.includes(product.brand)) {
      return false
    }

    // Category filter
    if (filters?.categories?.length && !filters.categories.includes(product.category)) {
      return false
    }

    // Bike type filter
    if (filters?.bikeTypes?.length && !filters.bikeTypes.includes(product.bikeType)) {
      return false
    }

    // Price filter
    const productPrice = Number.parseFloat(product.price.replace("€", "").replace(",", "."))
    if (filters?.priceRange && (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1])) {
      return false
    }

    return true
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <p className="text-sm opacity-70">{filteredProducts.length} produits</p>
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
          <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg p-2 z-10 hidden group-hover:block">
            <button
              className="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/10"
              onClick={() => setSortOption("featured")}
            >
              Populaire
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/10"
              onClick={() => setSortOption("newest")}
            >
              Nouveautés
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/10"
              onClick={() => setSortOption("price-asc")}
            >
              Prix croissant
            </button>
            <button
              className="w-full text-left px-3 py-2 text-sm rounded hover:bg-white/10"
              onClick={() => setSortOption("price-desc")}
            >
              Prix décroissant
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
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
                      <div className="text-sm opacity-60">{product.bikeType}</div>
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
                  {product.variants.map((variant, index) => (
                    <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {variant}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-end mt-auto">
                  <div>
                    <p className="font-medium text-base md:text-lg">{product.price}</p>
                    <p className="text-xs opacity-70">À partir de</p>
                  </div>
                  <button className="button-secondary text-xs px-2 py-1 md:px-3 md:py-1.5">Voir</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
