import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import CookieBanner from "@/components/cookie-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X-Trem Grip | Protection de cadre, Grip de Moto Premium",
  description:
    "Découvrez notre collection exclusive de poignées de moto de haute qualité pour une expérience de conduite optimale.",
  keywords:
    "protection de cadre, grip de cadre, grip motocross, protection de plaque latérale, protection plastique, grip kit déco, grip",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta
          name="keywords"
          content="protection de cadre, grip de cadre, grip motocross, protection de plaque latérale, protection plastique, grip kit déco, grip"
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
      </body>
    </html >
  )
}
