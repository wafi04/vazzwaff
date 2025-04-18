import { AuthProvider } from "@/components/layouts/provider/auth-provider";
import { UserLayout } from "@/components/layouts/provider/user-profile";
import { ReactNode } from "react";

export default function Layout({children}  : {children : ReactNode}){
    return (
      <UserLayout>
          {children}
      </UserLayout>
    )
}