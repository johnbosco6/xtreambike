import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "X-tream Grip | Protection de cadre, Grip de Moto Premium",
  description:
    "Découvrez notre collection exclusive de poignées de moto de haute qualité pour une expérience de conduite optimale.",
  keywords:
    "protection de cadre, grip de cadre, grip motocross, protection de plaque latérale, protection plastique, grip kit déco, grip",
  manifest: "/manifest.json",
  themeColor: "#FFFF00",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "X-tream Grip",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "mobile-web-app-capable": "yes",
    "application-name": "X-tream Grip",
    "apple-mobile-web-app-title": "X-tream Grip",
    "msapplication-TileColor": "#FFFF00",
    "msapplication-tap-highlight": "no",
  },
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
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#FFFF00" />
        <meta
          name="keywords"
          content="protection de cadre, grip de cadre, grip motocross, protection de plaque latérale, protection plastique, grip kit déco, grip"
        />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
