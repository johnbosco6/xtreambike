import Image from "next/image"

export default function BrandStory() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="section-subtitle">Notre Histoire</h3>
            <h2 className="section-title mb-8">
              Née de la <span className="text-gradient">passion</span>
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed opacity-90">
              <p>
                Tout a commencé au bord des circuits. Des pistes boueuses d'Europe aux stades survoltés des États-Unis,
                là où le bruit des moteurs se mêle à l'adrénaline.
              </p>
              <p>
                Pendant des années, j'ai vécu au rythme des championnats, du MXGP au mythique AMA Supercross. J'ai pu
                observer les détails qui font la différence.
              </p>
              <p>
                C'est ainsi qu'est née X-Trem Grip. Pas dans un bureau, mais dans la boue, la poussière et la passion.
                Conçue pour les pilotes, pensée sur le terrain, testée dans l'intensité de la course.
              </p>
            </div>
            <div className="mt-8">
              <a href="/about" className="button-primary">
                Découvrir notre histoire
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/frame-protection-detail-1.jpeg"
                  alt="Protection de cadre X-tream Grip - Détail 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src="/images/frame-protection-detail-2.jpeg"
                    alt="Protection de cadre X-tream Grip - Détail 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image src="/images/hero-motocross.jpeg" alt="Motocross en action" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
