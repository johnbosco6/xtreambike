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
          <div className="flex flex-col items-center text-center">
            <blockquote className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed max-w-3xl mx-auto">
              "Très bon service relationnel !! Je recommande vivement, en plus d'un produit unique il apporte un grip
              et un look de folie !!! Oublier les protections plastiques qui ajoutent de l'épaisseur et marque votre
              cadre. Encore merci à Jordan que j'ai sollicité plusieurs fois et qui est resté d'une amabilité
              exceptionnelle."
            </blockquote>
            <div>
              <p className="font-medium text-lg">Louis Bayle</p>
              {/* <p className="text-sm opacity-70">Pilote Amateur</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
