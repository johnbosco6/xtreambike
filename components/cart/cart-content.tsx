"use client"

import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"

export default function CartContent() {
  const { state, updateQuantity, removeItem, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass-card p-8 md:p-12 rounded-xl max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-50" />
          <h2 className="text-xl md:text-2xl font-light mb-4">Votre panier est vide</h2>
          <p className="font-light opacity-70 mb-8">Découvrez notre collection de protections pour votre moto.</p>
          <Link href="/shop" className="button-primary flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continuer vos achats
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-light">Articles ({state.itemCount})</h2>
            <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-300 transition-colors">
              Vider le panier
            </button>
          </div>

          <div className="space-y-6">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 glass-effect rounded-lg">
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-black/20 rounded-lg overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-light text-sm md:text-base mb-1 line-clamp-2">{item.name}</h3>
                  <div className="flex flex-wrap gap-2 text-xs opacity-70 mb-2">
                    <span className="bg-[#4A2CD6]/20 px-2 py-1 rounded">{item.brand}</span>
                    {item.variant && <span className="bg-[#0BEFD5]/20 px-2 py-1 rounded">{item.variant}</span>}
                    {item.color && <span className="bg-[#F50CA0]/20 px-2 py-1 rounded">{item.color}</span>}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center glass-effect rounded-full"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center glass-effect rounded-full"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="glass-card p-6 rounded-xl sticky top-24">
          <h2 className="text-xl font-light mb-6">Résumé de la commande</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-70">Sous-total</span>
              <span>{state.total.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Livraison</span>
              <span className="text-[#0BEFD5]">Gratuite</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">TVA (20%)</span>
              <span>{(state.total * 0.2).toFixed(2)} €</span>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>{(state.total * 1.2).toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/checkout" className="button-primary w-full text-center block">
              Procéder au paiement
            </Link>
            <Link
              href="/shop"
              className="button-secondary w-full text-center block flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuer vos achats
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs opacity-70">Livraison gratuite en France métropolitaine</p>
          </div>
        </div>
      </div>
    </div>
  )
}
