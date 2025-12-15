import { CreditCard } from "lucide-react"

export default function PaymentMethods() {
  return (
    <div className="my-8 md:my-12">
      <h3 className="text-base md:text-lg font-light mb-4 md:mb-6 text-center">Méthodes de paiement acceptées</h3>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {/* Apple Pay */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              fill="white"
            />
          </svg>
        </div>

        {/* Google Pay */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </div>

        {/* Visa */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.112 8.262l-1.785 7.476h-1.73L4.232 10.13c-.103-.4-.193-.547-.507-.716-.513-.275-1.36-.534-2.105-.694l.051-.258h3.63c.463 0 .88.308.985.842l.9 4.784 2.224-5.626h1.702zm6.765 5.042c.007-1.97-2.722-2.08-2.701-2.96.007-.268.261-.553.82-.626.276-.036 1.038-.064 1.901.333l.338-1.578c-.464-.169-1.061-.331-1.803-.331-1.905 0-3.247 1.013-3.258 2.466-.013 1.074.958 1.673 1.689 2.03.752.366 1.004.601.999.928-.008.502-.602.723-1.157.731-.973.015-1.539-.263-1.989-.473l-.351 1.641c.453.208 1.289.388 2.156.397 2.026 0 3.35-.999 3.356-2.558zm5.238 2.434h1.484l-1.295-7.476h-1.37c-.435 0-.802.251-.964.639l-3.398 6.837h2.025l.402-1.113h2.475l.233 1.113zm-2.153-2.64l1.016-2.8.584 2.8h-1.6zm-9.725-4.836l-1.346 7.476h-1.922l1.346-7.476h1.922z"
              fill="#1A1F71"
            />
          </svg>
        </div>

        {/* Mastercard */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="12" r="6" fill="#EB001B" />
            <circle cx="15" cy="12" r="6" fill="#F79E1B" />
            <path
              d="M12 7.2c1.35 1.2 2.2 2.94 2.2 4.8s-.85 3.6-2.2 4.8c-1.35-1.2-2.2-2.94-2.2-4.8s.85-3.6 2.2-4.8z"
              fill="#FF5F00"
            />
          </svg>
        </div>

        {/* PayPal */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28A.859.859 0 0 1 5.792 1.6h6.018c1.621 0 2.886.5 3.761 1.48.875.98 1.184 2.31.918 3.95-.648 3.99-3.193 6.02-7.566 6.02H6.345a.859.859 0 0 0-.848.74l-.407 2.547z"
              fill="#0070BA"
            />
            <path
              d="M18.446 8.24c-.648 3.99-3.193 6.02-7.566 6.02H8.302a.859.859 0 0 0-.848.74L6.345 18.547H4.944L7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28A.859.859 0 0 1 5.792 1.6h6.018c1.621 0 2.886.5 3.761 1.48.875.98 1.184 2.31.918 3.95z"
              fill="#003087"
            />
            <path
              d="M6.761 8.24c-.648 3.99-3.193 6.02-7.566 6.02H-3.383a.859.859 0 0 0-.848.74l-.407 2.547z"
              fill="#0070BA"
            />
          </svg>
        </div>

        {/* Generic Credit Card */}
        <div className="glass-effect p-3 md:p-4 rounded-xl flex items-center justify-center w-20 h-14 md:w-24 md:h-16">
          <CreditCard className="w-10 h-10 md:w-12 md:h-12 text-white/80" />
        </div>
      </div>
    </div>
  )
}
