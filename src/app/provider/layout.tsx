"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    UtensilsCrossed,
    ShoppingBag,
    Store,
    LogOut,
    ChevronRight,
    Home,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const providerNavItems = [
    { href: "/provider/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/provider/menu", label: "My Menu", icon: UtensilsCrossed },
    { href: "/provider/orders", label: "Orders", icon: ShoppingBag },
];

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                if (!data.success || data.data.role !== "PROVIDER") {
                    toast.error("Access denied. Providers only.");
                    router.push("/");
                    return;
                }

                setUser(data.data);
                setProfile(data.data.providerProfile);
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
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <Store className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-gray-900 leading-tight">
                                {profile?.restaurant || "My Restaurant"}
                            </h2>
                            <p className="text-xs text-orange-600 font-medium">Provider Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {providerNavItems.map((item) => {
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

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all w-full"
                    >
                        <Home className="h-5 w-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    <div className="px-4 py-2">
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
                <Link href="/provider/dashboard" className="flex items-center gap-2 font-bold text-lg">
                    <Store className="h-6 w-6 text-orange-600" />
                    <span className="text-gray-900 truncate max-w-[150px]">
            {profile?.restaurant || "Provider"}
          </span>
                </Link>

                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button variant="ghost" size="icon" className="text-gray-600">
                            <Home className="h-5 w-5" />
                        </Button>
                    </Link>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <LayoutDashboard className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64 p-0">
                            <div className="p-6 border-b border-gray-200 bg-orange-50">
                                <p className="font-bold text-lg text-gray-900">{profile?.restaurant}</p>
                                <p className="text-sm text-gray-500">{user?.name}</p>
                            </div>
                            <nav className="p-4 space-y-2">
                                {providerNavItems.map((item) => {
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
                                <div className="border-t border-gray-200 my-4 pt-4">
                                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                                        <Home className="h-5 w-5" />
                                        Back to Home
                                    </Link>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-3 text-red-600 mt-2"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Logout
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
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