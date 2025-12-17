import Header from "@/components/header"
import Footer from "@/components/footer"
import BackButton from "@/components/navigation/back-button"

export default function TermsPage() {
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
                            Conditions Générales de <span className="text-gradient font-medium">Vente</span>
                        </h1>
                        <p className="text-white/50 tracking-widest uppercase text-sm">Dernière mise à jour : 17/12/2025</p>
                    </header>

                    <div className="space-y-20 font-light leading-relaxed opacity-90">
                        {/* Intro */}
                        <div className="prose prose-invert max-w-none text-lg text-white/80">
                            <p>
                                Les présentes conditions régissent les ventes conclues sur le site www.xtremgrip.net, édité par l’entreprise individuelle X-Trem Grip, représentée par M. Jordan Deschamps.
                            </p>
                        </div>

                        {/* Sections 1-4 */}
                        <div className="grid md:grid-cols-2 gap-12">
                            <section>
                                <h2 className="text-xl font-medium mb-6 text-[#0BEFD5] flex items-center gap-2">
                                    <span className="text-xs font-bold border border-[#0BEFD5] px-2 py-1 rounded">01</span>
                                    Objet
                                </h2>
                                <p className="text-white/70">
                                    Les présentes Conditions Générales de Vente déterminent les droits et obligations de X-Trem Grip et de ses clients dans le cadre de la vente de protections de cadre prédécoupées en matériau antidérapant.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-medium mb-6 text-[#0BEFD5] flex items-center gap-2">
                                    <span className="text-xs font-bold border border-[#0BEFD5] px-2 py-1 rounded">02</span>
                                    Produits
                                </h2>
                                <p className="text-white/70 mb-4">Les produits proposés à la vente sont décrits et présentés avec la plus grande exactitude possible. Les photographies et visuels n’ont pas de valeur contractuelle.</p>
                                <ul className="list-disc pl-5 space-y-1 text-white/50 text-sm">
                                    <li>Prédécoupées</li>
                                    <li>Adaptées à différents modèles selon les cotes disponibles</li>
                                    <li>Réalisées en matériau antidérapant</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-medium mb-6 text-[#0BEFD5] flex items-center gap-2">
                                    <span className="text-xs font-bold border border-[#0BEFD5] px-2 py-1 rounded">03</span>
                                    Prix
                                </h2>
                                <p className="text-white/70">
                                    Les prix sont exprimés en euros (€), la TVA est non applicable, art. 293 B du CGI.<br />
                                    X-Trem Grip se réserve le droit de modifier ses tarifs à tout moment, mais les produits sont facturés sur la base du tarif en vigueur au moment de la commande.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-medium mb-6 text-[#0BEFD5] flex items-center gap-2">
                                    <span className="text-xs font-bold border border-[#0BEFD5] px-2 py-1 rounded">04</span>
                                    Commande
                                </h2>
                                <p className="text-white/70 mb-4">La validation de la commande implique l'acceptation des CGV, la confirmation du panier et le paiement.</p>
                                <p className="text-white/50 text-sm">X-Trem Grip se réserve le droit d’annuler toute commande en cas de problème de paiement, fraude, ou commande anormale.</p>
                            </section>
                        </div>

                        {/* Section 5 & 6 */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                <section>
                                    <h2 className="text-xl font-medium mb-6 text-[#0BEFD5]">05. Paiement</h2>
                                    <p className="text-white/70 mb-4">Moyens de paiement acceptés (Sécurisés PCI-DSS) :</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-3 text-white/80">
                                            <div className="w-2 h-2 rounded-full bg-[#0BEFD5]"></div>
                                            Stripe (CB)
                                        </li>
                                        <li className="flex items-center gap-3 text-white/80">
                                            <div className="w-2 h-2 rounded-full bg-[#0BEFD5]"></div>
                                            SumUp
                                        </li>
                                    </ul>
                                </section>
                                <section>
                                    <h2 className="text-xl font-medium mb-6 text-[#0BEFD5]">06. Fabrication</h2>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-4xl font-light text-white">1-30</span>
                                        <span className="text-sm text-white/50 uppercase tracking-widest">Jours</span>
                                    </div>
                                    <p className="text-white/50 text-sm">Délais indicatifs selon modèle et charge de production.</p>
                                </section>
                            </div>
                        </div>

                        {/* Withdrawal Section */}
                        <section className="border-t border-b border-white/5 py-12">
                            <h2 className="text-3xl font-light mb-8 text-center uppercase tracking-widest">Rétractation</h2>
                            <div className="max-w-3xl mx-auto text-center mb-8">
                                <p className="text-xl font-light text-white mb-6">
                                    Vous disposez de <span className="text-[#0BEFD5]">30 jours</span> pour changer d'avis.
                                </p>
                                <p className="text-white/60 mb-8">
                                    Le produit doit être retourné neuf, complet, non posé (film protecteur intact).
                                </p>
                            </div>
                            <div className="bg-[#E3003F]/10 p-6 rounded-xl border border-[#E3003F]/20 max-w-2xl mx-auto">
                                <p className="font-bold text-[#E3003F] mb-1 flex items-center gap-2">
                                    <span>⛔</span> Important
                                </p>
                                <p className="text-[#E3003F]/80 text-sm">Les produits standard prédécoupés ne sont pas personnalisés, le droit de rétractation s’applique donc normalement.</p>
                            </div>
                        </section>

                        {/* Remaining Legal items as a compact grid */}
                        <div className="grid md:grid-cols-3 gap-8 text-sm text-white/60">
                            {[
                                { title: "Garantie Légale", content: "Conformité (L217-3) et Vices cachés (1641 Code civil)." },
                                { title: "Responsabilité", content: "Non responsable en cas de mauvaise pose ou mauvais entretien." },
                                { title: "Litiges", content: "Médiation gratuite ou tribunaux français compétents." }
                            ].map((item, i) => (
                                <section key={i} className="p-6 rounded-xl bg-white/[0.01] border border-white/5">
                                    <h3 className="text-[#0BEFD5] font-medium mb-2 uppercase tracking-wider text-xs">{item.title}</h3>
                                    <p>{item.content}</p>
                                </section>
                            ))}
                        </div>

                        {/* Contact */}
                        <section className="text-center pt-12">
                            <h2 className="text-xl font-medium mb-6 text-white">Une question sur nos conditions ?</h2>
                            <a href="mailto:xtremgrip@gmail.com" className="inline-block px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-[#0BEFD5] transition-all">
                                xtremgrip@gmail.com
                            </a>
                        </section>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}
