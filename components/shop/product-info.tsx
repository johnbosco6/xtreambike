import { useRouter } from "next/navigation"
import { products } from "@/lib/products-data"

interface ProductInfoProps {
  productId: string
}

export default function ProductInfo({ productId }: ProductInfoProps) {
  const router = useRouter()
  const { addItem } = useCart()

  const product = products.find((p) => p.id === Number(productId))

  // Get all variants of this specific model (same brand, name/model, but different category or color)
  // Our data generation uses the full description but the 'name' contains the model info.
  // Actually, we can filter by brand and the part of the name before the category/color suffix.
  const relatedVariants = useMemo(() => {
    if (!product) return []
    // Extract base model name from product.name (before " - ")
    const baseModel = product.name.split(" - ")[0]
    return products.filter(p => p.brand === product.brand && p.name.startsWith(baseModel))
  }, [product])

  const availableColors = useMemo(() => {
    const colors = new Map()
    relatedVariants.forEach(p => {
      if (p.category === product?.category) {
        colors.set(p.color, { name: p.color, hex: p.colorHex, id: p.id })
      }
    })
    return Array.from(colors.values())
  }, [relatedVariants, product?.category])

  const availableTypes = useMemo(() => {
    const types = new Map()
    relatedVariants.forEach(p => {
      if (p.color === product?.color) {
        types.set(p.category, { name: p.category, id: p.id })
      }
    })
    return Array.from(types.values())
  }, [relatedVariants, product?.color])

  const [quantity, setQuantity] = useState(1)
  const [selectedCountry, setSelectedCountry] = useState("France")
  const [selectedDelivery, setSelectedDelivery] = useState(0)
  const deliveryOptions = getDeliveryOptions(selectedCountry)

  const handleColorChange = (propId: number) => {
    router.push(`/shop/product/${propId}`)
  }

  const handleTypeChange = (propId: number) => {
    router.push(`/shop/product/${propId}`)
  }

  const getDeliveryOptions = (country: string) => {
    const deliveryOptions: Record<string, { name: string; price: number; days: string }[]> = {
      France: [
        { name: "La Poste", price: 4.9, days: "2-5 jours ouvrés" },
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


  const handleAddToCart = () => {
    if (!product) {
      console.error("[v0] Product not found for ID:", productId)
      return
    }

    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.priceNumber,
        variant: product.category,
        color: product.color,
        image: product.image,
        brand: product.brand,
        quantity: quantity,
      })
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

      {/* Variants (Type de protection) */}
      {availableTypes.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Type de protection</h3>
          <div className="grid grid-cols-1 gap-2">
            {availableTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${product?.id === type.id ? "border-[#0BEFD5] bg-[#0BEFD5]/10" : "border-white/20 hover:border-white/40"
                  }`}
              >
                <div className="font-medium text-sm">{type.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {availableColors.length > 0 && (
        <div className="mb-6 md:mb-8">
          <h3 className="text-sm font-medium mb-2 md:mb-3">Couleur:</h3>
          <div className="flex gap-3">
            {availableColors.map((color) => (
              <button
                key={color.id}
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-colors ${product?.id === color.id ? "border-[#0BEFD5]" : "border-white/20 hover:border-white/50"
                  }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => handleColorChange(color.id)}
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

      <button onClick={handleAddToCart} className="button-primary w-full py-4 text-lg" disabled={!product?.inStock}>
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        {product?.inStock ? "Ajouter au panier" : "Rupture de stock"}
      </button>

      {/* Description */}
      {product?.description && (
        <div className="pt-4 pb-2">
          <h3 className="font-medium mb-3">Description</h3>
          <p className="text-sm opacity-80 whitespace-pre-line leading-relaxed">{product.description}</p>
        </div>
      )}

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
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-[#0BEFD5]" />
          <div>
            <div className="text-sm font-medium">Livraison rapide</div>
            <div className="text-xs opacity-70">2-5 jours ouvrés</div>
          </div>
        </div>
      </div>
    </div>
  )
}
