import { Mail, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

export default function FaqContact() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-xl">
        <h2 className="text-xl font-light mb-6">Vous n'avez pas trouvé votre réponse?</h2>
        <p className="font-light text-sm opacity-80 mb-6">
          Notre équipe de support est disponible pour répondre à toutes vos questions.
        </p>

        <div className="space-y-4">
          <Link
            href="/contact"
            className="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#4A2CD6]/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#0BEFD5]" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Contactez-nous</h3>
              <p className="text-xs opacity-70">Envoyez-nous un message</p>
            </div>
          </Link>

          <a
            href="tel:+33123456789"
            className="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#F50CA0]/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#F50CA0]" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Appelez-nous</h3>
              <p className="text-xs opacity-70">+33 (0)1 23 45 67 89</p>
            </div>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#FF681E]/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#FF681E]" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Chat en direct</h3>
              <p className="text-xs opacity-70">Disponible 9h-18h en semaine</p>
            </div>
          </a>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-xl">
        <h2 className="text-xl font-light mb-6">Ressources utiles</h2>

        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-[#0BEFD5] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0BEFD5]"></span>
              Guide d'installation
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-[#0BEFD5] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0BEFD5]"></span>
              Conseils d'entretien
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-[#0BEFD5] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0BEFD5]"></span>
              Vidéos tutorielles
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-[#0BEFD5] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0BEFD5]"></span>
              Conditions de garantie
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-[#0BEFD5] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0BEFD5]"></span>
              Politique de retour
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
