"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    User,
    ShoppingCart,
    Menu,
    X,
    Home,
} from "lucide-react";
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
    children: ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform lg:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <div className="rounded-lg bg-orange-500 p-1.5">
                            <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-orange-600">FoodHub</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <nav className="space-y-1 p-4">
                    {navigation.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors ${
                                    isActive
                                        ? "bg-orange-50 text-orange-700 border-r-4 border-orange-500"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${
                                        isActive ? "text-orange-600" : "text-gray-400"
                                    }`}
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Mobile Back to Home */}
                    <div className="mt-4 border-t pt-4">
                        <Link
                            href="/"
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                        >
                            <Home className="h-5 w-5 text-gray-400" />
                            Back to Home
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col overflow-y-auto border-r bg-white px-6 pb-4">
                    <div className="flex h-16 items-center gap-2 pt-4">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                            <div className="rounded-lg bg-orange-500 p-1.5">
                                <ShoppingBag className="h-5 w-5 text-white" />
                            </div>
                            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                FoodHub
                            </span>
                        </Link>
                    </div>

                    <nav className="flex flex-1 flex-col gap-1">
                        {navigation.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-x-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors ${
                                        isActive
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                                    }`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 ${
                                            isActive
                                                ? "text-orange-600"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop Bottom Actions */}
                    <div className="border-t pt-4 space-y-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                        >
                            <Home className="h-5 w-5 text-gray-400" />
                            Back to Home
                        </Link>

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
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <div className="rounded-lg bg-orange-500 p-1.5">
                            <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-orange-600">FoodHub</span>
                    </Link>

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <main className="px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
