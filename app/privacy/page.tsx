import Header from "@/components/header"
import Footer from "@/components/footer"

export default function PrivacyPage() {
    return (
        <main className="flex min-h-screen flex-col bg-white text-black">
            <Header />
            <div className="container mx-auto px-6 py-24 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">POLITIQUE DE CONFIDENTIALITÉ – X-TREM GRIP</h1>
                <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : [à compléter]</p>

                <p className="mb-8">
                    La présente politique de confidentialité décrit la manière dont X-Trem Grip, entreprise individuelle située 3 Rue de la Villa Bleue, 65330 Galan, collecte, utilise et protège vos données personnelles lorsque vous utilisez le site www.xtremgrip.net.
                    <br />
                    X-Trem Grip s’engage à respecter le Règlement Général sur la Protection des Données (RGPD) et la Loi Informatique et Libertés.
                </p>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">1. Responsable du traitement</h2>
                    <p>
                        X-Trem Grip<br />
                        Entreprise individuelle – Auto-entreprise<br />
                        Responsable légal : Jordan DESCHAMPS<br />
                        SIRET : 883 718 587 00024<br />
                        Adresse : 3 Rue de la Villa Bleue, 65330 Galan<br />
                        Email : xtremgrip@gmail.com<br />
                        Téléphone : +33 7 87 10 68 22
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">2. Données que nous collectons</h2>
                    <p className="mb-4">Nous collectons uniquement les données nécessaires au fonctionnement du site et à la gestion de votre commande.</p>

                    <h3 className="font-semibold mb-2">Données d'identification</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Nom, prénom</li>
                        <li>Adresse postale</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Données liées à la commande</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Produits commandés</li>
                        <li>Adresse de facturation et livraison</li>
                        <li>Historique des commandes</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Données de paiement</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Traitée exclusivement par Stripe ou SumUp</li>
                        <li>❗ X-Trem Grip ne stocke aucune information bancaire</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Données techniques</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Adresse IP</li>
                        <li>Type de navigateur</li>
                        <li>Cookies</li>
                        <li>Données Google Analytics</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">3. Finalités du traitement et bases légales</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-gray-200 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Finalité</th>
                                    <th className="border p-2">Base légale</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Gestion des commandes, paiements, expéditions</td>
                                    <td className="border p-2">Exécution du contrat</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Gestion du compte client</td>
                                    <td className="border p-2">Exécution du contrat</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Service client et réclamations</td>
                                    <td className="border p-2">Intérêt légitime</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Envoi d’emails commerciaux (si inscrit)</td>
                                    <td className="border p-2">Consentement</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Mesure d’audience (Google Analytics)</td>
                                    <td className="border p-2">Consentement</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Sécurité du site et prévention des fraudes</td>
                                    <td className="border p-2">Intérêt légitime</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Obligations comptables et légales</td>
                                    <td className="border p-2">Obligation légale</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">4. Destinataires des données</h2>
                    <p className="mb-4">Vos données sont transmises uniquement aux destinataires suivants :</p>

                    <h3 className="font-semibold mb-2">Interne</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>X-Trem Grip (gestion des commandes / support)</li>
                    </ul>

                    <h3 className="font-semibold mb-2">Prestataires externes</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Squarespace (hébergement du site)</li>
                        <li>Stripe / SumUp (paiement sécurisé)</li>
                        <li>La Poste, Chronopost, Mondial Relay (livraison)</li>
                        <li>Google Analytics (statistiques)</li>
                    </ul>
                    <p>Aucune donnée n’est vendue ni cédée à des tiers non autorisés.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">5. Durée de conservation</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse border border-gray-200 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Type de données</th>
                                    <th className="border p-2">Durée</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Compte client</td>
                                    <td className="border p-2">Tant que le compte est actif + 3 ans d’inactivité</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Commandes et factures</td>
                                    <td className="border p-2">10 ans (obligation légale)</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Emails, échanges SAV</td>
                                    <td className="border p-2">3 ans</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Cookies</td>
                                    <td className="border p-2">6 à 13 mois</td>
                                </tr>
                                <tr>
                                    <td className="border p-2">Données Analytics</td>
                                    <td className="border p-2">14 mois</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">6. Transferts hors Union Européenne</h2>
                    <p>
                        Squarespace, Google Analytics, Stripe et SumUp sont susceptibles d’effectuer des transferts hors UE.<br />
                        Ces transferts sont encadrés par :
                    </p>
                    <ul className="list-disc pl-5">
                        <li>Clauses Contractuelles Types (SCC)</li>
                        <li>Politiques conformes au RGPD</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">7. Sécurité des données</h2>
                    <p>Nous mettons en place des mesures techniques et organisationnelles telles que :</p>
                    <ul className="list-disc pl-5">
                        <li>Chiffrement SSL (HTTPS)</li>
                        <li>Stockage sécurisé</li>
                        <li>Restrictions d’accès</li>
                        <li>Mesures anti-intrusion</li>
                        <li>Prestataires certifiés</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">8. Vos droits RGPD</h2>
                    <p className="mb-4">Vous disposez de :</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>✔ Droit d’accès</li>
                        <li>✔ Droit de rectification</li>
                        <li>✔ Droit d’effacement</li>
                        <li>✔ Droit d’opposition</li>
                        <li>✔ Droit à la limitation</li>
                        <li>✔ Droit à la portabilité</li>
                        <li>✔ Droit au retrait du consentement</li>
                        <li>✔ Droit de réclamation auprès de la CNIL</li>
                    </ul>
                    <p>
                        📩 Pour exercer vos droits :<br />
                        <a href="mailto:xtremgrip@gmail.com" className="text-blue-600 hover:underline">xtremgrip@gmail.com</a>
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">9. Cookies</h2>
                    <p className="mb-4">Notre site utilise différents types de cookies :</p>
                    <h3 className="font-semibold mb-2">Cookies nécessaires</h3>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Fonctionnement du site</li>
                        <li>Gestion du panier</li>
                        <li>Connexion au compte client</li>
                    </ul>
                    <h3 className="font-semibold mb-2">Cookies analytiques (Google Analytics)</h3>
                    <ul className="list-disc pl-5">
                        <li>Statistiques de navigation</li>
                        <li>Performance du site</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">10. Modifications</h2>
                    <p>
                        La présente politique peut être modifiée pour rester conforme à la loi ou à nos pratiques.<br />
                        La version en vigueur est toujours disponible sur cette page.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    )
}
