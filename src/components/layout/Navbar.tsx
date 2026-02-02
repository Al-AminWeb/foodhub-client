"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ShoppingCart,
    UtensilsCrossed,
    User,
    Menu,
    X,
    LayoutDashboard,
    LogOut,
    Settings,
    Store
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {useCart} from "@/app/context/CartContext";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                }
            }
        } catch (error) {
            console.error("Auth check failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
        toast.success("Logged out successfully");
        router.refresh();
    };

    const getDashboardLink = () => {
        if (!user) return "/login";

        switch (user.role) {
            case "ADMIN":
                return "/admin/dashboard";
            case "PROVIDER":
                return "/provider/dashboard"; // Change this to your provider dashboard route
            case "CUSTOMER":
            default:
                return "/dashboard"; // Change this to your customer dashboard route
        }
    };

    const getProfileInitials = () => {
        if (!user?.name) return "U";
        return user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
    };

    const { totalItems } = useCart();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-backdrop-filter:bg-white/60">
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
                    {/* Cart - Show for everyone including logged in */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative hover:bg-orange-50">
                            <ShoppingCart className="h-5 w-5 text-gray-600"/>
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
  {totalItems > 9 ? '9+' : totalItems}
</span>
                        </Button>
                    </Link>

                    {loading ? (
                        // Loading state
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                    ) : user ? (
                        // Logged in state
                        <>
                            {/* Dashboard Button */}
                            <Link href={getDashboardLink()}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="font-semibold hover:text-orange-600 hover:bg-orange-50 gap-2"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    {user.role === "ADMIN" ? "Admin Panel" :
                                        user.role === "PROVIDER" ? "My Restaurant" : "My Orders"}
                                </Button>
                            </Link>

                            {/* Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8 border-2 border-orange-200">
                                            <AvatarImage src={user.image || ""} alt={user.name} />
                                            <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                                                {getProfileInitials()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                            <p className="text-xs text-orange-600 font-medium mt-1">
                                                {user.role}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />

                                    {/* Role-specific menu items */}
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardLink()} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>

                                    {user.role === "PROVIDER" && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/provider/menu" className="cursor-pointer">
                                                <Store className="mr-2 h-4 w-4" />
                                                Manage Menu
                                            </Link>
                                        </DropdownMenuItem>
                                    )}

                                    <DropdownMenuItem asChild>
                                        <Link href="/orders" className="cursor-pointer">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            My Orders
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        // Logged out state
                        <>
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
                        </>
                    )}
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
                        Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </Link>

                    {user ? (
                        // Mobile logged in menu
                        <>
                            <hr />
                            <div className="flex items-center gap-3 py-2">
                                <Avatar className="h-10 w-10 border-2 border-orange-200">
                                    <AvatarFallback className="bg-orange-100 text-orange-700 font-bold">
                                        {getProfileInitials()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-orange-600">{user.role}</p>
                                </div>
                            </div>
                            <Link href={getDashboardLink()} className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                                <LayoutDashboard className="inline h-4 w-4 mr-2" />
                                Dashboard
                            </Link>
                            <Link href="/profile" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                                <User className="inline h-4 w-4 mr-2" />
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left py-2 text-red-600 font-medium"
                            >
                                <LogOut className="inline h-4 w-4 mr-2" />
                                Log out
                            </button>
                        </>
                    ) : (
                        // Mobile logged out menu
                        <>
                            <hr />
                            <Link href="/login" className="block py-2 text-gray-600 hover:text-orange-600 font-medium">
                                Log in
                            </Link>
                            <Link href="/register">
                                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}