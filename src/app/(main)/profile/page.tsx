"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FormatCurrency } from "@/utils/formatPrice"
import { TableProfileTopup } from "@/features/pages/profile/topup/table-profile-topup"
import { FormTopupContent } from "@/features/pages/profile/topup/form-topup"
import { MembershipContent } from "@/features/pages/profile/membership/membership"
import { useAuth } from "@/components/layouts/provider/auth-provider"

export default function ProfilePage() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-min">
        {/* Profile Card - Spans 1 column on mobile, 1 column on desktop */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                <Badge variant={user.role === "ADMIN" ? "destructive" : "default"} className="mt-1">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Email:</p>
                <Badge variant={user.isEmailVerified ? "default" : "secondary"} className="text-xs">
                  {user.isEmailVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">WhatsApp:</p>
                <p className="font-medium">{user.whatsapp || "Not Set"}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">Member Since:</p>
                <p className="font-medium">{new Date(user.createdAt!).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card - Spans 1 column on mobile, 3 columns on desktop */}
        <Card className="md:col-span-3 py-8 px-4">
          <CardHeader>
            <CardTitle className="text-xl">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{FormatCurrency(user.balance)}</p>
                <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
              </div>
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

