"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UtensilsCrossed, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                    <div className="p-2 bg-orange-500 rounded-lg">
                        <UtensilsCrossed className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            FoodHub
          </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/meals"
                        className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        Browse Meals
                    </Link>
                    <Link
                        href="/providers"
                        className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        Restaurants
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        About
                    </Link>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                            <ShoppingCart className="h-5 w-5 text-gray-600" />
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                0
              </span>
                        </Button>
                    </Link>

                    <Link href="/login">
                        <Button variant="ghost" size="sm" className="font-semibold hover:text-orange-600 hover:bg-orange-50">
                            Log in
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm">
                            Sign up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">
                    <Link href="/meals" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                        Browse Meals
                    </Link>
                    <Link href="/providers" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                        Restaurants
                    </Link>
                    <Link href="/cart" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                        Cart (0 items)
                    </Link>
                    <hr />
                    <Link href="/login" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                        Log in
                    </Link>
                    <Link href="/register">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                            Sign up
                        </Button>
                    </Link>
                </div>
            )}
        </header>
    );
}