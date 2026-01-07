"use client"

import { useState } from "react"
import { Search, MapPin, Check, Loader2 } from "lucide-react"
import type { FormattedPointRelais } from "@/lib/mondial-relay/types"

interface MondialRelayWidgetProps {
    onSelect: (point: FormattedPointRelais) => void
    selectedPoint?: FormattedPointRelais | null
}

export default function MondialRelayWidget({ onSelect, selectedPoint }: MondialRelayWidgetProps) {
    const [zipCode, setZipCode] = useState("")
    const [points, setPoints] = useState<FormattedPointRelais[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!zipCode) return

        setLoading(true)
        setError("")
        setHasSearched(false)

        try {
            const response = await fetch("/api/mondial-relay/search-points", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postalCode: zipCode,
                    country: "FR",
                    deliveryMode: "24R",
                    maxResults: 20
                }),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to fetch relay points")
            }

            setPoints(data.pointsRelais || [])
            setHasSearched(true)
        } catch (err: any) {
            setError(err.message)
            setPoints([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="glass-card p-4 rounded-xl border border-white/10">
                <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#E3003F]" /> {/* Mondial Relay Brand Color-ish */}
                    Choisir un Point Relais®
                </h3>

                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Code postal (ex: 59000)"
                        className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0BEFD5] text-sm"
                    />
                    <button
                        type="submit"
                        disabled={loading || !zipCode}
                        className="button-primary px-4 py-2 flex items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        <span className="hidden sm:inline">Rechercher</span>
                    </button>
                </form>

                {error && (
                    <div className="text-red-400 text-sm mb-4 bg-red-900/20 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                {hasSearched && points.length === 0 && (
                    <div className="text-center py-6 text-white/50 text-sm">
                        Aucun point relais trouvé pour ce code postal.
                    </div>
                )}

                {points.length > 0 && (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {points.map((point) => (
                            <div
                                key={point.id}
                                onClick={() => onSelect(point)}
                                className={`
                  p-3 rounded-lg cursor-pointer border transition-all
                  ${selectedPoint?.id === point.id
                                        ? "bg-[#E3003F]/10 border-[#E3003F]"
                                        : "bg-white/5 border-transparent hover:bg-white/10"}
                `}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-sm text-white">{point.name}</div>
                                        <div className="text-xs text-white/70 mt-1">{point.address}</div>
                                        <div className="text-xs text-white/70">{point.postalCode} {point.city}</div>
                                    </div>
                                    {selectedPoint?.id === point.id && (
                                        <div className="bg-[#E3003F] p-1 rounded-full">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedPoint && (
                <div className="glass-card p-4 rounded-xl border border-[#0BEFD5]/30 bg-[#0BEFD5]/5">
                    <h4 className="text-sm font-medium text-[#0BEFD5] mb-2">Point Relais sélectionné :</h4>
                    <div className="text-sm font-medium">{selectedPoint.name}</div>
                    <div className="text-xs text-white/70">{selectedPoint.address}, {selectedPoint.postalCode} {selectedPoint.city}</div>
                </div>
            )}
        </div>
    )
}
