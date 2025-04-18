"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormatCurrency } from "@/utils/formatPrice"
import { TableProfileTopup } from "@/app/(main)/profile/_components/table-profile-topup"
import { FormTopupContent } from "@/app/(main)/profile/_components/form-topup"
import { MembershipContent } from "@/app/(main)/profile/_components/membership"
import { useAuth } from "@/components/layouts/provider/auth-provider"
import CardProfile from "@/app/(main)/profile/_components/cardProfile"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { user } = useAuth()
  if (!user) return null
  const router = useRouter()

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
      <CardProfile user={user}/>
        <Card className="md:col-span-3 py-6 px-4">
          <CardHeader>
            <CardTitle className="text-xl">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{FormatCurrency(user.balance)}</p>
                <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
              </div>
            <Button onClick={() => router.push("/profile/settings")} className="h-8 text-white">
              Settings
            </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Up Form - Spans 2 columns on desktop */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <FormTopupContent />
          </CardContent>
        </Card>

        {/* Membership Plans - Spans 1 column on desktop */}
        <Card className="md:col-span-2 row-span-1">
          <CardHeader>
            <CardTitle>Pilih Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <MembershipContent />
          </CardContent>
        </Card>

        {/* Top Up History Table - Spans full width */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Riwayat Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TableProfileTopup />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

