import { cn } from "@/lib/utils";

export default function MainLayout({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <main className={cn(`w-full min-h-screen max-w-7xl relative ${className}`)}>
            {children}
        </main>
    );
}