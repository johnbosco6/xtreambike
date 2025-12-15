"use client"

import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Home } from "lucide-react"
import { usePWA } from "@/hooks/use-pwa"

interface BackButtonProps {
  fallbackUrl?: string
  label?: string
  showOnDesktop?: boolean
}

export default function BackButton({ fallbackUrl = "/", label = "Retour", showOnDesktop = false }: BackButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isPWA, isStandalone } = usePWA()

  // Show back button if:
  // 1. Running as PWA/standalone
  // 2. On mobile (always useful)
  // 3. Explicitly requested for desktop
  const shouldShow = isPWA || isStandalone || showOnDesktop

  if (!shouldShow) return null

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // No history, go to fallback URL
      router.push(fallbackUrl)
    }
  }

  const getContextualInfo = () => {
    if (pathname.startsWith("/shop/product/")) {
      return { label: "Retour à la boutique", fallback: "/shop" }
    }
    if (pathname === "/cart") {
      return { label: "Continuer vos achats", fallback: "/shop" }
    }
    if (pathname === "/checkout") {
      return { label: "Retour au panier", fallback: "/cart" }
    }
    if (pathname.startsWith("/shop")) {
      return { label: "Retour à l'accueil", fallback: "/" }
    }
    return { label, fallback: fallbackUrl }
  }

  const contextInfo = getContextualInfo()

  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 glass-effect px-3 py-2 rounded-full hover:bg-white/10 transition-colors text-sm"
        aria-label={contextInfo.label}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{contextInfo.label}</span>
      </button>

      {/* Home button for deep pages */}
      {(pathname.includes("/product/") || pathname === "/checkout") && (
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 glass-effect px-3 py-2 rounded-full hover:bg-white/10 transition-colors text-sm"
          aria-label="Retour à l'accueil"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Accueil</span>
        </button>
      )}
    </div>
  )
}
