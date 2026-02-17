"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Header from "@/components/header"
import FooterLegal from "@/components/footer-legal"
import { useCart } from "@/contexts/cart-context"
import { Check, ShoppingBag, Home } from "lucide-react"

function SuccessContent() {
    const searchParams = useSearchParams()
    const { clearCart } = useCart()
    const sessionId = searchParams.get("session_id")

    // Clear cart on successful payment
    useEffect(() => {
        if (sessionId) {
            clearCart()
        }
    }, [sessionId, clearCart])

    return (
        <div className="text-center py-8 md:py-16">
            <div className="glass-card p-6 md:p-8 rounded-xl max-w-md mx-auto relative overflow-hidden">
                {/* Success Banner */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#0BEFD5]"></div>

                <div className="w-16 h-16 bg-[#0BEFD5]/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-[#0BEFD5]/50">
                    <Check className="w-8 h-8 text-[#0BEFD5]" />
                </div>

                <h2 className="text-2xl font-light mb-2 text-[#0BEFD5]">Paiement Validé</h2>
                <p className="text-lg font-medium mb-6">Commande confirmée !</p>

                <div className="bg-white/5 rounded-lg p-4 mb-8 text-left border border-white/10">
                    <p className="font-light text-sm opacity-80 mb-2">
                        Merci pour votre commande. Votre paiement a bien été reçu.
                    </p>
                    <p className="font-bold text-sm text-white">
                        Un email de confirmation avec les détails de votre commande vous sera envoyé sous peu.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link href="/shop" className="button-primary w-full text-center block flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Continuer vos achats
                    </Link>
                    <Link href="/" className="button-secondary w-full text-center block flex items-center justify-center gap-2">
                        <Home className="w-4 h-4" />
                        Retour à l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function CheckoutSuccessPage() {
    return (
        <main className="flex min-h-screen flex-col">
            <Header />
            <div className="pt-24 md:pt-32 lg:pt-36 pb-8 md:pb-16">
                <div className="container mx-auto px-4 lg:px-6">
                    <Suspense fallback={<div className="text-center py-12">Chargement...</div>}>
                        <SuccessContent />
                    </Suspense>
                </div>
            </div>
            <FooterLegal />
        </main>
    )
}
