import { Zap, Award, Compass, Settings, Flag } from "lucide-react"
import Image from "next/image"

export default function AboutValues() {
  const values = [
    {
      icon: <Zap className="w-8 h-8 text-[#F50CA0]" />,
      title: "Performance",
      description:
        '"Chaque détail compte." X-Trem Grip est née pour améliorer le lien entre le pilote et sa machine. La marque place la performance au cœur de ses produits : adhérence optimisée, gain de contrôle et réduction de l\'effort, même dans les conditions les plus extrêmes.',
    },
    {
      icon: <Compass className="w-8 h-8 text-[#FFFF00]" />,
      title: "Innovation",
      description:
        "\"Pensée sur le terrain, conçue pour la course.\" Nos produits naissent de l'expérience des circuits, des retours de pilotes, et de notre obsession à toujours faire mieux. Chez nous, l'innovation est un outil, pas un slogan.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#FF681E]" />,
      title: "Engagement",
      description:
        "\"Créée par un passionné, pour des passionnés.\" La marque est proche de sa communauté. Elle écoute les retours des pilotes, travaille en collaboration avec eux, et ne cesse d'ajuster ses produits pour répondre aux attentes du terrain. Vous faites partie du process, de l'idée au terrain.",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#0BEFD5]" />,
      title: "Sur-mesure",
      description:
        "\"Une solution pour chaque machine et idée\" Avez-vous un modèle ou une idée spécifique ? On s'adapte. Notre service de personnalisation vous permet de rider avec un grip parfaitement taillé pour votre moto. Ce souci du détail fait partie intégrante de l'ADN de la marque.",
    },
    {
      icon: <Flag className="w-8 h-8 text-[#0BEFD5]" />,
      title: "Made in FRANCE",
      description:
        '"Exigence à tous les niveaux." Fabriqués en France avec des matériaux soigneusement choisis, les produits X-Trem Grip sont testés par des pilotes professionnels avant d\'arriver entre vos mains.',
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/frame-protection-detail-1.jpeg"
          alt="X-tream Grip frame protection detail"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h3 className="section-subtitle">Ce qui nous définit</h3>
        <h2 className="section-title">
          Nos <span className="text-gradient">Valeurs</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {values.map((value, index) => (
            <div key={index} className="glass-card p-8 rounded-lg">
              <div className="mb-6">{value.icon}</div>
              <h3 className="text-xl font-light mb-4">{value.title}</h3>
              <p className="font-light opacity-70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
