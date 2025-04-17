import { AuthProvider } from "@/components/layouts/provider/auth-provider";
import { ReactNode } from "react";

export default function Layout({children }  : {children : ReactNode}){
    return (
        <AuthProvider>
        {children}
      </AuthProvider>
    )
}