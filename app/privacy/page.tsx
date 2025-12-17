import Header from "@/components/header"
import Footer from "@/components/footer"
import BackButton from "@/components/navigation/back-button"

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#0BEFD5] selection:text-black">
            <Header />
            <div className="pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0BEFD5]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="mb-12">
                        <BackButton fallbackUrl="/" label="Retour à l'accueil" className="text-white/60 hover:text-[#0BEFD5]" />
                    </div>

                    <header className="mb-20 text-center">
                        <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-6 uppercase">
                            Politique de <span className="text-gradient font-medium">Confidentialité</span>
                        </h1>
                        <p className="text-white/50 tracking-widest uppercase text-sm">Dernière mise à jour : 17/12/2025</p>
                    </header>

                    <div className="space-y-20">
                        {/* Intro */}
                        <div className="prose prose-invert max-w-none text-lg font-light text-white/80 leading-relaxed">
                            <p>
                                La confiance est au cœur de l'expérience X-Trem Grip. Cette politique détaille en toute transparence la manière dont nous collectons, utilisons et protégeons vos données personnelles sur <span className="text-white">www.xtremgrip.net</span>, conformément au RGPD.
                            </p>
                        </div>

                        {/* Section 1: Responsable */}
                        <section className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-white/5 pt-12">
                            <div className="text-[#0BEFD5] text-xl font-light">01. Responsable</div>
                            <div>
                                <h2 className="text-2xl font-light mb-6">L'Entreprise</h2>
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
                                    <p className="space-y-1 text-white/80">
                                        <strong className="block text-white mb-2">X-Trem Grip</strong>
                                        3 Rue de la Villa Bleue, 65330 Galan, France<br />
                                        SIRET : 883 718 587 00024<br />
                                        <a href="mailto:xtremgrip@gmail.com" className="text-[#0BEFD5] hover:underline mt-2 inline-block">xtremgrip@gmail.com</a>
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Data Collection */}
                        <section className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-white/5 pt-12">
                            <div className="text-[#0BEFD5] text-xl font-light">02. Données</div>
                            <div>
                                <h2 className="text-2xl font-light mb-8">Collecte d'informations</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { title: "Identité", items: ["Nom & Prénom", "Email", "Téléphone", "Adresse de livraison"] },
                                        { title: "Commandes", items: ["Historique d'achat", "Préférences produits", "Paniers sauvegardés"] },
                                        { title: "Paiement", items: ["Sécurisé par Stripe/SumUp", "Aucune donnée bancaire stockée par X-Trem Grip", "Transactions cryptées SSL"] },
                                        { title: "Navigation", items: ["Adresse IP", "Type d'appareil", "Cookies de session", "Analytics"] }
                                    ].map((card, idx) => (
                                        <div key={idx} className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                            <h3 className="text-white font-medium mb-4">{card.title}</h3>
                                            <ul className="space-y-2 text-sm text-white/60">
                                                {card.items.map((item, i) => <li key={i}>• {item}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Usage */}
                        <section className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-white/5 pt-12">
                            <div className="text-[#0BEFD5] text-xl font-light">03. Utilisation</div>
                            <div>
                                <h2 className="text-2xl font-light mb-8">Finalités & Base Légale</h2>
                                <div className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 text-white/90 text-sm uppercase tracking-wider">
                                            <tr>
                                                <th className="p-4 font-medium">Pourquoi ?</th>
                                                <th className="p-4 font-medium">Base Légale</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-white/70 text-sm">
                                            <tr><td className="p-4">Traitement et expédition des commandes</td><td className="p-4 text-[#0BEFD5]">Contrat</td></tr>
                                            <tr><td className="p-4">Service client et SAV</td><td className="p-4 text-[#0BEFD5]">Intérêt légitime</td></tr>
                                            <tr><td className="p-4">Comptabilité et obligations légales</td><td className="p-4 text-[#0BEFD5]">Loi</td></tr>
                                            <tr><td className="p-4">Amélioration du site (Analytics)</td><td className="p-4 text-[#0BEFD5]">Consentement</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Section 4: Sharing */}
                        <section className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-white/5 pt-12">
                            <div className="text-[#0BEFD5] text-xl font-light">04. Partage</div>
                            <div>
                                <h2 className="text-2xl font-light mb-4">Destinataires</h2>
                                <p className="text-white/70 mb-6">Vos données ne sont jamais vendues. Elles sont partagées uniquement avec nos partenaires essentiels pour assurer le service :</p>
                                <div className="flex flex-wrap gap-3">
                                    {['Stripe', 'SumUp', 'La Poste', 'Chronopost', 'Mondial Relay', 'Google Analytics'].map((partner) => (
                                        <span key={partner} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">
                                            {partner}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section 5: Rights */}
                        <section className="grid md:grid-cols-[200px_1fr] gap-8 border-t border-white/5 pt-12">
                            <div className="text-[#0BEFD5] text-xl font-light">05. Vos Droits</div>
                            <div>
                                <h2 className="text-2xl font-light mb-6">Contrôle Total</h2>
                                <p className="text-white/70 mb-8">Conformément au RGPD, vous disposez des droits suivants sur vos données : accès, rectification, effacement, portabilité et opposition.</p>
                                <a href="mailto:xtremgrip@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0BEFD5] text-black font-medium hover:bg-[#0BEFD5]/90 transition-colors">
                                    Exercer mes droits par email
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
