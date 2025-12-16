"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGalleryProps {
  productId: string // Changed from number to string to match URL params
}

export default function ProductGallery({ productId }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getProductData = () => {
    // Same product data structure as in product-info.tsx
    const products = [
      {
        id: 1,
        brand: "YAMAHA",
        name: "YZ125 (2005-2025)",
        image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
      },
      {
        id: 2,
        brand: "YAMAHA",
        name: "YZ250 (2005-2025)",
        image: "/images/products/yamaha-yz125-250-2005-25-frame-protection-grey.png",
      },
      {
        id: 4,
        brand: "YAMAHA",
        name: "YZ250F (2019-2023)",
        image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
      },
      {
        id: 6,
        brand: "YAMAHA",
        name: "YZ450F (2019-2023)",
        image: "/images/products/yamaha-yz250f-450f-2019-23-frame-protection-grey.png",
      },
      {
        id: 5,
        brand: "YAMAHA",
        name: "YZ250F (2024-2025)",
        image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
      },
      {
        id: 7,
        brand: "YAMAHA",
        name: "YZ450F (2024-2025)",
        image: "/images/products/yamaha-yz250f-450f-2024-25-frame-protection-grey.png",
      },
      {
        id: 29,
        brand: "YAMAHA",
        name: "YZ250F Side Plate Left",
        image: "/images/products/yamaha-yz250f-450f-side-plate-left-installed.jpeg",
      },
      {
        id: 30,
        brand: "YAMAHA",
        name: "YZ250F Side Plate Right",
        image: "/images/products/yamaha-yz250f-450f-side-plate-right-installed.jpeg",
      },
      {
        id: 8,
        brand: "KAWASAKI",
        name: "KX125 (2003-2008)",
        image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
      },
      {
        id: 9,
        brand: "KAWASAKI",
        name: "KX250 (2003-2008)",
        image: "/images/products/kawasaki-kx125-250-2003-08-frame-protection-grey.png",
      },
      {
        id: 10,
        brand: "KAWASAKI",
        name: "KX250F (2015-2020)",
        image: "/images/products/kawasaki-kxf250-2015-20-frame-protection-grey.png",
      },
      {
        id: 11,
        brand: "KAWASAKI",
        name: "KX250F (2021-2024)",
        image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
      },
      {
        id: 13,
        brand: "KAWASAKI",
        name: "KX450F (2021-2024)",
        image: "/images/products/kawasaki-kxf250-450-2021-24-frame-protection.png",
      },
      {
        id: 12,
        brand: "KAWASAKI",
        name: "KX250F (2025)",
        image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
      },
      {
        id: 14,
        brand: "KAWASAKI",
        name: "KX450F (2025)",
        image: "/images/products/kawasaki-kxf250-450-2024-25-frame-protection-grey.png",
      },
      {
        id: 15,
        brand: "HONDA",
        name: "CRF250R (2022-2025)",
        image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
      },
      {
        id: 16,
        brand: "HONDA",
        name: "CRF450R (2021-2025)",
        image: "/images/products/honda-crf250r-450r-frame-protection-grey.png",
      },
      {
        id: 17,
        brand: "SUZUKI",
        name: "RM125",
        image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
      },
      {
        id: 18,
        brand: "SUZUKI",
        name: "RM250",
        image: "/images/products/suzuki-rm125-250-2001-12-frame-protection-grey.png",
      },
      {
        id: 19,
        brand: "SUZUKI",
        name: "RMZ250 (2019-2024)",
        image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
      },
      {
        id: 21,
        brand: "SUZUKI",
        name: "RMZ450 (2019-2024)",
        image: "/images/products/suzuki-rmz250-450-2019-25-frame-protection-grey.png",
      },
      {
        id: 20,
        brand: "SUZUKI",
        name: "RMZ450 (2008-2017)",
        image: "/images/products/suzuki-rmz450-2008-17-frame-protection-grey.png",
      },
      {
        id: 22,
        brand: "STARK",
        name: "VARG MX (2022-2025)",
        image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
      },
      {
        id: 23,
        brand: "STARK",
        name: "VARG EX (2024-2025)",
        image: "/images/products/stark-varg-frame-protection-left-installed.jpeg",
      },
      {
        id: 24,
        brand: "FANTIC",
        name: "XXF250 (2021-2025)",
        image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
      },
      {
        id: 25,
        brand: "FANTIC",
        name: "XXF450 (2021-2025)",
        image: "/images/products/fantic-xxf250-450-frame-protection-grey.png",
      },
      {
        id: 26,
        brand: "TRIUMPH",
        name: "TF 250-X (2024-2025)",
        image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
      },
      {
        id: 28,
        brand: "TRIUMPH",
        name: "TF 450-X (2025)",
        image: "/images/products/triumph-tf250x-450x-frame-protection-grey.png",
      },
      {
        id: 27,
        brand: "KOVE",
        name: "450 Rally (2024-2025)",
        image: "/images/products/kove-450-rally-thermal-protection-installed-1.jpeg",
      },
      {
        id: 34,
        brand: "BETA",
        name: "350RR (2023)",
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      },
      {
        id: 35,
        brand: "BETA",
        name: "RR2T 250/300 (2024-2025)",
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      },
      {
        id: 36,
        brand: "BETA",
        name: "RR4T 350/450 (2024-2025)",
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      },
      {
        id: 37,
        brand: "BETA",
        name: "RX300 (2025)",
        image: "/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-grey.png",
      },
      {
        id: 38,
        brand: "HUSQVARNA",
        name: "TC125/250/300 (2025)",
        image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
      },
      {
        id: 39,
        brand: "HUSQVARNA",
        name: "FC250/450 (2025)",
        image: "/images/products/husqvarna-tc-fc-2025-frame-protection-grey.png",
      },
      {
        id: 40,
        brand: "WORKS CONNECTION",
        name: "Protection Maître Cylindre Arrière",
        image: "/images/products/works-connection-rear-master-cylinder-protection-grey.png",
      },
    ]

    return products.find((p) => p.id === Number.parseInt(productId)) // Parse string to number for comparison
  }

  const product = getProductData()

  // Define images based on product ID and brand
  const getProductImages = () => {
    const images: string[] = []

    if (!product) {
      return ["/placeholder.svg?height=400&width=400"]
    }

    images.push(product.image)

    const numericProductId = Number.parseInt(productId)

    // Add additional images based on brand and product type
    if (product.brand === "YAMAHA") {
      if (numericProductId === 1 || numericProductId === 2) {
        // YZ125/250 variations
        images.push("/images/products/yamaha-yz125-250-2005-25-frame-protection-black.png")
      } else if (numericProductId === 5 || numericProductId === 7) {
        // YZ250F/450F (2024-2025) variations
        images.push("/images/products/yamaha-yz250f-450f-2024-25-frame-protection-black.png")
      } else if (numericProductId === 29) {
        // YZ250F/450F Side Plate Left variations
        images.push("/images/products/yamaha-yz250f-450f-24-25-side-plate-left.jpeg")
        images.push("/images/products/yamaha-yz250f-450f-side-plate-left-detail-1.jpeg")
        images.push("/images/products/yamaha-yz250f-450f-side-plate-left-detail-2.jpeg")
      } else if (numericProductId === 30) {
        // YZ250F/450F Side Plate Right variations
        images.push("/images/products/yamaha-yz250f-450f-24-25-side-plate-right.jpeg")
        images.push("/images/products/yamaha-yz250f-450f-side-plate-right-detail-1.jpeg")
        images.push("/images/products/yamaha-yz250f-450f-side-plate-right-detail-2.jpeg")
      }
    }

    // KAWASAKI Products
    else if (product.brand === "KAWASAKI") {
      if (numericProductId === 8 || numericProductId === 9) {
        // KX125/250 (2003-2008) variations
        images.push("/images/products/kawasaki-kx125-250-2003-08-frame-protection-black.png")
      } else if (numericProductId === 12 || numericProductId === 14) {
        // KX250F/450F (2025) variations
        images.push("/images/products/kawasaki-kxf250-450-2024-25-frame-protection-black.png")
      }
    }

    // HONDA Products
    else if (product.brand === "HONDA") {
      images.push("/images/products/honda-crf250r-450r-frame-protection-black.png")
    }

    // SUZUKI Products
    else if (product.brand === "SUZUKI") {
      if (numericProductId === 17 || numericProductId === 18) {
        // RM125/250 variations
        images.push("/images/products/suzuki-rm125-250-2001-12-frame-protection-black.png")
      } else if (numericProductId === 19 || numericProductId === 21) {
        // RMZ250/450 (2019-2024) variations
        images.push("/images/products/suzuki-rmz250-450-2019-25-frame-protection-black.png")
      } else if (numericProductId === 20) {
        // RMZ450 (2008-2017) variations
        images.push("/images/products/suzuki-rmz450-2008-17-frame-protection-black.png")
      }
    }

    // STARK Products
    else if (product.brand === "STARK") {
      images.push("/images/products/stark-varg-frame-protection-right-installed.jpeg")
      images.push("/images/products/stark-varg-side-plate-left-installed.jpeg")
      images.push("/images/products/stark-varg-side-plate-right-installed.jpeg")
      images.push("/images/products/stark-varg-engine-case-protection-right.jpeg")
    }

    // FANTIC Products
    else if (product.brand === "FANTIC") {
      images.push("/images/products/fantic-xxf250-450-frame-protection.png")
    }

    // TRIUMPH Products
    else if (product.brand === "TRIUMPH") {
      images.push("/images/products/triumph-tf250x-450x-frame-protection-black.png")
      images.push("/images/products/triumph-tf250x-450x-side-plate-left-installed.jpeg")
      images.push("/images/products/triumph-tf250x-450x-side-plate-right-installed.jpeg")
    }

    // KOVE Products
    else if (product.brand === "KOVE") {
      images.push("/images/products/kove-thermal-protection-tank-1.jpeg")
      images.push("/images/products/kove-thermal-protection-tank-2.jpeg")
      images.push("/images/products/kove-thermal-protection-tank-3.jpeg")
    }

    // BETA Products
    else if (product.brand === "BETA") {
      images.push("/images/products/beta-350rr-rr2t-rr4t-rx300-frame-protection-black.png")
    }

    // HUSQVARNA Products
    else if (product.brand === "HUSQVARNA") {
      images.push("/images/products/husqvarna-tc-fc-2025-frame-protection-black.png")
    }

    // WORKS CONNECTION Products
    else if (product.brand === "WORKS CONNECTION") {
      images.push("/images/products/works-connection-rear-master-cylinder-protection-black.png")
    }

    return images.filter((img) => img && !img.includes("placeholder.svg"))
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
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
