"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col px-5 py-2">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">VazzUniverse Dashboard</h1>
          
          </div>
          <div className="flex items-center gap-4">
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=JD" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Rp 45,231,890</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    <Progress className="mt-3" value={75} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2,350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    <Progress className="mt-3" value={90} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                    <Progress className="mt-3" value={65} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    <Progress className="mt-3" value={40} />
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Recent Activity */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <RevenueChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>You made 265 transactions this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentTransactions />
                  </CardContent>
                </Card>
              </div>

              {/* User Activity and Top Products */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Your best selling products this month.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopProducts />
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>User engagement across different platforms.</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <UserActivityChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other Tabs (Placeholder Content) */}
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>Detailed analytics and insights about your business.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Analytics content will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and view reports for your business.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Reports content will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>View and manage all your transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Transactions content will appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
// Chart Components
function RevenueChart() {
  return (
    <div className="h-[300px] w-full flex items-end gap-2 pr-10">
      {[40, 30, 70, 50, 60, 85, 45, 65, 75, 50, 80, 60].map((height, i) => (
        <div key={i} className="relative h-full flex-1 flex items-end">
          <div
            className="w-full bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
            style={{ height: `${height}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">{height}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function UserActivityChart() {
  return (
    <div className="h-[300px] w-full flex items-end gap-2 pr-10">
      {[65, 45, 75, 55, 80, 40, 60, 70, 45, 55, 70, 50].map((height, i) => (
        <div key={i} className="relative h-full flex-1 flex items-end">
          <div
            className="w-full bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors"
            style={{ height: `${height}%` }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">{height}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Recent Transactions Component
function RecentTransactions() {
  const transactions = [
    { id: 1, user: "Sarah Johnson", amount: "Rp 250,000", status: "completed", date: "Today, 2:30 PM" },
    { id: 2, user: "Michael Chen", amount: "Rp 1,500,000", status: "processing", date: "Today, 11:20 AM" },
    { id: 3, user: "Emma Davis", amount: "Rp 750,000", status: "completed", date: "Yesterday, 3:45 PM" },
    { id: 4, user: "Robert Kim", amount: "Rp 3,200,000", status: "failed", date: "Yesterday, 9:15 AM" },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between space-y-0">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${transaction.user}`}
                alt={transaction.user}
              />
              <AvatarFallback>
                {transaction.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{transaction.user}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <p className="text-sm font-medium">{transaction.amount}</p>
            <Badge
              variant={
                transaction.status === "completed"
                  ? "default"
                  : transaction.status === "processing"
                    ? "outline"
                    : "destructive"
              }
            >
              {transaction.status}
            </Badge>
          </div>
        </div>
      ))}
      <Button variant="ghost" className="w-full text-sm text-muted-foreground">
        View all transactions
      </Button>
    </div>
  )
}

// Top Products Component
function TopProducts() {
  const products = [
    { id: 1, name: "Premium Membership", sales: 1245, percentage: 85 },
    { id: 2, name: "Game Credits Pack", sales: 986, percentage: 65 },
    { id: 3, name: "Special Character", sales: 759, percentage: 45 },
    { id: 4, name: "Exclusive Weapon", sales: 642, percentage: 35 },
  ]

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.sales} sales</p>
          </div>
          <Progress value={product.percentage} />
        </div>
      ))}
      <Button variant="ghost" className="w-full text-sm text-muted-foreground">
        View all products
      </Button>
    </div>
  )
}
