"use client"

import { useState, useEffect } from "react"
import { X, Wrench } from "lucide-react"

export default function MaintenanceBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has dismissed the banner in this session
        const dismissed = sessionStorage.getItem("maintenanceBannerDismissed")
        if (!dismissed) {
            setIsVisible(true)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        sessionStorage.setItem("maintenanceBannerDismissed", "true")
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative mx-4 max-w-lg rounded-xl border border-[#0BEFD5]/30 bg-gradient-to-br from-gray-900 to-black p-6 shadow-[0_0_30px_rgba(11,239,213,0.3)]">
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-3 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Icon */}
                <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-[#0BEFD5]/10 p-3">
                        <Wrench className="h-8 w-8 text-[#0BEFD5]" />
                    </div>
                </div>

                {/* French Text */}
                <div className="mb-4 text-center">
                    <h2 className="mb-2 text-xl font-bold text-white">Site en maintenance</h2>
                    <p className="text-sm text-gray-300">
                        Notre site est actuellement en cours de maintenance pour vous offrir une meilleure expérience.
                        Certaines fonctionnalités peuvent être temporairement indisponibles.
                    </p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-white/10"></div>

                {/* English Text */}
                <div className="text-center">
                    <h2 className="mb-2 text-xl font-bold text-white">Under Maintenance</h2>
                    <p className="text-sm text-gray-300">
                        Our website is currently undergoing maintenance to provide you with a better experience.
                        Some features may be temporarily unavailable.
                    </p>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleDismiss}
                        className="rounded-lg bg-[#0BEFD5] px-6 py-2 text-sm font-semibold text-black transition-all hover:bg-[#0BEFD5]/90 hover:shadow-[0_0_15px_rgba(11,239,213,0.5)]"
                    >
                        J'ai compris / I Understand
                    </button>
                </div>
            </div>
        </div>
    )
}
