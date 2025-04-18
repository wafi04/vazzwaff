"use client"
import { useAuth } from "@/components/layouts/provider/auth-provider";
import { SettingsLayout } from "../../../../components/layouts/settings-layout";
import { SettingsProfile } from "./setting-profile";
import { User } from "@/types/schema/user";
import { LoadingOverlay } from "@/components/ui/loading-overlay";


export default function SettingsPage() {
    const { user } = useAuth()
    if (!user) return <LoadingOverlay />
    return (
        <SettingsLayout>
            <SettingsProfile user={user as User}/>
        </SettingsLayout>
    )
}
