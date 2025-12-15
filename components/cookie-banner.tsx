"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Cookie } from "lucide-react"

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookieConsent")
        if (!consent) {
            // Small delay for smooth entrance animation
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted")
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined")
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-5xl">
                <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/20 bg-[#1a1a2e]/90 backdrop-blur-xl">
                    <div className="flex-shrink-0 bg-[#4A2CD6]/20 p-3 rounded-full">
                        <Cookie className="w-8 h-8 text-[#0BEFD5]" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-medium mb-2">Confidentialité & Cookies</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Nous utilisons des cookies pour améliorer votre expérience de navigation, mesurer l'audience et vous proposer des contenus adaptés. En continuant, vous acceptez notre utilisation des cookies. <Link href="/privacy" className="text-[#0BEFD5] hover:underline underline-offset-2">En savoir plus</Link>.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleDecline}
                            className="px-6 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/10 transition-colors"
                        >
                            Refuser
                        </button>
                        <button
                            onClick={handleAccept}
                            className="bg-gradient-to-r from-[#4A2CD6] to-[#0BEFD5] text-white px-8 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(11,239,213,0.3)]"
                        >
                            Accepter
                        </button>
                    </div>

                    <button
                        onClick={handleDecline} // Treat closing as decline or just dismiss without saving? Usually safer to treat as "defer" or decline. For this, we'll declin/hide.
                        className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-white"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
