"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dans une application réelle, vous enverriez les données à votre backend ici
    console.log("Form submitted:", formData)
    alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.")
    setFormData({
      firstName: "",
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="glass-card p-6 md:p-8 rounded-xl">
      <h2 className="text-xl md:text-2xl font-light mb-6">Envoyez-nous un message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-light mb-2">
              Prénom
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
              placeholder="Votre prénom"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-light mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-light mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
            placeholder="Votre email"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-light mb-2">
            Sujet
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm appearance-none"
          >
            <option value="">Sélectionnez un sujet</option>
            <option value="question">Question sur un produit</option>
            <option value="order">Suivi de commande</option>
            <option value="return">Retour produit</option>
            <option value="partnership">Proposition de partenariat</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-light mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BEFD5] text-sm"
            placeholder="Votre message"
          ></textarea>
        </div>

        <div>
          <button type="submit" className="button-primary flex items-center justify-center gap-2 w-full">
            Envoyer <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
