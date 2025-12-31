"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

const heroImages = [
  "/images/about-hero/hero-1.jpg",
  "/images/about-hero/hero-2.jpg",
  "/images/about-hero/hero-3.jpg",
  "/images/about-hero/hero-4.jpg",
  "/images/about-hero/hero-5.jpg",
]

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center">
      {/* Static Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero/hero-1.jpg"
          alt="Valentin performing a wheelie"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-20 md:pt-28 lg:pt-32 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-sm font-light tracking-[0.3em] uppercase mb-4 text-[#0BEFD5]">Notre Histoire</h2>
          <h1 className="text-sm md:text-base font-light tracking-wider uppercase mb-6">
            Conçu pour le terrain. <br />
            <span className="text-gradient font-normal">Inspiré par ceux qui le dominent.</span>
          </h1>
          <p className="text-lg md:text-xl font-light mb-12 max-w-xl opacity-80">
            Chez X-Trem Grip, chaque valeur est née d'un besoin réel, vécu sur les terrains. C'est notre engagement pour
            vous offrir le meilleur grip, dans toutes les conditions.
          </p>
        </div>
      </div>

      {/* Photo credit */}
      <div className="absolute bottom-2 right-4 text-xs text-white/60 z-10">Photo: Jean-Christophe Hecquet</div>
    </section>
  )
}
