"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Star, Shield, Truck, RotateCcw } from "lucide-react"
import { Minus, Plus } from "lucide-react"

interface ProductInfoProps {
  productId: string // Changed from number to string to match URL params
}

export default function ProductInfo({ productId }: ProductInfoProps) {
  const { addItem } = useCart() // Fixed to use only addItem from cart context
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")

  // Get product data based on ID
  const getProductData = () => {
    const products = [
      // YAMAHA Products
      {
        id: 1,
        name: "YZ125 (2005-2025)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "YAMAHA",
        category: "125cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour YAMAHA YZ125. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ125 2005-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
        stock: 15,
      },
      {
        id: 2,
        name: "YZ250 (2005-2025)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "YAMAHA",
        category: "250cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour YAMAHA YZ250. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250 2005-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
        stock: 15,
      },
      {
        id: 4,
        name: "YZ250F (2019-2023)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "YAMAHA",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour YAMAHA YZ250F 2019-2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F 2019-2023"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 5,
        name: "YZ250F (2024-2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "YAMAHA",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre et plaque latérale spécialement conçue pour YAMAHA YZ250F 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage. Disponible en protection de cadre et protection de plaque latérale pour une protection complète.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
          { id: "blue", name: "Bleu", hex: "#0046BD" },
        ],
        image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 6,
        name: "YZ450F (2018-2022)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "YAMAHA",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour YAMAHA YZ450F 2018-2022. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ450F 2018-2022"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 7,
        name: "YZ450F (2023-2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "YAMAHA",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre et plaque latérale spécialement conçue pour YAMAHA YZ450F 2023-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage. Disponible en protection de cadre et protection de plaque latérale pour une protection complète.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ450F 2023-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
          { id: "blue", name: "Bleu", hex: "#0046BD" },
        ],
        image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 8,
        name: "KX125 (2003-2008)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "125cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX125 2003-2008. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX125 2003-2008"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 9,
        name: "KX250 (2003-2004)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "250cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX250 2003-2004. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX250 2003-2004"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 10,
        name: "KX250F (2015-2020)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2015-2020. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX250F 2015-2020"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf250-2015-20-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 11,
        name: "KX250F (2021-2024)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2021-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX250F 2021-2024"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
        stock: 10,
      },
      {
        id: 12,
        name: "KX250F (2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX250F 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX250F 2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 13,
        name: "KX450F (2019-2023)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX450F 2019-2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX450F 2019-2023"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
        stock: 10,
      },
      {
        id: 14,
        name: "KX450F (2024-2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI KX450F 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KX450F 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 24,
        name: "XXF250 (2021-2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "FANTIC",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour FANTIC XXF250 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["XXF250 2021-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 25,
        name: "XXF450 (2021-2025)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "FANTIC",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour FANTIC XXF450 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["XXF450 2021-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 15,
        name: "CRF250R (2022-2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre"],
        brand: "HONDA",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour HONDA CRF250R 2022-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["CRF250R 2022-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 16,
        name: "CRF450R (2021-2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre"],
        brand: "HONDA",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour HONDA CRF450R 2021-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["CRF450R 2021-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 27,
        name: "450 Rally (2024-2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre", "Protection thermique réservoir"],
        brand: "KOVE",
        category: "450cc",
        bikeType: "Rally",
        description:
          "Protection thermique réservoir et protection de cadre spécialement conçues pour KOVE 450 Rally 2024-2025. Cette protection thermique protège efficacement votre réservoir de la chaleur dégagée par l'échappement, tout en offrant une surface antidérapante pour un meilleur contrôle de la moto. Idéale pour les longues distances et les conditions extrêmes du rally.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["450 Rally 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kove-450-rally-thermal-protection-installed-1.jpeg",
        stock: 6,
      },
      {
        id: 26,
        name: "TF 250-X (2024-2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "TRIUMPH",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre et plaque latérale spécialement conçue pour TRIUMPH TF 250-X 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage. Disponible en protection de cadre et protection de plaque latérale pour une protection complète de votre TRIUMPH.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["TF 250-X 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 28,
        name: "TF 450-X (2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre", "Protection de plaque latérale"],
        brand: "TRIUMPH",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre et plaque latérale spécialement conçue pour TRIUMPH TF 450-X 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage. Disponible en protection de cadre et protection de plaque latérale pour une protection complète de votre TRIUMPH.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["TF 450-X 2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 22,
        name: "VARG MX (2022-2025)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre", "Protection de carter", "Protection de plaque latérale"],
        brand: "STARK",
        category: "MX",
        bikeType: "Electrique",
        description:
          "Protection de cadre, carter et plaque latérale spécialement conçue pour STARK VARG MX. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto électrique, afin d'améliorer le contrôle et les sensations de pilotage. Protections spécialement adaptées aux spécificités de la moto électrique STARK avec protection du carter moteur.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["VARG MX 2022-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
        stock: 8,
      },
      {
        id: 23,
        name: "VARG EX (2024-2025)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre", "Protection de carter", "Protection de plaque latérale"],
        brand: "STARK",
        category: "EX",
        bikeType: "Electrique",
        description:
          "Protection de cadre, carter et plaque latérale spécialement conçue pour STARK VARG EX. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto électrique, afin d'améliorer le contrôle et les sensations de pilotage. Protections spécialement adaptées aux spécificités de la moto électrique STARK avec protection du carter moteur.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["VARG EX 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
        stock: 8,
      },
      {
        id: 29,
        name: "YZ250F/450F Protection Plaque Latérale Gauche (2024-2025)",
        price: "14,99 €",
        priceNumber: 14.99,
        variants: ["Protection de plaque latérale gauche"],
        brand: "YAMAHA",
        category: "Plaque Latérale",
        bikeType: "Motocross",
        description:
          "Protection de plaque latérale gauche spécialement conçue pour YAMAHA YZ250F/450F 2024-2025. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco. Cette protection offre une surface antidérapante tout en préservant l'esthétique de votre moto.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F/450F 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz250f-450f-side-plate-left-installed.jpeg",
        stock: 15,
      },
      {
        id: 30,
        name: "YZ250F/450F Protection Plaque Latérale Droite (2024-2025)",
        price: "14,99 €",
        priceNumber: 14.99,
        variants: ["Protection de plaque latérale droite"],
        brand: "YAMAHA",
        category: "Plaque Latérale",
        bikeType: "Motocross",
        description:
          "Protection de plaque latérale droite spécialement conçue pour YAMAHA YZ250F/450F 2024-2025. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco tout en conservant le style Yamaha Racing.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F/450F 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/yamaha-yz250f-450f-side-plate-right-installed.jpeg",
        stock: 15,
      },
      {
        id: 31,
        name: "YZ250F/450F Kit Protection Plaques Latérales Bleu (2023-2025)",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Kit complet plaques latérales"],
        brand: "YAMAHA",
        category: "Plaque Latérale",
        bikeType: "Motocross",
        description:
          "Kit complet de protection des plaques latérales pour YAMAHA YZ250F/450F 2023-2025 en coloris bleu. Comprend les protections gauche et droite. X-Trem Grip ce n'est pas seulement des protections de cadre ! C'est aussi la solution idéale pour protéger vos plastiques et kits déco tout en conservant le style Yamaha Racing.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F/450F 2023-2025"],
        inStock: true,
        colors: [{ id: "blue", name: "Bleu Yamaha", hex: "#0046BD" }],
        image: "/placeholder.svg?height=400&width=400",
        stock: 10,
      },
      {
        id: 32,
        name: "YZ250F/450F Protection Plaque Latérale Bleue Gauche (2023-2025)",
        price: "14,99 €",
        priceNumber: 14.99,
        variants: ["Protection de plaque latérale gauche bleue"],
        brand: "YAMAHA",
        category: "Plaque Latérale",
        bikeType: "Motocross",
        description:
          "Protection de plaque latérale gauche en coloris bleu spécialement conçue pour YAMAHA YZ250F/450F 2023-2025. Cette protection s'intègre parfaitement avec les plastiques d'origine Yamaha tout en offrant une surface antidérapante optimale.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F/450F 2023-2025"],
        inStock: true,
        colors: [{ id: "blue", name: "Bleu Yamaha", hex: "#0046BD" }],
        image: "/placeholder.svg?height=400&width=400",
        stock: 12,
      },
      {
        id: 33,
        name: "YZ250F/450F Protection Plaque Latérale Bleue Droite (2023-2025)",
        price: "14,99 €",
        priceNumber: 14.99,
        variants: ["Protection de plaque latérale droite bleue"],
        brand: "YAMAHA",
        category: "Plaque Latérale",
        bikeType: "Motocross",
        description:
          "Protection de plaque latérale droite en coloris bleu spécialement conçue pour YAMAHA YZ250F/450F 2023-2025. Cette protection s'intègre parfaitement avec les plastiques d'origine Yamaha tout en offrant une surface antidérapante optimale.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["YZ250F/450F 2023-2025"],
        inStock: true,
        colors: [{ id: "blue", name: "Bleu Yamaha", hex: "#0046BD" }],
        image: "/placeholder.svg?height=400&width=400",
        stock: 12,
      },
      {
        id: 34,
        name: "350RR (2023)",
        price: "27,99 €",
        priceNumber: 27.99,
        variants: ["Protection de cadre"],
        brand: "BETA",
        category: "350cc",
        bikeType: "Enduro",
        description:
          "Protection de cadre spécialement conçue pour BETA 350RR 2023. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["350RR 2023"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 35,
        name: "RR2T 250/300 (2024-2025)",
        price: "27,99 €",
        priceNumber: 27.99,
        variants: ["Protection de cadre"],
        brand: "BETA",
        category: "250/300cc",
        bikeType: "Enduro",
        description:
          "Protection de cadre spécialement conçue pour BETA RR2T 250/300 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RR2T 250/300 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 36,
        name: "RR4T 350/450 (2024-2025)",
        price: "27,99 €",
        priceNumber: 27.99,
        variants: ["Protection de cadre"],
        brand: "BETA",
        category: "350/450cc",
        bikeType: "Enduro",
        description:
          "Protection de cadre spécialement conçue pour BETA RR4T 350/450 2024-2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RR4T 350/450 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 37,
        name: "RX300 (2025)",
        price: "27,99 €",
        priceNumber: 27.99,
        variants: ["Protection de cadre"],
        brand: "BETA",
        category: "300cc",
        bikeType: "Enduro",
        description:
          "Protection de cadre spécialement conçue pour BETA RX300 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RX300 2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 38,
        name: "TC125/250/300 (2025)",
        price: "26,99 €",
        priceNumber: 26.99,
        variants: ["Protection de cadre"],
        brand: "HUSQVARNA",
        category: "125/250/300cc",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour HUSQVARNA TC125/250/300 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["TC125/250/300 2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 39,
        name: "FC250/450 (2025)",
        price: "26,99 €",
        priceNumber: 26.99,
        variants: ["Protection de cadre"],
        brand: "HUSQVARNA",
        category: "250/450cc",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour HUSQVARNA FC250/450 2025. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["FC250/450 2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 40,
        name: "Protection Maître Cylindre Arrière",
        price: "12,99 €",
        priceNumber: 12.99,
        variants: ["Protection maître cylindre"],
        brand: "WORKS CONNECTION",
        category: "Protection",
        bikeType: "Accessoire",
        description:
          "Protection de maître cylindre arrière WORKS CONNECTION. Cette protection spécialement conçue protège efficacement votre maître cylindre de frein arrière contre les impacts et les projections. Compatible avec la plupart des modèles de motocross et enduro équipés d'un maître cylindre WORKS CONNECTION.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["Maître Cylindre WORKS CONNECTION"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/works-connection-rear-master-cylinder-protection-grey.png",
        stock: 20,
      },
      {
        id: 17,
        name: "RM125 (2001-2012)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "125cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI RM125 2001-2012. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RM125 2001-2012"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 18,
        name: "RM250 (2001-2008)",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "250cc 2T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI RM250 2001-2008. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RM250 2001-2008"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
        stock: 12,
      },
      {
        id: 19,
        name: "RMZ250 (2019-2024)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "250cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI RMZ250 2019-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RMZ250 2019-2024"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
        stock: 10,
      },
      {
        id: 20,
        name: "RMZ450 (2008-2017)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI RMZ450 2008-2017. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RMZ450 2008-2017"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rmz450-2008-17-frame-protection-grey.png",
        stock: 8,
      },
      {
        id: 21,
        name: "RMZ450 (2018-2024)",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "450cc 4T",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI RMZ450 2018-2024. Nos protections sont avant tout conçues pour apporter un maximum de GRIP à votre moto, afin d'améliorer le contrôle et les sensations de pilotage.",
        features: [
          "Surface antidérapante X-tream Grip",
          "Protection contre les impacts",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["RMZ450 2018-2024"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
        stock: 8,
      },
    ]

    const filteredProducts = products.filter((product) => product.image && !product.image.includes("placeholder.svg"))

    return filteredProducts.find((product) => product.id === Number.parseInt(productId))
  }

  const getDeliveryOptions = (country: string) => {
    const deliveryOptions = {
      France: [
        { name: "La Poste", price: 4.9, days: "2-3 jours ouvrés" },
        { name: "Mondial Relay", price: 4.19, days: "3-5 jours ouvrés" },
      ],
      Spain: [{ name: "Mondial Relay", price: 6.47, days: "4-6 jours ouvrés" }],
      Belgium: [{ name: "Mondial Relay", price: 4.43, days: "3-5 jours ouvrés" }],
      Italy: [{ name: "Mondial Relay", price: 6.8, days: "4-6 jours ouvrés" }],
      Luxembourg: [{ name: "Mondial Relay", price: 4.6, days: "3-5 jours ouvrés" }],
      Poland: [{ name: "Mondial Relay", price: 6.5, days: "5-7 jours ouvrés" }],
      Portugal: [{ name: "Mondial Relay", price: 6.8, days: "4-6 jours ouvrés" }],
    }
    return deliveryOptions[country] || deliveryOptions.France
  }

  const [selectedCountry, setSelectedCountry] = useState("France")
  const [selectedDelivery, setSelectedDelivery] = useState(0)
  const deliveryOptions = getDeliveryOptions(selectedCountry)

  const product = getProductData()

  const handleAddToCart = () => {
    if (!product) {
      console.error("[v0] Product not found for ID:", productId)
      return
    }

    try {
      const cartItem = {
        id: `${product.id}-${selectedVariant}-${selectedColor}`,
        name: product.name,
        price: product.priceNumber,
        variant: product.variants[selectedVariant],
        color: selectedColor || product.colors?.[0]?.name || "",
        image: product.image,
        brand: product.brand,
        quantity: quantity, // Added quantity property to match CartItem interface
      }

      console.log("[v0] Adding item to cart:", cartItem)
      addItem(cartItem)
      console.log("[v0] Item successfully added to cart")
    } catch (error) {
      console.error("[v0] Error adding item to cart:", error)
    }
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-gray-400">Produit non trouvé</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#4A2CD6]/20 text-[#4A2CD6] text-xs px-2 py-1 rounded">{product.brand}</span>
          <span className="bg-[#0BEFD5]/20 text-[#0BEFD5] text-xs px-2 py-1 rounded">{product.category}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-light mb-2">{product?.name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm opacity-70 ml-2">(4.8/5 - 124 avis)</span>
          </div>
        </div>
        <p className="text-3xl font-medium text-[#0BEFD5] mb-4">{product?.price}</p>
      </div>

      {/* Variants */}
      <div>
        <h3 className="font-medium mb-3">Type de protection</h3>
        <div className="grid grid-cols-1 gap-2">
          {product?.variants?.map((variant, index) => (
            <button
              key={index}
              onClick={() => setSelectedVariant(index)}
              className={`p-3 rounded-lg border-2 text-left transition-colors ${
                selectedVariant === index ? "border-[#0BEFD5] bg-[#0BEFD5]/10" : "border-white/20 hover:border-white/40"
              }`}
            >
              <div className="font-medium text-sm">{variant}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      {product?.colors && product?.colors.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-sm font-medium mb-2 md:mb-3">Couleur:</h3>
          <div className="flex gap-3">
            {product?.colors.map((color) => (
              <button
                key={color.id}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-colors ${
                  selectedColor === color.id ? "border-[#0BEFD5]" : "border-white/20 hover:border-white/50"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => setSelectedColor(color.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-medium mb-3">Quantité</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="glass-effect w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="glass-effect w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-light">Options de livraison</h3>

        <div>
          <label className="block text-sm font-light mb-2">Pays de livraison</label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value)
              setSelectedDelivery(0)
            }}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5]"
          >
            <option value="France">France</option>
            <option value="Spain">Espagne</option>
            <option value="Belgium">Belgique</option>
            <option value="Italy">Italie</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Poland">Pologne</option>
            <option value="Portugal">Portugal</option>
          </select>
        </div>

        <div className="space-y-3">
          {deliveryOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 p-3 glass-effect rounded-lg cursor-pointer hover:bg-white/5"
            >
              <input
                type="radio"
                name="delivery"
                checked={selectedDelivery === index}
                onChange={() => setSelectedDelivery(index)}
                className="text-[#0BEFD5] focus:ring-[#0BEFD5]"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{option.name}</span>
                  <span className="font-medium">{option.price.toFixed(2)} €</span>
                </div>
                <p className="text-sm opacity-70">{option.days}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Add to Cart */}
      <button onClick={handleAddToCart} className="button-primary w-full py-4 text-lg" disabled={!product?.inStock}>
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        {product?.inStock ? "Ajouter au panier" : "Rupture de stock"}
      </button>

      {/* Features */}
      <div>
        <h3 className="font-medium mb-4">Caractéristiques</h3>
        <ul className="space-y-2">
          {product?.features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-[#0BEFD5] rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Compatibility */}
      <div>
        <h3 className="font-medium mb-4">Compatibilité</h3>
        <div className="flex flex-wrap gap-2">
          {product?.compatibility?.map((model, index) => (
            <span key={index} className="bg-white/10 text-xs px-2 py-1 rounded">
              {model}
            </span>
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-[#0BEFD5]" />
          <div>
            <div className="text-sm font-medium">Garantie 2 ans</div>
            <div className="text-xs opacity-70">Qualité assurée</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#0BEFD5]" />
          <div>
            <div className="text-sm font-medium">Livraison rapide</div>
            <div className="text-xs opacity-70">2-3 jours ouvrés</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="w-5 h-5 text-[#0BEFD5]" />
          <div>
            <div className="text-sm font-medium">Retour 30 jours</div>
            <div className="text-xs opacity-70">Satisfait ou remboursé</div>
          </div>
        </div>
      </div>
    </div>
  )
}
