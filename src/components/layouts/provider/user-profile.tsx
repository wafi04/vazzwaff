"use client"
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Api, api } from "@/lib/axios";
import { ApiResponse } from "@/types/response";
import { User } from "@/types/schema/user";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";
import { Navbar } from "../navbar";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  const { data: user, error, isLoading } = useQuery({
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

  // Handle unauthorized access
  if (error && error.message === "UNAUTHORIZED") {
    // Use replace instead of push to prevent back navigation to protected page
    router.replace("/auth/login");
    return <LoadingOverlay />;
  }

  // Show loading state
  if (isLoading) {
    return <LoadingOverlay  />;
  }

  // Provide user data to children components
  return (
    <UserContext.Provider value={{ user: user?.user ?? null, isLoading, error: error || null }}>
        <Navbar />
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}