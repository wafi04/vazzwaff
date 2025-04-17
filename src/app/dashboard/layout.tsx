import { AdminLayout } from "@/components/layouts/provider/admin-provider";
import { ReactNode } from "react";

export default function Layout({children} : {children  : ReactNode}) {
    return (
        <AdminLayout>
         {children}
        </AdminLayout>
    )
}