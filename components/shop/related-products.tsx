import Link from "next/link"

export default function RelatedProducts() {
  // Related products with correct image mapping
  const relatedProducts = [
    {
      id: 4,
      name: "YZ250F (2019-2023)",
      price: "29,99 €",
      brand: "YAMAHA",
      category: "250cc 4T",
    },
    {
      id: 5,
      name: "YZ250F (2024-2025)",
      price: "29,99 €",
      brand: "YAMAHA",
      category: "250cc 4T",
    },
    {
      id: 6,
      name: "YZ450F (2018-2022)",
      price: "29,99 €",
      brand: "YAMAHA",
      category: "450cc 4T",
    },
    {
      id: 7,
      name: "YZ450F (2023-2025)",
      price: "29,99 €",
      brand: "YAMAHA",
      category: "450cc 4T",
    },
    {
      id: 28,
      name: "TF 450-X (2025)",
      price: "24,99 €",
      brand: "TRIUMPH",
      category: "450cc 4T",
    },
  ]

  return (
    <div className="mt-12 md:mt-16">
      <h2 className="text-xl md:text-2xl font-light mb-6 md:mb-8">Produits similaires</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <Link href={`/shop/product/${product.id}`} key={product.id} className="group">
            <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col">
              <div className="relative h-36 md:h-48 overflow-hidden bg-gradient-to-br from-[#0046BD]/20 to-[#FFFFFF]/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-light opacity-30 mb-1">{product.brand}</div>
                  <div className="text-xs opacity-60">{product.category}</div>
                </div>
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <h3 className="font-light text-xs md:text-sm mb-2 flex-1 line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-end">
                  <p className="font-medium text-sm md:text-base">{product.price}</p>
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
