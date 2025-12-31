'use client';

import { useState } from 'react';
import { Search, MapPin, Clock, X } from 'lucide-react';
import type { FormattedPointRelais } from '@/lib/mondial-relay/types';

interface PointRelaisSelectorProps {
    deliveryMode?: '24R' | '24L' | 'XOH';
    onSelect: (pointRelais: FormattedPointRelais) => void;
    selectedPointRelais?: FormattedPointRelais | null;
}

export default function PointRelaisSelector({
    deliveryMode = '24R',
    onSelect,
    selectedPointRelais,
}: PointRelaisSelectorProps) {
    const [postalCode, setPostalCode] = useState('');
    const [pointsRelais, setPointsRelais] = useState<FormattedPointRelais[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!postalCode || postalCode.length < 4) {
            setError('Veuillez entrer un code postal valide');
            return;
        }

        setLoading(true);
        setError(null);
        setSearched(true);

        try {
            const response = await fetch('/api/mondial-relay/search-points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postalCode,
                    country: 'FR',
                    deliveryMode,
                    maxResults: 20,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Erreur lors de la recherche');
            }

            setPointsRelais(data.pointsRelais);

            if (data.pointsRelais.length === 0) {
                setError('Aucun Point Relais® trouvé pour ce code postal');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
            setPointsRelais([]);
        } finally {
            setLoading(false);
        }
    };

    const formatOpeningHours = (hours: string[]) => {
        if (!hours || hours.length === 0 || hours.every(h => !h)) {
            return 'Fermé';
        }

        const slots = [];
        if (hours[0] && hours[1]) {
            slots.push(`${hours[0]}-${hours[1]}`);
        }
        if (hours[2] && hours[3]) {
            slots.push(`${hours[2]}-${hours[3]}`);
        }

        return slots.length > 0 ? slots.join(', ') : 'Fermé';
    };

    const formatDistance = (meters: number) => {
        if (meters < 1000) {
            return `${meters}m`;
        }
        return `${(meters / 1000).toFixed(1)}km`;
    };

    return (
        <div className="space-y-4">
            {/* Selected Point Relais Display */}
            {selectedPointRelais && (
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-5 h-5 text-cyan-400" />
                                <h3 className="font-semibold text-white">{selectedPointRelais.name}</h3>
                            </div>
                            <p className="text-sm text-gray-300">{selectedPointRelais.address}</p>
                            <p className="text-sm text-gray-300">
                                {selectedPointRelais.postalCode} {selectedPointRelais.city}
                            </p>
                            <p className="text-xs text-cyan-400 mt-1">
                                À {formatDistance(selectedPointRelais.distance)} de votre recherche
                            </p>
                        </div>
                        <button
                            onClick={() => onSelect(null as any)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Search Form */}
            {!selectedPointRelais && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Rechercher un Point Relais®
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Code postal"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                maxLength={5}
                            />
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Search className="w-4 h-4" />
                                {loading ? 'Recherche...' : 'Rechercher'}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Results */}
                    {searched && !loading && pointsRelais.length > 0 && (
                        <div className="space-y-3">
                            <p className="text-sm text-gray-400">
                                {pointsRelais.length} Point{pointsRelais.length > 1 ? 's' : ''} Relais® trouvé{pointsRelais.length > 1 ? 's' : ''}
                            </p>
                            <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                                {pointsRelais.map((pr) => (
                                    <div
                                        key={pr.id}
                                        className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-500/30 transition-all cursor-pointer group"
                                        onClick={() => onSelect(pr)}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                                                    {pr.name}
                                                </h4>
                                                <p className="text-sm text-gray-400 mt-1">{pr.address}</p>
                                                <p className="text-sm text-gray-400">
                                                    {pr.postalCode} {pr.city}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-cyan-400">
                                                    {formatDistance(pr.distance)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Opening Hours */}
                                        <div className="mt-3 pt-3 border-t border-white/10">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock className="w-3 h-3" />
                                                <span>Aujourd'hui: {formatOpeningHours(pr.openingHours.monday)}</span>
                                            </div>
                                        </div>

                                        <button className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all">
                                            Sélectionner ce Point Relais®
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
