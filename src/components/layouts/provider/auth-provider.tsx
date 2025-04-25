"use client"

import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { api } from "@/lib/axios";
import { User } from "@/types/schema/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
  redirectTo?: string;
  withAdminNavbar?: boolean;
}

export function AuthProvider({ 
  children, 
  requireAdmin = false,
  requireUser = true,
  redirectTo = "/auth/login",
  withAdminNavbar = false
}: AuthProviderProps) {
  const router = useRouter();
  
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await api.get<{ user: User }>("/auth/profile");
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        throw err;
      }
    },
    gcTime: 1000 * 60,
    retry: (failureCount, error: any) => {
      if (error.message === "UNAUTHORIZED") return false;
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5,
  });

  const user = data?.user ?? null;
  
  // Handle unauthorized access
  if (error && error.message === "UNAUTHORIZED") {
    if (requireUser || requireAdmin) {
      return router.replace(redirectTo);
    }
  }
  
  // Handle role-based access
  if (!isLoading && user) {
    if (requireAdmin && user.role !== "ADMIN") {
      return router.replace(redirectTo);
    }
  }

  // Show loading state
  if (isLoading) {
    return <LoadingOverlay />;
  }

  const contextValue = {
    user,
    isLoading,
    error: error || null
  };

 

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
