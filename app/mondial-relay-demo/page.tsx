'use client';

import { useState } from 'react';
import PointRelaisSelector from '@/components/checkout/point-relais-selector';
import TrackingDisplay from '@/components/orders/tracking-display';
import type { FormattedPointRelais } from '@/lib/mondial-relay/types';

export default function MondialRelayDemoPage() {
    const [selectedPointRelais, setSelectedPointRelais] = useState<FormattedPointRelais | null>(null);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [showTracking, setShowTracking] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white py-12">
            <div className="max-w-4xl mx-auto px-4 space-y-12">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                        Mondial Relay Integration Demo
                    </h1>
                    <p className="text-gray-400">
                        Test the Point Relais® search and tracking functionality
                    </p>
                </div>

                {/* Point Relais Search Section */}
                <section className="space-y-4">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-semibold text-cyan-400">
                            1. Point Relais® Search
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">
                            Search for nearby Point Relais® by postal code
                        </p>
                    </div>

                    <PointRelaisSelector
                        deliveryMode="24R"
                        onSelect={setSelectedPointRelais}
                        selectedPointRelais={selectedPointRelais}
                    />

                    {selectedPointRelais && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <p className="text-green-400 font-medium">
                                ✓ Point Relais® sélectionné avec succès!
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                                ID: {selectedPointRelais.id}
                            </p>
                        </div>
                    )}
                </section>

                {/* Tracking Section */}
                <section className="space-y-4">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-semibold text-cyan-400">
                            2. Shipment Tracking
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">
                            Track a shipment by entering an 8-digit tracking number
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Numéro de suivi (8 chiffres)"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                                maxLength={8}
                            />
                            <button
                                onClick={() => setShowTracking(true)}
                                disabled={trackingNumber.length !== 8}
                                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Suivre
                            </button>
                        </div>

                        {showTracking && trackingNumber.length === 8 && (
                            <TrackingDisplay
                                shipmentNumber={trackingNumber}
                                autoRefresh={false}
                            />
                        )}
                    </div>
                </section>

                {/* API Info Section */}
                <section className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-white">API Information</h3>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">API Version:</span>
                            <span className="text-white">API1 (SOAP)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Environment:</span>
                            <span className="text-green-400">Production</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Enseigne:</span>
                            <span className="text-white font-mono">CC234API</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Delivery Modes:</span>
                            <span className="text-white">24R, 24L, XOH</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Available Endpoints:</h4>
                        <ul className="space-y-1 text-xs text-gray-400 font-mono">
                            <li>✓ POST /api/mondial-relay/search-points</li>
                            <li>✓ GET /api/mondial-relay/track</li>
                            <li className="text-gray-600">✗ POST /api/mondial-relay/create-shipment (Requires API2)</li>
                        </ul>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 text-sm text-yellow-400">
                        <strong>Note:</strong> Shipment creation and label generation require API2 credentials.
                        Please provide API2 credentials to enable full functionality.
                    </div>
                </section>
            </div>
        </div>
    );
}
