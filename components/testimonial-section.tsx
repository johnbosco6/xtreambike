import Image from "next/image"

export default function TestimonialSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h3 className="section-subtitle">Témoignages</h3>
        <h2 className="section-title">
          Ce que disent nos <span className="text-gradient">clients</span>
        </h2>

        <div className="mt-12 md:mt-16 glass-card p-6 md:p-12 rounded-lg max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden relative flex-shrink-0">
              <Image src="/images/testimonial-client.jpg" alt="Portrait de client" fill className="object-cover" />
            </div>
            <div>
              <blockquote className="text-base md:text-xl font-light italic mb-4 md:mb-6 leading-relaxed text-center md:text-left">
                "Très bon service relationnel !! Je recommande vivement, en plus d'un produit unique il apporte un grip
                et un look de folie !!! Oublier les protections plastiques qui ajoutent de l'épaisseur et marque votre
                cadre. Encore merci à Jordan que j'ai sollicité plusieurs fois et qui est resté d'une amabilité
                exceptionnelle."
              </blockquote>
              <div className="text-center md:text-left">
                <p className="font-medium">Louis Bayle</p>
                <p className="text-sm opacity-70">Pilote Amateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
