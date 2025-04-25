"use client"
import { ReactNode } from "react";
import { AuthProvider} from "./auth-provider";
import { Navbar } from "../navbar";

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider requireAdmin={false} requireUser={true} redirectTo="/auth/login">
      <Navbar />
        {children}
    </AuthProvider>
  );
}
