"use client"

import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative w-full">
      {/* Hero Image - Intrinsic Height */}
      <div className="relative w-full">
        <Image
          src="/images/about-hero-beach-wheelie.jpg"
          alt="Pilote X-Trem Grip en wheeling sur la plage"
          width={1920}
          height={1280}
          priority
          className="w-full h-auto block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
      </div>

      {/* Content - Absolute Overlay */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-6 pt-10 md:pt-0">
          <div className="max-w-3xl">
            <h2 className="text-sm font-light tracking-[0.3em] uppercase mb-4 text-[#0BEFD5]">Notre Histoire</h2>
            <h1 className="text-sm md:text-base font-light tracking-wider uppercase mb-6">
              Conçu pour le terrain. <br />
              <span className="text-gradient font-normal">Inspiré par ceux qui le dominent.</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-0 md:mb-12 max-w-xl opacity-80 shadow-black drop-shadow-md">
              Chez X-Trem Grip, chaque valeur est née d'un besoin réel, vécu sur les terrains. C'est notre engagement pour
              vous offrir le meilleur grip, dans toutes les conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Photo credit */}
      <div className="absolute bottom-2 right-4 text-xs text-white/60 z-10">Photo: Jean-Christophe Hecquet</div>
    </section>
  )
}
