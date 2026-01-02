import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass-effect mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">X-Trem Grip</h3>
            <p className="font-light opacity-70 leading-relaxed">
              Le spécialiste de la protection qui apporte du grip.
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
                <Link href="/shipping-returns" className="font-light opacity-70 hover:opacity-100 transition-opacity">
                  Livraison & Garantie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="font-light opacity-70">
                <span className="block text-xs uppercase opacity-50 mb-1">Email</span>
                <a href="mailto:xtremgrip@gmail.com" className="hover:text-[#0BEFD5] transition-colors">xtremgrip@gmail.com</a>
              </li>
              {/* Phone number placeholder - uncomment if provided
              <li className="font-light opacity-70">
                <span className="block text-xs uppercase opacity-50 mb-1">Téléphone</span>
                <a href="tel:+33600000000" className="hover:text-[#0BEFD5] transition-colors">+33 6 00 00 00 00</a>
              </li>
              */}
              <li className="font-light opacity-70">
                <span className="block text-xs uppercase opacity-50 mb-1">Adresse</span>
                3 Rue de la Villa Bleue<br />65330 Galan, France
              </li>
            </ul>
            <div className="flex space-x-4 mt-8">
              <a
                href="https://instagram.com/xtremgrip"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity p-2 bg-white/5 rounded-full hover:bg-[#0BEFD5]/20 hover:text-[#0BEFD5]"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-light text-sm opacity-50">
            &copy; {new Date().getFullYear()} X-Trem Grip. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-sm font-light opacity-70 hover:opacity-100 transition-opacity">FR</button>
            <button className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity">EN</button>
            <button className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity">DE</button>
            <button className="text-sm font-light opacity-50 hover:opacity-100 transition-opacity">ES</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
