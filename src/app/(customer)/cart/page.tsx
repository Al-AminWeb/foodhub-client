"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        setIsAuthenticated(true);
    }, [router]);

    if (!isAuthenticated) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="h-12 w-12 text-orange-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-6">Looks like you haven't added any meals yet.</p>
                <Link href="/meals">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        Browse Meals
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={item.mealId} className="overflow-hidden">
                            <CardContent className="p-4 flex gap-4">
                                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                        src={item.image || FALLBACK_IMAGE}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.providerName}</p>
                                        <p className="text-lg font-bold text-orange-600 mt-1">৳{item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.mealId, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.mealId, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.mealId)}
                                            className="text-red-500 hover:text-red-700 p-2"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>৳{totalPrice}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg"
                                onClick={() => router.push("/checkout")}
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Link href="/meals" className="block text-center mt-4 text-orange-600 hover:text-orange-700 font-medium">
                                Continue Shopping
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}