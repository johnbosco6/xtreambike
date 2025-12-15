"use client"

import Link from "next/link"
import Image from "next/image"

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/beach-motocross.jpeg"
          alt="Motocycliste sur une plage"
          fill
          className="object-cover object-center"
        />
        {/* Gradient overlay with more yellow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFF00]/40 via-[#FF681E]/30 to-[#4A2CD6]/20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card p-6 md:p-12 rounded-lg text-center max-w-3xl mx-auto backdrop-blur-md bg-black/30">
          <h2 className="text-xl md:text-3xl font-light mb-4 md:mb-6">
            Prêt à transformer votre <span className="text-gradient">expérience de pilotage</span>?
          </h2>
          <p className="text-base md:text-lg font-light mb-6 md:mb-8 opacity-80">
            Découvrez notre collection exclusive de protection de cadre et ressentez la différence avec X-TREM GRIP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90"
            >
              Explorer la Collection
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm tracking-wider uppercase bg-[#FFFF00] text-black hover:bg-[#FFFF00]/90"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </div>

      {/* Custom style for enhanced yellow gradient effect */}
      <style jsx>{`
        .glass-card {
          box-shadow: 0 8px 32px rgba(255, 255, 0, 0.2);
          border: 1px solid rgba(255, 255, 0, 0.1);
        }
      `}</style>
    </section>
  )
}
