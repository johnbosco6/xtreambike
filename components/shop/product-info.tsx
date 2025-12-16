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
      {
        id: 1,
        name: "HUSQVARNA 125-300TC / 250-450FC 23-25 Grip pour protection plastique ORIGINAL",
        price: "17,99 €",
        priceNumber: 17.99,
        variants: ["Protection plastique"],
        brand: "HUSQVARNA",
        category: "Protection plastique",
        bikeType: "Motocross",
        description:
          "Grip pour protection plastique spécialement conçu pour HUSQVARNA 125-300TC et 250-450FC modèles 2023-2025. Protection ORIGINAL offrant une adhérence maximale et une protection optimale de vos plastiques.",
        features: [
          "Surface antidérapante X-Trem Grip ORIGINAL",
          "Protection optimale des plastiques",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["HUSQVARNA 125-300TC 2023-2025", "HUSQVARNA 250-450FC 2023-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/husqvarna-grip-protection.png",
        stock: 20,
      },
      {
        id: 2,
        name: "FANTIC XXF250 21-25 / XXF450 21-25 Protection de cadre",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "FANTIC",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour FANTIC XXF250 et XXF450 modèles 2021-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["FANTIC XXF250 2021-2025", "FANTIC XXF450 2021-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/fantic-xxf-frame-protection.png",
        stock: 15,
      },
      {
        id: 3,
        name: "HONDA CRF250R 22-25 / CRF450R 21-25 Protection de cadre",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre"],
        brand: "HONDA",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour HONDA CRF250R et CRF450R modèles 2021-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["HONDA CRF250R 2022-2025", "HONDA CRF450R 2021-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/honda-crf-frame-protection.png",
        stock: 12,
      },
      {
        id: 4,
        name: "KAWASAKI 125KX 03-08 / 250KX 03-04 Protection de cadre",
        price: "15,99 €",
        priceNumber: 15.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI 125KX et 250KX modèles 2003-2008. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KAWASAKI 125KX 2003-2008", "KAWASAKI 250KX 2003-2004"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kx-frame-protection.png",
        stock: 18,
      },
      {
        id: 5,
        name: "KAWASAKI 250KXF 15-20 Protection de cadre",
        price: "20,99 €",
        priceNumber: 20.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI 250KXF modèles 2015-2020. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KAWASAKI 250KXF 2015-2020"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf-frame-protection.png",
        stock: 10,
      },
      {
        id: 6,
        name: "KAWASAKI 250KXF 2025 / 450KXF 24-25 Protection de cadre",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI 250KXF 2025 et 450KXF 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KAWASAKI 250KXF 2025", "KAWASAKI 450KXF 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf-2025-frame-protection.png",
        stock: 20,
      },
      {
        id: 7,
        name: "KAWASAKI 250KXF 21-24 / 450KXF 19-23 Protection de cadre",
        price: "25,99 €",
        priceNumber: 25.99,
        variants: ["Protection de cadre"],
        brand: "KAWASAKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour KAWASAKI 250KXF 2021-2024 et 450KXF 2019-2023. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KAWASAKI 250KXF 2021-2024", "KAWASAKI 450KXF 2019-2023"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kawasaki-kxf-19-24-frame-protection.png",
        stock: 12,
      },
      {
        id: 8,
        name: "KOVE 450 RALLY 24-25 Protection de cadre",
        price: "19,99 €",
        priceNumber: 19.99,
        variants: ["Protection de cadre"],
        brand: "KOVE",
        category: "Protection de cadre",
        bikeType: "Rally",
        description:
          "Protection de cadre spécialement conçue pour KOVE 450 RALLY modèles 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["KOVE 450 RALLY 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/kove-450-rally-frame-protection.png",
        stock: 15,
      },
      {
        id: 9,
        name: "STARK MX 22-25 / EX 24-25 Protection de cadre",
        price: "9,99 €",
        priceNumber: 9.99,
        variants: ["Protection de cadre"],
        brand: "STARK",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour STARK MX 2022-2025 et EX 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["STARK MX 2022-2025", "STARK EX 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/stark-mx-ex-frame-protection.png",
        stock: 25,
      },
      {
        id: 10,
        name: "SUZUKI 125RM 01-12 / 250RM 01-08 Protection de cadre",
        price: "15,99 €",
        priceNumber: 15.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI 125RM 2001-2012 et 250RM 2001-2008. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["SUZUKI 125RM 2001-2012", "SUZUKI 250RM 2001-2008"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rm-frame-protection.png",
        stock: 18,
      },
      {
        id: 11,
        name: "SUZUKI 250RMZ 19-24 / 450RMZ 18-24 Protection de cadre",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI 250RMZ 2019-2024 et 450RMZ 2018-2024. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["SUZUKI 250RMZ 2019-2024", "SUZUKI 450RMZ 2018-2024"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rmz-frame-protection.png",
        stock: 15,
      },
      {
        id: 12,
        name: "SUZUKI 450RMZ 08-17 Protection de cadre",
        price: "29,99 €",
        priceNumber: 29.99,
        variants: ["Protection de cadre"],
        brand: "SUZUKI",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour SUZUKI 450RMZ modèles 2008-2017. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["SUZUKI 450RMZ 2008-2017"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/suzuki-rmz-08-17-frame-protection.png",
        stock: 12,
      },
      {
        id: 13,
        name: "TRIUMPH TF 250-X 24-25 Protection de cadre",
        price: "24,99 €",
        priceNumber: 24.99,
        variants: ["Protection de cadre"],
        brand: "TRIUMPH",
        category: "Protection de cadre",
        bikeType: "Motocross",
        description:
          "Protection de cadre spécialement conçue pour TRIUMPH TF 250-X modèles 2024-2025. Protection offrant une adhérence maximale et une protection optimale de votre cadre.",
        features: [
          "Surface antidérapante X-Trem Grip",
          "Protection optimale du cadre",
          "Installation facile sans modification",
          "Matériau haute résistance",
          "Compatible avec kit déco",
        ],
        compatibility: ["TRIUMPH TF 250-X 2024-2025"],
        inStock: true,
        colors: [
          { id: "grey", name: "Gris", hex: "#808080" },
          { id: "black", name: "Noir", hex: "#000000" },
        ],
        image: "/images/products/triumph-tf-frame-protection.png",
        stock: 10,
      },
    ]

    const filteredProducts = products.filter((product) => product.image && !product.image.includes("placeholder.svg"))

    return filteredProducts.find((product) => product.id === Number.parseInt(productId))
  }

  const getDeliveryOptions = (country: string) => {
    const deliveryOptions: Record<string, { name: string; price: number; days: string }[]> = {
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
              className={`p-3 rounded-lg border-2 text-left transition-colors ${selectedVariant === index ? "border-[#0BEFD5] bg-[#0BEFD5]/10" : "border-white/20 hover:border-white/40"
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
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-colors ${selectedColor === color.id ? "border-[#0BEFD5]" : "border-white/20 hover:border-white/50"
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
          {deliveryOptions.map((option: { name: string; price: number; days: string }, index: number) => (
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
