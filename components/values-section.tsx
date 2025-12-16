import { Zap, Shield, Award, Settings } from "lucide-react"
import Image from "next/image"

export default function ValuesSection() {
  const values = [
    {
      icon: <Zap className="w-8 h-8 text-[#F50CA0]" />,
      title: "Performance",
      description: "Grip optimisé pour un contrôle maximal de votre machine",
    },
    {
      icon: <Shield className="w-8 h-8 text-[#0BEFD5]" />,
      title: "Protection",
      description: "Protège votre cadre contre l'usure et les rayures",
    },
    {
      icon: <Award className="w-8 h-8 text-[#FFFF00]" />,
      title: "Qualité",
      description: "Matériaux testés et approuvés par des top pilotes",
    },
    {
      icon: <Settings className="w-8 h-8 text-[#FF681E]" />,
      title: "Sur-mesure",
      description: "Conçu spécifiquement pour votre modèle de moto",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/frame-protection-detail-2.jpeg"
          alt="X-Trem Grip protection detail"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h3 className="section-subtitle">Nos Valeurs</h3>
          <h2 className="section-title">
            Pourquoi choisir <span className="text-gradient">X-Trem Grip</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="glass-card p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-light mb-3">{value.title}</h3>
              <p className="text-sm font-light opacity-70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
