"use client"

import { ReactNode } from "react";
import { AuthProvider} from "./auth-provider";


export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider requireAdmin={false} redirectTo="/auth/login">
        {children}
    </AuthProvider>
  );
}
