import Image from "next/image"
import Link from "next/link"

export default function FeaturedProducts() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "X-Grip Pro",
      description: "Poignées premium avec technologie anti-vibration",
      price: "49,99 €",
      image: "/premium-motorcycle-grip.png",
      color: "bg-[#4A2CD6]",
    },
    {
      id: 2,
      name: "MotoFlex Ultra",
      description: "Confort exceptionnel pour les longues distances",
      price: "59,99 €",
      image: "/motorcycle-grip-comfort.png",
      color: "bg-[#0BEFD5]",
    },
    {
      id: 3,
      name: "RaceGrip Elite",
      description: "Adhérence maximale pour la compétition",
      price: "69,99 €",
      image: "/motorcycle-racing-grip.png",
      color: "bg-[#F50CA0]",
    },
    {
      id: 4,
      name: "EnduroTech",
      description: "Spécialement conçu pour le tout-terrain",
      price: "54,99 €",
      image: "/motorcycle-enduro-grip.png",
      color: "bg-[#FF681E]",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFF00] to-[#FF681E]">
            Produits Vedettes
          </span>
        </h2>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Découvrez notre sélection de poignées de moto haut de gamme, conçues pour améliorer votre confort et votre
          contrôle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="neomorphic p-4 md:p-6 rounded-2xl transition-transform hover:scale-105">
              <div className={`${product.color} h-36 md:h-48 rounded-xl mb-4 flex items-center justify-center`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="h-24 md:h-32 w-auto"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4 text-sm md:text-base">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg md:text-xl font-bold">{product.price}</span>
                <Link href={`/shop/product/${product.id}`} className="button-glass text-xs px-3 py-1.5 md:px-4 md:py-2">
                  Voir Détails
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="button-yellow">
            Voir Tous les Produits
          </Link>
        </div>
      </div>
    </section>
  )
}
