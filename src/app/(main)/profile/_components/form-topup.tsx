"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormatCurrency } from "@/utils/formatPrice";
import { useState } from "react";
export function FormTopupContent() {
  const [selectedNominal, setSelectedNominal] = useState("50000")
  const [selectedPayment, setSelectedPayment] = useState("bank_transfer")

  const NOMINAL_OPTIONS = [
    { value: "50000", label: "Rp 50.000" },
    { value: "100000", label: "Rp 100.000" },
    { value: "200000", label: "Rp 200.000" },
    { value: "500000", label: "Rp 500.000" },
    { value: "1000000", label: "Rp 1.000.000" },
  ]

  const PAYMENT_METHODS = [
    { value: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
    { value: "ewallet", label: "E-Wallet", icon: "💳" },
    { value: "qris", label: "QRIS", icon: "📱" },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Pilih Nominal</Label>
        <div className="grid grid-cols-2 gap-4">
          {NOMINAL_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={selectedNominal === option.value ? "default" : "outline"}
              onClick={() => setSelectedNominal(option.value)}
              className="w-full justify-start"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Metode Pembayaran</Label>
        <div className="grid grid-cols-3 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <Button
              key={method.value}
              type="button"
              variant={selectedPayment === method.value ? "default" : "outline"}
              onClick={() => setSelectedPayment(method.value)}
              className="w-full"
            >
              <span className="flex items-center gap-2">
                <span>{method.icon}</span>
                <span className="hidden sm:inline">{method.label}</span>
              </span>
            </Button>
          ))}
        </div>
      </div>

      <Button className="w-full">Lanjutkan Pembayaran</Button>
    </div>
  )
}