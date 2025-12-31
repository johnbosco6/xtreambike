import Image from "next/image"

export default function AboutPartners() {
  // Pilotes qui roulent avec X-Trem Grip
  const riders = [
    {
      name: "Louis Bayle",
      type: "Amateur",
      description:
        "Passionné de motocross depuis son plus jeune âge, Louis a choisi X-Trem Grip pour sa fiabilité et son adhérence exceptionnelle sur tous types de terrains.",
      image: "/images/frame-protection-detail-2.jpeg",
    },
    {
      name: "Thomas Dubois",
      type: "Professionnel",
      description:
        "Champion national en titre, Thomas fait confiance à X-Trem Grip pour ses compétitions au plus haut niveau. La précision et le contrôle sont essentiels pour ses performances.",
      image: "/images/motocross-full-bike.jpeg",
    },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="section-subtitle">Notre communauté</h3>
        <h2 className="section-title">
          Ils <span className="text-gradient">roulent avec nous</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {riders.map((rider, index) => (
            <div key={index} className="glass-card rounded-lg overflow-hidden p-8">
              <div className="flex flex-col h-full">
                <div className="inline-block px-3 py-1 bg-[#FFFF00]/20 text-[#FFFF00] text-xs rounded-full mb-3 self-start">
                  {rider.type}
                </div>
                <h3 className="text-xl font-light mb-3">{rider.name}</h3>
                <p className="text-base font-light opacity-80 leading-relaxed italic">"{rider.description}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-light mb-8 max-w-2xl mx-auto opacity-80">
            Rejoignez la communauté X-Trem Grip et partagez votre expérience avec nos produits.
          </p>
          <a href="/contact" className="button-secondary">
            Devenir Ambassadeur
          </a>
        </div>
      </div>
    </section>
  )
}
