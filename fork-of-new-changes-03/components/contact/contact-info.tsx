import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-6 md:p-8 rounded-xl">
        <h2 className="text-xl md:text-2xl font-light mb-6">Informations de contact</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#0BEFD5] mt-1" />
            <div>
              <h3 className="font-medium text-sm mb-1">Adresse</h3>
              <p className="font-light text-sm opacity-70">
                3 Rue de la villa bleue
                <br />
                65330 Galan, France
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-[#F50CA0] mt-1" />
            <div>
              <h3 className="font-medium text-sm mb-1">Téléphone</h3>
              <p className="font-light text-sm opacity-70">+33 (0)7 87 10 68 22</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-[#FF681E] mt-1" />
            <div>
              <h3 className="font-medium text-sm mb-1">Email</h3>
              <p className="font-light text-sm opacity-70">xtremgrip@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-[#FFFF00] mt-1" />
            <div>
              <h3 className="font-medium text-sm mb-1">Horaires d'ouverture</h3>
              <p className="font-light text-sm opacity-70">
                Lundi - Vendredi: 9h00 - 18h00
                <br />
                Samedi: 10h00 - 16h00
                <br />
                Dimanche: Fermé
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-xl">
        <h2 className="text-xl font-light mb-6">Suivez-nous</h2>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-4 rounded-full hover:bg-[#F50CA0]/20 transition-colors"
          >
            <Instagram className="w-6 h-6" />
            <span className="sr-only">Instagram</span>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-4 rounded-full hover:bg-[#4A2CD6]/20 transition-colors"
          >
            <Facebook className="w-6 h-6" />
            <span className="sr-only">Facebook</span>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-4 rounded-full hover:bg-[#0BEFD5]/20 transition-colors"
          >
            <Twitter className="w-6 h-6" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-xl">
        <h2 className="text-xl font-light mb-6">Besoin d'une réponse rapide?</h2>
        <p className="font-light text-sm opacity-70 mb-4">
          Consultez notre section FAQ pour trouver des réponses aux questions les plus fréquentes.
        </p>
        <a href="/faq" className="button-secondary inline-block">
          Voir la FAQ
        </a>
      </div>
    </div>
  )
}
