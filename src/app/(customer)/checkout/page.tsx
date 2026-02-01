"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        setIsAuthenticated(true);

        if (items.length === 0) {
            router.push("/cart");
        }
    }, [items.length, router]);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!address.trim()) {
            toast.error("Please enter delivery address");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const orderItems = items.map(item => ({
                mealName: item.name,
                qty: item.quantity
            }));

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    address,
                    items: orderItems
                })
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to place order");
            }

            toast.success("Order placed successfully!");
            clearCart();
            router.push("/orders");

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated || items.length === 0) return null;

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-orange-600" />
                                Delivery Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePlaceOrder} className="space-y-4">
                                <div>
                                    <Label htmlFor="address">Full Address</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Enter your complete delivery address..."
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="min-h-[100px] mt-1"
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            `Place Order - ৳${totalPrice}`
                                        )}
                                    </Button>
                                </div>

                                <Link href="/cart" className="block text-center text-orange-600 hover:text-orange-700 font-medium">
                                    ← Back to Cart
                                </Link>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.mealId} className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                {item.quantity}x
                                            </span>
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.providerName}</p>
                                            </div>
                                        </div>
                                        <span className="font-semibold">৳{item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>৳{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Delivery Fee</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>৳{totalPrice}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                <div className="text-sm text-green-800">
                                    <p className="font-semibold">Cash on Delivery</p>
                                    <p>Pay when your order arrives</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}