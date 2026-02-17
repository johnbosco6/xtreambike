"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products } from "@/lib/products-data"

interface ProductGalleryProps {
  productId: string
  activeProductId?: number
}

export default function ProductGallery({ productId, activeProductId }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Use activeProductId if provided, otherwise fall back to the URL productId
  const effectiveId = activeProductId ?? Number(productId)
  const product = products.find((p) => p.id === effectiveId)

  // Reset image index when the active product changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [effectiveId])

  // Define images based on product ID and brand
  const getProductImages = () => {
    const images: string[] = []

    if (!product) {
      return ["/placeholder.svg?height=400&width=400"]
    }

    images.push(product.image)

    // Additional logic for product-specific images can be re-added here if needed
    // For now, using the main product image from the centralized data

    return images.filter(Boolean)
  }

  const images = getProductImages()

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white/5 rounded-lg overflow-hidden">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg?height=400&width=400&query=product protection"}
          alt={`${product?.name || "Product"} - Image ${currentImageIndex + 1}`}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? "bg-[#0BEFD5]" : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square bg-white/5 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex ? "border-[#0BEFD5]" : "border-transparent hover:border-white/30"
                }`}
            >
              <Image
                src={image || "/placeholder.svg?height=400&width=400&query=product protection"}
                alt={`${product?.name || "Product"} - Thumbnail ${index + 1}`}
                fill
                quality={100}
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
