"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    UtensilsCrossed,
    LogOut,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const adminNavItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/categories", label: "Categories", icon: UtensilsCrossed },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check admin auth
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/login");
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                if (!data.success || data.data.role !== "ADMIN") {
                    toast.error("Access denied. Admins only.");
                    router.push("/");
                    return;
                }

                setUser(data.data);
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
        toast.success("Logged out successfully");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 fixed h-full">
                <div className="p-6 border-b border-gray-200">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-2xl">
                        <div className="p-2 bg-orange-500 rounded-lg">
                            <UtensilsCrossed className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Admin
            </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {adminNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    isActive
                                        ? "bg-orange-50 text-orange-600 font-semibold shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                                {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="mb-4 px-4">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Button
                        variant="outline"
                        className="w-full gap-2 text-red-600 hover:bg-red-50 border-red-200"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 px-4 flex items-center justify-between">
                <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <div className="p-1.5 bg-orange-500 rounded-lg">
                        <UtensilsCrossed className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-orange-600">Admin</span>
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <LayoutDashboard className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-64 p-0">
                        <div className="p-6 border-b border-gray-200">
                            <p className="font-bold text-lg">Menu</p>
                        </div>
                        <nav className="p-4 space-y-2">
                            {adminNavItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-3 text-red-600 mt-4"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
                <div className="p-4 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}