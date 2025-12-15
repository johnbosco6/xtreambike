"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { state } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-2 md:py-3 bg-black/40 backdrop-blur-xl border-b border-white/10" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="logo-wrapper">
            <div className="relative w-64 md:w-72 h-24 md:h-28">
              <Image
                src="/images/logo-xtream-grip.png"
                alt="X-Trem Grip"
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] filter brightness-110 contrast-110"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-12 justify-center">
              <Link href="/" className="nav-link">
                Accueil
              </Link>
              <Link href="/shop" className="nav-link">
                Boutique
              </Link>
              <Link href="/contact" className="nav-link">
                Contact
              </Link>
              <Link href="/about" className="nav-link">
                À Propos
              </Link>
              <Link href="/faq" className="nav-link">
                FAQ
              </Link>
            </nav>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 glass-effect rounded-full hover:bg-white/10 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFFF00] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-4 p-2">
            <nav className="pt-4 pb-4 flex flex-col space-y-4 items-center">
              <Link
                href="/"
                className="nav-link py-2 w-full text-center hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/shop"
                className="nav-link py-2 w-full text-center hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Boutique
              </Link>
              <Link
                href="/contact"
                className="nav-link py-2 w-full text-center hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="nav-link py-2 w-full text-center hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link
                href="/faq"
                className="nav-link py-2 w-full text-center hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/cart"
                className="button-glass text-xs px-4 py-2 w-full text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-4 h-4" />
                Panier ({state.itemCount})
              </Link>
            </nav>
          </div>
        )}
      </div>

      <style jsx>{`
        .logo-wrapper {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 10px;
        }
      `}</style>
      <style jsx>{`
        .bg-black\/40 {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </header>
  )
}
