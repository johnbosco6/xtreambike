'use client';

import { useState, useEffect } from 'react';
import { Package, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { FormattedTrackingData } from '@/lib/mondial-relay/services/tracking';

interface TrackingDisplayProps {
    shipmentNumber: string;
    autoRefresh?: boolean;
    refreshInterval?: number; // in milliseconds
}

export default function TrackingDisplay({
    shipmentNumber,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes default
}: TrackingDisplayProps) {
    const [tracking, setTracking] = useState<FormattedTrackingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTracking = async () => {
        try {
            setError(null);
            const response = await fetch(
                `/api/mondial-relay/track?shipmentNumber=${shipmentNumber}&language=FR`
            );

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Erreur lors de la récupération du suivi');
            }

            setTracking(data.tracking);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la récupération du suivi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTracking();

        if (autoRefresh) {
            const interval = setInterval(fetchTracking, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [shipmentNumber, autoRefresh, refreshInterval]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    if (!tracking) {
        return null;
    }

    const getStatusIcon = (status: string) => {
        if (status.includes('livré')) {
            return <CheckCircle className="w-5 h-5 text-green-400" />;
        }
        if (status.includes('anomalie')) {
            return <AlertCircle className="w-5 h-5 text-red-400" />;
        }
        return <Package className="w-5 h-5 text-cyan-400" />;
    };

    const getStatusColor = (status: string) => {
        if (status.includes('livré')) return 'text-green-400';
        if (status.includes('anomalie')) return 'text-red-400';
        return 'text-cyan-400';
    };

    return (
        <div className="space-y-6">
            {/* Status Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(tracking.status)}
                    <h3 className={`text-xl font-semibold ${getStatusColor(tracking.status)}`}>
                        {tracking.status}
                    </h3>
                </div>
                <p className="text-sm text-gray-400">
                    Numéro de suivi: <span className="text-white font-mono">{shipmentNumber}</span>
                </p>
            </div>

            {/* Point Relais Info */}
            {tracking.pointRelaisName && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <MapPin className="w-5 h-5" />
                        <h4 className="font-semibold">Point Relais®</h4>
                    </div>
                    <p className="text-white">{tracking.pointRelaisName}</p>
                    {tracking.pointRelaisId && (
                        <p className="text-sm text-gray-400 mt-1">ID: {tracking.pointRelaisId}</p>
                    )}
                </div>
            )}

            {/* Tracking Timeline */}
            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Historique de suivi
                </h4>

                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-purple-500/50"></div>

                    {/* Events */}
                    <div className="space-y-4">
                        {tracking.events.map((event, index) => (
                            <div key={index} className="relative pl-12">
                                {/* Timeline Dot */}
                                <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-2 border-black"></div>

                                {/* Event Card */}
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <p className="text-white font-medium">{event.description}</p>
                                        <div className="text-right text-sm text-gray-400">
                                            <p>{event.date}</p>
                                            <p>{event.time}</p>
                                        </div>
                                    </div>

                                    {event.location && (
                                        <p className="text-sm text-gray-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {event.location}
                                            {event.country && ` (${event.country})`}
                                        </p>
                                    )}

                                    {event.pointRelaisId && (
                                        <p className="text-xs text-cyan-400 mt-1">
                                            Point Relais®: {event.pointRelaisId}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Refresh Button */}
            {!autoRefresh && (
                <button
                    onClick={fetchTracking}
                    className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg font-medium hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
                >
                    Actualiser le suivi
                </button>
            )}
        </div>
    );
}
