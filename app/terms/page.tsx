import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TermsPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white text-black">
            <Header />
            <div className="container mx-auto px-6 py-24 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">CONDITIONS GÉNÉRALES DE VENTE (CGV) – X-TREM GRIP</h1>
                <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : [à compléter]</p>

                <p className="mb-8">
                    Les présentes conditions régissent les ventes conclues sur le site www.xtremgrip.net, édité par l’entreprise individuelle X-Trem Grip, représentée par M. Jordan Deschamps.
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">1. Objet</h2>
                    <p>
                        Les présentes Conditions Générales de Vente déterminent les droits et obligations de X-Trem Grip et de ses clients dans le cadre de la vente de protections de cadre prédécoupées en matériau antidérapant.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">2. Produits</h2>
                    <p className="mb-2">Les produits proposés à la vente sont décrits et présentés avec la plus grande exactitude possible. Les photographies et visuels n’ont pas de valeur contractuelle.</p>
                    <p>Les protections proposées sont :</p>
                    <ul className="list-disc pl-5">
                        <li>Prédécoupées</li>
                        <li>Adaptées à différents modèles selon les cotes disponibles</li>
                        <li>Réalisées en matériau antidérapant</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">3. Prix</h2>
                    <p>
                        Les prix sont exprimés en euros (€), la TVA est non applicable, art. 293 B du CGI.<br />
                        X-Trem Grip se réserve le droit de modifier ses tarifs à tout moment, mais les produits sont facturés sur la base du tarif en vigueur au moment de la commande.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">4. Commande</h2>
                    <p className="mb-2">La validation de la commande implique :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>L’acceptation des présentes CGV</li>
                        <li>La confirmation du panier</li>
                        <li>Le paiement de la commande</li>
                    </ul>
                    <p>X-Trem Grip se réserve le droit d’annuler toute commande en cas de problème de paiement, fraude, ou commande anormale.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">5. Paiement</h2>
                    <p className="mb-2">Les moyens de paiement acceptés sont :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Stripe (carte bancaire sécurisée)</li>
                        <li>SumUp</li>
                    </ul>
                    <p>
                        Les données bancaires sont traitées exclusivement par ces prestataires certifiés PCI-DSS.<br />
                        X-Trem Grip ne conserve aucune donnée bancaire.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">6. Délais de fabrication</h2>
                    <p className="mb-2">Les délais de fabrication varient de 1 à 30 jours selon :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Les modèles demandés</li>
                        <li>La disponibilité des côtes</li>
                        <li>La charge de production</li>
                    </ul>
                    <p>Ces délais sont donnés à titre indicatif. En cas de dépassement, le client en est informé.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">7. Livraison</h2>
                    <p className="mb-2">Délais indicatifs après expédition :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>France métropolitaine : 2 à 3 jours ouvrables</li>
                        <li>Europe : 3 à 5 jours ouvrables</li>
                        <li>Reste du monde : 7 à 14 jours ouvrables</li>
                    </ul>
                    <p className="mb-2">Options express disponibles : 24 à 48h (selon région).</p>
                    <p className="mb-2">Transporteurs utilisés :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>La Poste</li>
                        <li>Chronopost</li>
                        <li>Mondial Relay</li>
                    </ul>
                    <p>Un numéro de suivi est transmis au client dès l’expédition.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">8. Retraitement – Réception</h2>
                    <p>
                        Le client est tenu de vérifier l’état du colis et du produit à réception.<br />
                        Toute anomalie doit être signalée rapidement à <a href="mailto:xtremgrip@gmail.com" className="text-blue-600 hover:underline">xtremgrip@gmail.com</a> avec preuves photos.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">9. Droit de rétractation</h2>
                    <p className="mb-4">
                        Conformément au Code de la consommation (art. L221-18), le client dispose d’un délai de 30 jours à compter de la réception du produit pour exercer son droit de rétractation sans motif.
                    </p>

                    <h3 className="font-semibold mb-2">Conditions :</h3>
                    <p className="mb-2">Le produit doit être :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Non utilisé</li>
                        <li>En parfait état</li>
                        <li>Retourné dans son emballage d'origine</li>
                        <li>Accompagné du numéro de retour communiqué par X-Trem Grip</li>
                    </ul>

                    <p className="mb-4">Veuillez noter qu'une fois le film protecteur recouvrant la partie adhésive retiré, la garantie ne pourra plus être appliquée.</p>

                    <h3 className="font-semibold mb-2">Frais de retour :</h3>
                    <p className="mb-4">À la charge du client, sauf erreur de préparation ou produit défectueux.</p>

                    <div className="bg-yellow-50 p-4 border-l-4 border-yellow-500">
                        <p className="font-bold">⛔ Important :</p>
                        <p>Les produits standard prédécoupés vendus par X-Trem Grip ne sont pas personnalisés → donc le droit de rétractation s’applique normalement.</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">10. Retour et remboursement</h2>
                    <p>Après réception et vérification, le remboursement est effectué sous 5 à 10 jours ouvrables selon le mode de paiement utilisé.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">11. Garantie légale</h2>
                    <p>X-Trem Grip applique :</p>
                    <ul className="list-disc pl-5">
                        <li>La garantie légale de conformité (articles L217-3 et suivants du Code de la consommation)</li>
                        <li>La garantie contre les vices cachés (articles 1641 et suivants du Code civil)</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">12. Responsabilité</h2>
                    <p>X-Trem Grip ne saurait être tenu responsable :</p>
                    <ul className="list-disc pl-5">
                        <li>En cas d'utilisation non conforme du produit</li>
                        <li>En cas d’installation incorrecte</li>
                        <li>Pour les dommages résultant d’un mauvais entretien du support</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">13. Service client</h2>
                    <p>
                        📩 Email : <a href="mailto:xtremgrip@gmail.com" className="text-blue-600 hover:underline">xtremgrip@gmail.com</a><br />
                        📞 Téléphone : +33 7 87 10 68 22
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">14. Règlement des litiges</h2>
                    <p>
                        En cas de litige, le client doit d’abord contacter le service client.<br />
                        En l'absence de solution amiable, le client peut recourir gratuitement à la médiation (art. L612-1 du Code de la consommation).<br />
                        À défaut, les tribunaux français seront seuls compétents.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">15. Loi applicable</h2>
                    <p>Les présentes CGV sont soumises au droit français.</p>
                </section>
            </div>
            <Footer />
        </main>
    )
}
