"use client"

import { ReactNode } from "react";
import { User } from "@/types/schema/user";
import { NavbarAdmin } from "../navbar-admin";
import { AuthProvider, useAuth } from "./auth-provider";

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return (
    <NavbarAdmin user={user as User}>
      {children}
    </NavbarAdmin>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider requireAdmin={true} redirectTo="/auth/login">
      <AdminLayoutContent>
      {children}
      </AdminLayoutContent>
    </AuthProvider>
  );
}
