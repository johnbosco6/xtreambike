"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"

const storyImages = [
  "/images/about-carousel/story-1.jpg",
  "/images/about-carousel/story-2.jpg",
  "/images/about-carousel/story-3.jpg",
  "/images/about-carousel/story-4.jpg",
  "/images/about-carousel/story-5.jpg",
]

export default function BrandStory() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="section-subtitle">Notre Histoire</h3>
            <h2 className="section-title mb-8">
              Née de la <span className="text-gradient">passion</span>
            </h2>
            <div className="space-y-6 text-lg font-light leading-relaxed opacity-90">
              <p>
                Tout a commencé au bord des circuits. Des pistes boueuses d'Europe aux stades survoltés des États-Unis,
                là où le bruit des moteurs se mêle à l'adrénaline.
              </p>
              <p>
                Pendant des années, j'ai vécu au rythme des championnats, du MXGP au mythique AMA Supercross. J'ai pu
                observer les détails qui font la différence.
              </p>
              <p>
                C'est ainsi qu'est née X-Trem Grip. Pas dans un bureau, mais dans la boue, la poussière et la passion.
                Conçue pour les pilotes, pensée sur le terrain, testée dans l'intensité de la course.
              </p>
            </div>
            <div className="mt-8">
              <a href="/about" className="button-primary">
                Découvrir notre histoire
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-2 rounded-lg relative">
              <div className="overflow-hidden rounded-lg cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex">
                  {storyImages.map((src, index) => (
                    <div className="flex-[0_0_100%] min-w-0" key={index}>
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={src}
                          alt={`X-Trem Grip Story Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dots Navigation */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {storyImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-[#0BEFD5] w-6" : "bg-white/50 hover:bg-white/80"
                      }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
