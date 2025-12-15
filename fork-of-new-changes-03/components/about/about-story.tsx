import Image from "next/image"

export default function AboutStory() {
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
          <div className="glass-card p-2 rounded-lg">
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/images/motocross-full-bike.jpeg"
                alt="Motocross bike with X-tream Grip protection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
