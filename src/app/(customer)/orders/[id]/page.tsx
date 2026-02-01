"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

type Order = {
    id: string;
    status: string;
    total: number;
    address: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
    items: {
        id: string;
        qty: number;
        price: string;
        meal: {
            name: string;
            price: number;
        };
    }[];
};

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchOrder = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${params.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) throw new Error("Failed to fetch order");

                const data = await res.json();
                if (data.success) {
                    setOrder(data.data);
                }
            } catch (error) {
                console.error("Failed to load order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params.id, router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto max-w-4xl px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
                <Link href="/orders">
                    <Button variant="outline">Back to Orders</Button>
                </Link>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-green-100 text-green-700";
            case "CANCELLED": return "bg-red-100 text-red-700";
            case "PLACED": return "bg-blue-100 text-blue-700";
            default: return "bg-orange-100 text-orange-700";
        }
    };

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <div className="mb-6">
                <Link href="/orders" className="flex items-center text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Link>
            </div>

            <Card>
                <CardHeader className="border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl mb-1">Order #{order.id.slice(0, 8)}</CardTitle>
                            <p className="text-gray-500">
                                Placed on {new Date(order.createdAt).toLocaleDateString()} at {" "}
                                {new Date(order.createdAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <Badge className={getStatusColor(order.status)} variant="secondary">
                            {order.status}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                            <p className="text-gray-600 mt-1">{order.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                        <div className="space-y-3">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                                            {item.qty}x
                                        </span>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.meal.name}</p>
                                            <p className="text-sm text-gray-500">৳{item.price} each</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold">৳{parseInt(item.price) * item.qty}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total Amount</span>
                            <span>৳{order.total}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}