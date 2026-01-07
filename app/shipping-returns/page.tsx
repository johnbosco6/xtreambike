"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import BackButton from "@/components/navigation/back-button"

export default function ShippingReturnsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#0BEFD5] selection:text-black">
            <Header />
            <div className="pt-32 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A2CD6]/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                    <div className="mb-12">
                        <BackButton fallbackUrl="/" label="Retour à l'accueil" className="text-white/60 hover:text-[#0BEFD5]" />
                    </div>

                    <header className="mb-20 text-center">
                        <h1 className="text-4xl md:text-6xl font-extralight tracking-tight mb-6 uppercase">
                            Livraison & <span className="text-gradient font-medium">Retours</span>
                        </h1>
                        <p className="text-white/50 tracking-widest uppercase text-sm">Transparence et Garantie X-Trem</p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {[
                            { title: "Livraison", desc: "Expédition internationale", icon: "🌍" },
                            { title: "Retours", desc: "14 Jours pour changer d'avis", icon: "↺" },
                            { title: "Garantie", desc: "Qualité Premium Assurée", icon: "🛡️" }
                        ].map((hero, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl text-center border border-white/5">
                                <span className="text-4xl mb-4 block">{hero.icon}</span>
                                <h3 className="text-xl font-light uppercase tracking-wider mb-2">{hero.title}</h3>
                                <p className="text-sm text-white/50">{hero.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-24">

                        {/* Livraison */}
                        <section className="grid md:grid-cols-[1fr_300px] gap-12 items-start">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl font-light mb-8 flex items-center gap-4">
                                    <span className="w-12 h-[1px] bg-[#0BEFD5]"></span>
                                    Expédition
                                </h2>
                                <p className="text-white/80 mb-8 leading-relaxed text-lg">
                                    Toutes les commandes sont préparées avec soin dans notre atelier en France. Nous expédions dans le monde entier avec un suivi complet pour garantir la bonne réception de vos protections.
                                </p>

                                <div className="grid gap-4">
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center group hover:border-[#0BEFD5]/30 transition-colors">
                                        <div>
                                            <span className="block text-white font-medium mb-1">France Métropolitaine</span>
                                            <span className="text-sm text-white/50">Lettre Suivie / Mondial Relay</span>
                                        </div>
                                        <span className="text-[#0BEFD5] font-mono">2-5 Jours</span>
                                    </div>
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl flex justify-between items-center group hover:border-[#0BEFD5]/30 transition-colors">
                                        <div>
                                            <span className="block text-white font-medium mb-1">Europe & Monde</span>
                                            <span className="text-sm text-white/50">Suivi International</span>
                                        </div>
                                        <span className="text-[#0BEFD5] font-mono">3-14 Jours</span>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2 bg-[#0BEFD5]/5 p-8 rounded-2xl border border-[#0BEFD5]/20 backdrop-blur-sm">
                                <h3 className="text-[#0BEFD5] uppercase tracking-widest text-sm font-bold mb-4">Délai Atelier</h3>
                                <div className="text-5xl font-light mb-2">1-30</div>
                                <div className="text-sm text-white/60 mb-6 uppercase tracking-wider">Jours de Fabrication</div>
                                <p className="text-xs text-white/40 leading-relaxed">
                                    Nos kits sont produits à la demande pour garantir une adhérence optimale. Le délai varie selon la charge de production.
                                </p>
                            </div>
                        </section>

                        {/* Retours & Politique */}
                        <section>
                            <h2 className="text-3xl font-light mb-8 flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-[#4A2CD6]"></span>
                                Politique de Retours
                            </h2>
                            <div className="glass-card p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                                <p className="text-white/80 leading-relaxed text-lg mb-8">
                                    Nous offrons une politique de retour de <strong>14 jours</strong> à compter de la date de réception de votre commande.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-[#0BEFD5]/20 flex items-center justify-center text-[#0BEFD5] text-xs mt-1">1</span>
                                            <p className="text-white/70 text-sm">Les produits doivent être retournés dans leur emballage d'origine, non utilisés et en parfait état.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-[#0BEFD5]/20 flex items-center justify-center text-[#0BEFD5] text-xs mt-1">2</span>
                                            <p className="text-white/70 text-sm">Pour initier un retour, connectez-vous à votre compte client ou contactez notre service client pour obtenir un numéro d'autorisation.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-[#0BEFD5]/20 flex items-center justify-center text-[#0BEFD5] text-xs mt-1">3</span>
                                            <p className="text-white/70 text-sm">Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part.</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-[#0BEFD5]/20 flex items-center justify-center text-[#0BEFD5] text-xs mt-1">4</span>
                                            <p className="text-white/70 text-sm">Une fois le retour reçu et vérifié, le remboursement est traité dans un délai de 5 à 10 jours ouvrables.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center pt-8 border-t border-white/5">
                                    <a href="mailto:xtremgrip@gmail.com" className="text-[#0BEFD5] hover:text-white transition-colors uppercase tracking-widest text-sm border-b border-[#0BEFD5] pb-1">
                                        Contacter le service client
                                    </a>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
