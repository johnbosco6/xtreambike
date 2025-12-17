"use client"

import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/products-data"

export default function RelatedProducts() {
  // Get 4 random products
  const relatedProducts = useMemo(() => {
    // Shuffle array and take first 4
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 4)
  }, [])

  return (
    <div className="py-12 border-t border-white/5">
      <h2 className="text-2xl font-light mb-8">Produits similaires</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between bg-black/40 backdrop-blur-sm">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-semibold text-[#0BEFD5] tracking-wider uppercase bg-[#0BEFD5]/10 px-2 py-0.5 rounded">
                      {product.brand}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium leading-snug mb-3 group-hover:text-[#0BEFD5] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-lg font-bold text-white">{product.price}</span>
                  <span className="text-xs text-[#0BEFD5] border border-[#0BEFD5] px-2 py-1 rounded hover:bg-[#0BEFD5] hover:text-black transition-colors uppercase font-medium">
                    Voir
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
