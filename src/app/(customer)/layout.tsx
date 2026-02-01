"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    User,
    ShoppingCart,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Orders", href: "/orders", icon: Package },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Profile", href: "/profile", icon: User },
];

export default function CustomerLayout({
                                           children,
                                       }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform lg:hidden ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/public" className="flex items-center gap-2 font-bold text-xl">
                        <div className="p-1.5 bg-orange-500 rounded-lg">
                            <ShoppingBag className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-orange-600">FoodHub</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
                <nav className="p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                    isActive
                                        ? "bg-orange-50 text-orange-700 border-r-4 border-orange-500"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? "text-orange-600" : "text-gray-400"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:z-40 lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                    <div className="flex h-16 items-center gap-2 pt-4">
                        <Link href="/public" className="flex items-center gap-2 font-bold text-xl">
                            <div className="p-1.5 bg-orange-500 rounded-lg">
                                <ShoppingBag className="h-5 w-5 text-white"/>
                            </div>
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                FoodHub
                            </span>
                        </Link>
                    </div>
                    <nav className="flex flex-1 flex-col gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center gap-x-3 rounded-md px-3 py-2.5 text-sm font-semibold leading-6 transition-colors ${
                                        isActive
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                                    }`}
                                >
                                    <item.icon className={`h-5 w-5 shrink-0 ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-orange-600"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="border-t pt-4">
                        <Link href="/meals">
                            <Button variant="outline" className="w-full justify-start gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                Browse Meals
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile Header */}
                <div className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
                    <Link href="/public" className="flex items-center gap-2 font-bold text-xl">
                        <div className="p-1.5 bg-orange-500 rounded-lg">
                            <ShoppingBag className="h-5 w-5 text-white"/>
                        </div>
                        <span className="text-orange-600">FoodHub</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}