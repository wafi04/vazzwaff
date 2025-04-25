import { useAuth } from "@/components/layouts/provider/auth-provider";
import Image from "next/image";

export function HeaderCart() {
    return (
      <section>
        <h1 className="text-2xl font-bold text-white mb-4">Checkout details</h1>
      </section>
    );
  }


export function UserDetails() {
  const { user } = useAuth();
  
  return (
    <div className="bg-zinc-800 rounded-lg p-4">      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-500 rounded-md overflow-hidden flex items-center justify-center">
          {user?.username ? (
            <span className="text-white text-lg font-medium">{user.username.charAt(0)}</span>
          ) : (
            <Image
              src="/placeholder.svg?height=48&width=48" 
              alt="User avatar" 
              width={48} 
              height={48} 
            />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{user?.username || "Guest User"}</h3>
          <p className="text-sm text-zinc-400">
            {user?.whatsapp || "+1 (555) 123-4567"}
          </p>
        </div>
        
        <button className="text-xs bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded">
          Edit
        </button>
      </div>
    </div>
  );
}
