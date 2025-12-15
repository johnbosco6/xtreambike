"use client"

import { usePathname } from "next/navigation"
import { usePWA } from "@/hooks/use-pwa"
import BackButton from "./back-button"

export default function PWANavigation() {
  const pathname = usePathname()
  const { isPWA, isStandalone } = usePWA()

  // Only show on PWA and for specific pages
  if (!isPWA && !isStandalone) return null

  // Don't show on home page
  if (pathname === "/") return null

  return (
    <div className="container mx-auto px-4 lg:px-6 pt-32 md:pt-36 lg:pt-40">
      <BackButton showOnDesktop={true} />
    </div>
  )
}
