import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="glass-effect mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-light tracking-wider uppercase mb-6">X-tream Grip</h3>
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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
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
                <button className="bg-[#4A2CD6] px-4 py-2 rounded-r-full hover:bg-opacity-90 text-sm">S'abonner</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-light text-sm opacity-50">
            &copy; {new Date().getFullYear()} X-tream Grip. Tous droits réservés.
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
