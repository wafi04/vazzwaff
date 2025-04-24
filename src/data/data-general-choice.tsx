import { SettingItem } from "@/app/dashboard/general/page"
import {
  MessageSquare,
  Bell,
  User,
  CreditCard,
  Cloud,
  Image,  
} from "lucide-react"
export const settingsItems: SettingItem[] = [
  {
    icon: User,
    title: "Account",
    description: "Manage your profile and account preferences",
    action: "Edit profile",
    link : "/dashboard/general/user"
  },
  {
    icon: MessageSquare,
    title: "Messages",
    description: "Configure chat settings and notifications",
      action: "Configure messages",
    link : "/dashboard/general/messages"
  },
  {
    icon: Image,
    title: "Banner",
    description: "Konfigurasi Banner",
    action: "Configure Banner",
    link : "/dashboard/general/banner"

  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control when and how you get notified",
    action: "Manage notifications",
    link : "/dashboard/general/notifications"

  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Manage your payment methods and subscriptions",
    action: "Payment methods",
    link : "/dashboard/general/payment"

  },
  {
    icon: Cloud,
    title: "Data & Storage",
    description: "Manage data usage and storage preferences",
    action: "Storage settings",
    link : "/dashboard/general/data"

  }
]