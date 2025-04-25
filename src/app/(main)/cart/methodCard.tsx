"use client"

import { useState } from "react"

const paymentOptions = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "paypal",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    icon: "credit-card",
  },
  {
    id: "visa",
    name: "Visa",
    icon: "credit-card",
  },
]

export function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = useState("paypal")

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Payment</h2>

      <div className="grid grid-cols-3 gap-3">
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${
              selectedPayment === option.id ? "bg-zinc-700" : "bg-zinc-800"
            } hover:bg-zinc-700 transition-colors`}
            onClick={() => setSelectedPayment(option.id)}
          >
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center mb-2 ${
                option.id === "paypal" ? "bg-blue-500" : option.id === "mastercard" ? "bg-orange-500" : "bg-yellow-500"
              }`}
            >
              {option.id === "paypal" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-paypal"
                >
                  <path d="M7.144 19.532l1.049-5.751A3.233 3.233 0 0 1 11.292 11h1.911a5.696 5.696 0 0 0 5.663-4.936A3.808 3.808 0 0 0 15.304 2H10.1a3.809 3.809 0 0 0-3.733 3.054L4.748 15.138" />
                  <path d="M4.317 16.457A2 2 0 0 0 6.251 19h.891a2 2 0 0 0 1.964-1.622l.993-5.452A3.232 3.232 0 0 1 13.205 9h1.911a5.696 5.696 0 0 0 5.664-4.936A3.808 3.808 0 0 0 17.216 0h-5.204a3.809 3.809 0 0 0-3.733 3.054" />
                </svg>
              )}
              {option.id === "mastercard" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              )}
              {option.id === "visa" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-credit-card"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              )}
            </div>
            <div className="text-sm font-medium">{option.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
