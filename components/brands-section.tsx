"use client"

import Image from "next/image"
import Link from "next/link"

export default function BrandsSection() {
  // Logos des marques de moto avec fond transparent
  const brands = [
    {
      name: "Beta",
      logo: "/images/logos/beta-transparent.png",
      color: "from-[#E30613]/10 to-[#000000]/20",
    },
    {
      name: "Fantic",
      logo: "/images/logos/fantic.png",
      color: "from-[#E30613]/10 to-[#000000]/20",
    },
    {
      name: "GasGas",
      logo: "/images/logos/gasgas.png",
      color: "from-[#E30613]/10 to-[#000000]/20",
    },
    {
      name: "Honda",
      logo: "/images/logos/honda-new.png",
      color: "from-[#E30613]/10 to-[#000000]/20",
    },
    {
      name: "Husqvarna",
      logo: "/images/logos/husqvarna.png",
      color: "from-[#1E3A8A]/10 to-[#000000]/20",
    },
    {
      name: "Kawasaki",
      logo: "/images/logos/kawasaki-transparent.png",
      color: "from-[#70B62C]/10 to-[#000000]/20",
    },
    {
      name: "Kove",
      logo: "/images/logos/kove-transparent.png",
      color: "from-[#00A0B0]/10 to-[#00C0D0]/20",
    },
    {
      name: "KTM",
      logo: "/images/logos/ktm-new.png",
      color: "from-[#FF6600]/10 to-[#000000]/20",
    },
    {
      name: "Sherco",
      logo: "/images/logos/sherco.png",
      color: "from-[#FFFF00]/10 to-[#000000]/20",
    },
    {
      name: "Stark Varg",
      logo: "/images/logos/stark-varg.png",
      color: "from-[#000000]/10 to-[#FFFFFF]/20",
    },
    {
      name: "Suzuki",
      logo: "/images/logos/suzuki.png",
      color: "from-[#0046BD]/10 to-[#E30613]/20",
    },
    {
      name: "Triumph",
      logo: "/images/logos/triumph-transparent.png",
      color: "from-[#000000]/10 to-[#333333]/20",
    },
    {
      name: "Yamaha",
      logo: "/images/logos/yamaha-transparent.png",
      color: "from-[#0046BD]/10 to-[#FFFFFF]/20",
    },
    {
      name: "YCF",
      logo: "/images/logos/ycf.png",
      color: "from-[#00A0B0]/10 to-[#0080FF]/20",
    },
  ]

  return (
    <section className="py-24 relative">
      {/* Background gradient with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-filter backdrop-blur-sm"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title">
          Compatible avec{" "}
          <span className="text-gradient">
            Beta, Fantic, GasGas, Honda, Husqvarna, Kawasaki, Kove, KTM, Sherco, Stark Varg, Suzuki, Triumph, YCF,
            Yamaha
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8 mt-12 md:mt-16">
          {brands.map((brand, index) => (
            <Link
              href="/shop"
              key={index}
              className="
                h-32 w-full flex items-center justify-center p-6 rounded-xl
                bg-gradient-to-br from-white/35 via-slate-100/25 to-slate-800/80
                backdrop-blur-lg border border-white/15
                shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)]
                hover:shadow-[12px_12px_20px_rgba(0,0,0,0.35),-12px_-12px_20px_rgba(255,255,255,0.15)]
                hover:bg-gradient-to-br hover:from-white/45 hover:via-slate-50/35 hover:to-slate-700/85
                hover:border-white/25 hover:-translate-y-1
                transition-all duration-300 ease-out
                relative overflow-hidden
                before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 
                before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px
                after:bg-gradient-to-r after:from-transparent after:via-black/30 after:to-transparent
              "
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={`Logo ${brand.name}`}
                  width={120}
                  height={120}
                  className="object-contain max-w-full max-h-full drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] brightness-125 contrast-125"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-light mb-8 max-w-2xl mx-auto opacity-80">
            Votre modèle n'est pas répertorié sur notre site ? On s'adapte. Contacter notre service afin de faire
            établir un prototype.
          </p>
          <Link href="/contact" className="button-secondary">
            Contactez-nous
          </Link>
        </div>
      </div>
    </section>
  )
}
