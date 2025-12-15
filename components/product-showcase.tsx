import Image from "next/image"

export default function ProductShowcase() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/motocross-full-bike.jpeg"
          alt="Motocross bike with X-tream Grip protection"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div></div>
          <div>
            <h3 className="section-subtitle">Performance</h3>
            <h2 className="section-title mb-8">
              Grip <span className="text-gradient">Révolutionnaire</span>
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed opacity-90">
              <p>
                Nos protections de cadre offrent un grip exceptionnel, améliorant considérablement le contrôle et les
                sensations de pilotage.
              </p>
              <p>
                Conçues sur mesure pour chaque modèle de moto, elles protègent votre cadre tout en vous donnant
                l'avantage compétitif que vous recherchez.
              </p>
              <p>
                Testées et approuvées par les meilleurs pilotes, nos protections réduisent l'effort nécessaire pour
                tenir votre moto dans toutes les conditions.
              </p>
            </div>
            <div className="mt-8">
              <a href="/shop" className="button-primary">
                Voir nos produits
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
