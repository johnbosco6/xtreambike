"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-motocross.jpeg"
          alt="Motocycliste en action sur circuit de sable"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 md:pt-36 lg:pt-40 relative z-10">
        <div className="max-w-3xl px-4">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-wider uppercase mb-4 md:mb-6">
            La protection <span className="text-gradient-yellow font-normal">qui t'apporte du grip !</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light mb-8 md:mb-12 max-w-xl opacity-80">
            Chez X-Trem Grip, chaque valeur est née d'un besoin réel, vécu sur les terrains. C'est notre engagement pour
            vous offrir le meilleur grip, dans toutes les conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <Link
              href="/shop"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90"
            >
              Découvrir la Collection
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90"
            >
              Notre Histoire
            </Link>
          </div>
        </div>
        <style jsx>{`
          .text-gradient-yellow {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-image: linear-gradient(to right, #FFFF00, #FF681E);
          }
        `}</style>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <ChevronDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  )
}
