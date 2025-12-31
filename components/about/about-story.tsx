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

export default function AboutStory() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-sm font-light tracking-[0.2em] uppercase mb-4 text-[#0BEFD5]">
              L'histoire de X-TREM GRIP
            </h3>
            <p className="text-lg font-light leading-relaxed mb-8 opacity-80">
              Tout a commencé au bord des circuits. Des pistes boueuses d'Europe aux stades survoltés des États-Unis, là
              où le bruit des moteurs se mêle à l'adrénaline, là où chaque seconde compte. Pendant des années, j'ai vécu
              au rythme des championnats, du MXGP au mythique AMA Supercross. J'ai pu observer : les départs canon, les
              chutes, les remontées folles... et surtout, les détails qui font la différence.
            </p>
            <p className="text-lg font-light leading-relaxed mb-8 opacity-80">
              Ce détail, je ne pouvais plus l'ignorer. Ce petit moment de glisse entre la botte du pilote et le cadre de
              la moto. Trop discret pour les spectateurs, mais assez présent pour gêner la précision, troubler
              l'équilibre, faire perdre du temps. À force d'en parler, de l'analyser, de le vivre... l'idée s'est
              imposée.
            </p>
            <p className="text-lg font-light leading-relaxed mb-8 opacity-80">
              Créer quelque chose de simple, mais redoutablement efficace. Une solution qui donne au pilote ce lien
              direct avec sa machine. Qui accroche sans bloquer, qui guide sans freiner. C'est ainsi qu'est née X-Trem
              Grip. Pas dans un bureau, mais dans la boue, la poussière et la passion. Conçue pour les pilotes, pensée
              sur le terrain, testée dans l'intensité de la course.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-lg cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex">
                {storyImages.map((src, index) => (
                  <div className="flex-[0_0_100%] min-w-0" key={index}>
                    <div className="relative h-[400px] w-full">
                      <Image
                        src={src}
                        alt={`X-Trem Grip Story Image ${index + 1}`}
                        fill
                        className="object-contain"
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
    </section>
  )
}
