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

                        {/* Retours */}
                        <section>
                            <h2 className="text-3xl font-light mb-8 flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-[#4A2CD6]"></span>
                                Retours & Échanges
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <p className="text-white/80 leading-relaxed mb-6">
                                        Vous disposez de <strong>14 jours</strong> après réception pour nous retourner un produit si celui-ci ne vous convient pas.
                                    </p>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-4">
                                            <span className="text-[#4A2CD6] mt-1">✓</span>
                                            <span className="text-white/70">Le produit doit être neuf et complet.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <span className="text-[#4A2CD6] mt-1">✓</span>
                                            <span className="text-white/70">Le film protecteur de l'adhésif doit être <strong className="text-white">intact</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <span className="text-[#4A2CD6] mt-1">✓</span>
                                            <span className="text-white/70">Emballage soigneux pour le transport.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5">
                                    <h3 className="text-white font-medium mb-4">Comment procéder ?</h3>
                                    <ol className="space-y-6 relative border-l border-white/10 ml-3 pl-8">
                                        <li className="relative">
                                            <span className="absolute -left-[39px] w-5 h-5 rounded-full bg-[#4A2CD6] border-4 border-black"></span>
                                            <span className="block text-sm text-white/50 mb-1">Étape 1</span>
                                            Envoyez un email à <a href="mailto:xtremgrip@gmail.com" className="text-white hover:underline">xtremgrip@gmail.com</a>
                                        </li>
                                        <li className="relative">
                                            <span className="absolute -left-[39px] w-5 h-5 rounded-full bg-white/20 border-4 border-black"></span>
                                            <span className="block text-sm text-white/50 mb-1">Étape 2</span>
                                            Recevez votre bon de retour
                                        </li>
                                        <li className="relative">
                                            <span className="absolute -left-[39px] w-5 h-5 rounded-full bg-white/20 border-4 border-black"></span>
                                            <span className="block text-sm text-white/50 mb-1">Étape 3</span>
                                            Remboursement sous 7 jours après réception
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </section>

                        {/* Garantie */}
                        <section className="text-center max-w-2xl mx-auto">
                            <div className="inline-block p-4 rounded-full bg-[#0BEFD5]/10 mb-6">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h2 className="text-3xl font-light mb-6">Garantie X-Trem</h2>
                            <p className="text-white/70 leading-relaxed mb-8">
                                Nous garantissons la conformité et la qualité de nos adhésifs. En cas de défaut avéré ou d'erreur de notre part, nous prenons en charge l'intégralité des frais d'échange.
                            </p>
                            <a href="mailto:xtremgrip@gmail.com" className="text-[#0BEFD5] hover:text-white transition-colors uppercase tracking-widest text-sm border-b border-[#0BEFD5] pb-1">
                                Contacter le SAV
                            </a>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
