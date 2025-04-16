"use client"

import { useUser } from "@/components/layouts/provider/user-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormatCurrency } from "@/utils/formatPrice";
import { TabsProfile } from "@/features/components/tabs-profile";
import { FormTopup } from "@/features/pages/profile/topup/form-topup";
import { TableProfileTopup } from "@/features/pages/profile/topup/table-profile-topup";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">@{user.username}</p>
                <Badge variant={user.role === "ADMIN" ? "destructive" : "default"} className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email Verification</p>
                <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                  {user.isEmailVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="font-medium">{user.whatsapp || "Not Set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {new Date(user.createdAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Balance Card */}
          <Card>
            <CardHeader>
              <CardTitle>Saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{FormatCurrency(user.balance)}</p>
                  <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
                </div>
                <Button>Top Up</Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Up and Membership Form */}
          <FormTopup />

          {/* Top Up History Table */}
          <TableProfileTopup />
        </div>
      </div>
    </main>
  );
}