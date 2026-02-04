"use client"

import Image from "next/image"

export default function AboutHero() {
  return (
    <section className="relative w-full bg-neutral-900">
      {/* Hero Image - Bigger and Stand Alone */}
      <div className="relative w-full flex justify-center max-h-[80vh] overflow-hidden">
        <Image
          src="/images/about-hero-beach-wheelie.jpg"
          alt="Pilote X-Trem Grip en wheeling sur la plage"
          width={1920}
          height={1280}
          priority
          className="w-auto h-auto max-h-[80vh] object-contain"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 pointer-events-none"></div>
      </div>

      {/* Content - Absolute Overlay - Smaller for Mobile */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-4 md:px-6 pt-10 md:pt-0">
          <div className="max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-xs sm:text-sm font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3 text-[#0BEFD5]">Notre Histoire</h2>
            <h1 className="text-xs sm:text-sm md:text-base font-light tracking-wider uppercase mb-3 sm:mb-4 md:mb-6">
              Conçu pour le terrain. <br />
              <span className="text-gradient font-normal">Inspiré par ceux qui le dominent.</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg font-light mb-0 max-w-xl opacity-90 shadow-black drop-shadow-md">
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
