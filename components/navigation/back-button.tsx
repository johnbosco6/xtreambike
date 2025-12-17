"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  fallbackUrl?: string // Kept for interface compatibility but router.back is primary
  label?: string
  className?: string
}

export default function BackButton({ fallbackUrl = "/", label = "Retour", className = "" }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 text-white/80 hover:text-[#0BEFD5] transition-colors ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="font-medium">{label}</span>
    </button>
  )
}
