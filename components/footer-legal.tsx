import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export default function FooterLegal() {
  return (
    <footer className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4A2CD6]/20 via-[#0BEFD5]/20 via-[#F50CA0]/20 to-[#FFFF00]/20 backdrop-filter backdrop-blur-sm"></div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py=12 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 relative mb-4">
            <Image src="/images/logo-xtream-grip.png" alt="X-Trem Grip Logo" fill className="object-contain" />
          </div>
          <h2 className="text-xl md:text-2xl font-light tracking-wider uppercase mb-2">X-Trem Grip</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#4A2CD6] via-[#0BEFD5] to-[#FFFF00] rounded-full mb-3"></div>

          {/* Language buttons */}
          <div className="flex space-x-2">
            <button className="text-xs font-light opacity-70 hover:opacity-100 transition-opacity px-2 py-1">FR</button>
            <button className="text-xs font-light opacity-50 hover:opacity-100 transition-opacity px-2 py-1">EN</button>
            <button className="text-xs font-light opacity-50 hover:opacity-100 transition-opacity px-2 py-1">DE</button>
            <button className="text-xs font-light opacity-50 hover:opacity-100 transition-opacity px-2 py-1">ES</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">X-Trem Grip</h3>
            <p className="font-light opacity-70 leading-relaxed">
              La protection de cadre qui apporte du GRIP sans abîmer les bottes !
            </p>
          </div>

          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/faq" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">Légal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/terms" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Garantie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">Suivez-nous</h3>
            <div className="flex space-x-4 mb-8">
              <a
                href="https://www.instagram.com/xtremgrip?igsh=OWdwMnhvOWYycTZn"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
            <div>
              <h4 className="font-light mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="bg-black/30 px-4 py-2 rounded-l-full focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
                />
                <button className="bg-[#FFFF00] text-black px-4 py-2 rounded-r-full hover:bg-opacity-90 text-sm">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-light text-xs md:text-sm opacity-50 mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} X-Trem Grip. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
