"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type FaqItem = {
  question: string
  answer: string
  category: string
}

export default function FaqAccordion() {
  const [openItem, setOpenItem] = useState<number | null>(0)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const faqItems: FaqItem[] = [
    {
      question: "Comment choisir les bonnes protections pour votre moto ?",
      answer:
        "Pour choisir les protections adaptées à votre moto, rendez-vous dans notre boutique en ligne. Utilisez le menu déroulant pour sélectionner la catégorie ainsi que la marque de votre moto. Ensuite, repérer le modèle et l'année de votre véhicule : vous serez ainsi dirigé vers les protections spécialement conçues pour votre moto. Cela garantit une compatibilité parfaite. N'hésitez pas à contacter notre service client qui vous guidera vers le produit adapté.",
      category: "produits",
    },
    {
      question: "Vos produits sont-ils compatibles avec toutes les marques de motos ?",
      answer:
        "Nos produits sont conçus pour être compatibles avec la majorité des grandes marques de motos comme Honda, Yamaha, Kawasaki, Suzuki, etc. Chaque produit indique clairement les modèles compatibles dans sa description. Si vous avez un doute sur la compatibilité avec votre modèle spécifique, n'hésitez pas à contacter notre service client qui vous guidera vers le produit adapté.",
      category: "produits",
    },
    {
      question: "Quelle est la durée de vie moyenne de vos protections ?",
      answer:
        "La durée de vie de nos protections dépend de plusieurs facteurs, tels que la fréquence d'utilisation, les conditions météorologiques, l'état des bottes utilisées et le type de terrain pratiqué (sable, terre, cailloux, etc.).",
      category: "produits",
    },
    {
      question: "Comment installer correctement les protections X-TREM GRIP ?",
      answer:
        "Pour installer correctement vos protections X-Trem GRIP, un mode d'emploi détaillant toutes les étapes nécessaires est disponible au dos de votre packaging. Si vous n'avez plus l'emballage sous la main, pas d'inquiétude : vous pouvez également télécharger notre mode d'emploi directement ici [lien à insérer].",
      category: "installation",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "Nos délais de livraison varient selon votre localisation. Pour la France métropolitaine, comptez 2-3 jours ouvrables après expédition. Pour l'Europe, le délai est généralement de 3-5 jours ouvrables. Pour le reste du monde, prévoyez 7-14 jours. Nous proposons également des options de livraison express qui permettent de recevoir votre commande en 24-48h (selon disponibilité dans votre région). Vous pouvez suivre votre commande en temps réel via le numéro de suivi qui vous est envoyé par email dès l'expédition de votre colis.",
      category: "commandes",
    },
    {
      question: "Comment puis-je suivre ma commande ?",
      answer:
        "Dès que votre commande est expédiée, vous recevez un email de confirmation contenant un numéro de suivi unique. Vous pouvez utiliser ce numéro sur notre site dans la section 'Suivi de commande' ou directement sur le site du transporteur indiqué dans l'email. Notre système de suivi vous permet de connaître la position exacte de votre colis et la date de livraison estimée. Si vous n'avez pas reçu d'email de confirmation dans les 48h suivant votre achat, vérifiez votre dossier de spam ou contactez notre service client.",
      category: "commandes",
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer:
        "Nous offrons une politique de retour de 14 jours à compter de la date de réception de votre commande. Les produits doivent être retournés dans leur emballage d'origine, non utilisés et en parfait état. Pour initier un retour, connectez-vous à votre compte client ou contactez notre service client qui vous fournira un numéro d'autorisation de retour. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou d'erreur de notre part. Une fois le retour reçu et vérifié, le remboursement est traité dans un délai de 5 à 10 jours ouvrables.",
      category: "commandes",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const filteredItems =
    activeCategory === "all" ? faqItems : faqItems.filter((item) => item.category === activeCategory)

  const categories = [
    { id: "all", name: "Toutes les questions" },
    { id: "produits", name: "Produits" },
    { id: "installation", name: "Installation" },
    { id: "commandes", name: "Commandes" },
  ]

  return (
    <div className="glass-card p-6 md:p-8 rounded-xl">
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-3 py-1.5 rounded-full text-xs ${activeCategory === category.id ? "bg-[#4A2CD6] text-white" : "glass-effect hover:bg-white/10"
              }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 text-left"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium">{item.question}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${openItem === index ? "rotate-180" : ""}`} />
            </button>

            {openItem === index && (
              <div className="p-4 pt-0 border-t border-white/10">
                <p className="font-light text-sm opacity-80">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
