import MainLayout from "@/components/layouts/mainlayout"
import { settingsItems } from "@/data/data-general-choice"
import {
  Settings,
  MessageSquare,
  Bell,
  User,
  CreditCard,
  Cloud,
  ChevronRight,
  Image,
  LucideIcon
} from "lucide-react"
import Link from "next/link"

export type SettingItem = {
  icon: LucideIcon
  title: string
    description: string
  link : string
  action: string
}


export default function General() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <div className="flex items-center mb-10">
          <Settings className="mr-3 h-6 w-6 text-sky-400" />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsItems.map((item, idx) => {
            const Icon = item.icon
              return (
                <Link href={item.link}>
              <div
                key={idx}
                className="bg-[#0a1a2f] rounded-lg p-6 flex flex-col border border-[#1e2a3a] hover:border-[#2a3a4a] transition-all duration-300"
                >
                <div className="flex items-center mb-4">
                  <Icon className="h-5 w-5 text-sky-400 mr-3" />
                  <h2 className="font-medium text-lg text-white">{item.title}</h2>
                </div>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <div className="mt-auto">
                  <button className="flex items-center text-sky-400 text-sm font-medium hover:text-sky-300 transition-colors">
                    {item.action}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
                  </Link>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
}
