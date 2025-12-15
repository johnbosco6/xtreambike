"use client"

import { useState, useEffect } from "react"

export function usePWA() {
  const [isPWA, setIsPWA] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running as PWA
    const checkPWA = () => {
      // Check if running in standalone mode (PWA)
      const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches

      // Check if running in browser with PWA capabilities
      const isPWACapable =
        window.navigator.standalone === true || // iOS Safari
        isStandaloneMode || // Standard PWA
        document.referrer.includes("android-app://") // Android TWA

      setIsStandalone(isStandaloneMode)
      setIsPWA(isPWACapable)
    }

    checkPWA()

    // Listen for display mode changes
    const mediaQuery = window.matchMedia("(display-mode: standalone)")
    const handleChange = () => checkPWA()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return { isPWA, isStandalone }
}
