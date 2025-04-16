"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormatCurrency } from "@/utils/formatPrice";
import { useState } from "react";

const NOMINAL_OPTIONS = [
  { value: "50000", label: "Rp 50.000" },
  { value: "100000", label: "Rp 100.000" },
  { value: "200000", label: "Rp 200.000" },
  { value: "500000", label: "Rp 500.000" },
  { value: "1000000", label: "Rp 1.000.000" },
];

const PAYMENT_METHODS = [
  { value: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
  { value: "ewallet", label: "E-Wallet", icon: "💳" },
  { value: "qris", label: "QRIS", icon: "📱" },
];

const MEMBERSHIP_PLANS = [
  {
    name: "Basic",
    price: 50000,
    features: ["Akses Game Dasar", "Support 24/7", "Bonus 5% setiap top-up"],
  },
  {
    name: "Premium",
    price: 100000,
    features: [
      "Akses Semua Game",
      "Support 24/7",
      "Bonus 10% setiap top-up",
      "Prioritas Transaksi",
    ],
  },
  {
    name: "VIP",
    price: 200000,
    features: [
      "Akses Semua Game",
      "Support 24/7",
      "Bonus 15% setiap top-up",
      "Prioritas Transaksi",
      "Cashback 5%",
    ],
  },
];

export function FormTopup() {
  const [selectedNominal, setSelectedNominal] = useState("50000");
  const [selectedPayment, setSelectedPayment] = useState("bank_transfer");
  const [selectedPlan, setSelectedPlan] = useState("Basic");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Top Up Form */}
      <Card>
        <CardHeader>
          <CardTitle>Top Up Saldo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Pilih Nominal</Label>
            <RadioGroup
              value={selectedNominal}
              onValueChange={setSelectedNominal}
              className="grid grid-cols-2 gap-4"
            >
              {NOMINAL_OPTIONS.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Metode Pembayaran</Label>
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
              className="grid grid-cols-3 gap-4"
            >
              {PAYMENT_METHODS.map((method) => (
                <div key={method.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.value} id={method.value} />
                  <Label htmlFor={method.value}>
                    {method.icon} {method.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button className="w-full">Lanjutkan Pembayaran</Button>
        </CardContent>
      </Card>

      {/* Membership Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Pilih Membership</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="space-y-4"
          >
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.name}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <RadioGroupItem value={plan.name} id={plan.name} />
                <div className="flex-1">
                  <Label htmlFor={plan.name} className="text-lg font-semibold">
                    {plan.name}
                  </Label>
                  <p className="text-2xl font-bold text-primary">
                    {FormatCurrency(plan.price)}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </RadioGroup>

          <Button className="w-full">Beli Membership</Button>
        </CardContent>
      </Card>
    </div>
  );
} 