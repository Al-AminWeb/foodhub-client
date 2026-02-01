"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Package, ChevronRight } from "lucide-react";

type Order = {
    id: string;
    status: string;
    total: number;
    address: string;
    createdAt: string;
    items: {
        qty: number;
        price: string;
        meal: {
            name: string;
        };
    }[];
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!res.ok) throw new Error("Failed to fetch orders");

                const data = await res.json();
                if (data.success) {
                    setOrders(data.data);
                }
            } catch (error) {
                console.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-4">Your order history will appear here</p>
                    <Link href="/meals" className="text-orange-600 hover:text-orange-700 font-medium">
                        Start Shopping →
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link href={`/orders/${order.id}`} key={order.id}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={order.status === "DELIVERED" ? "default" : "secondary"}
                                            className={order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        {order.items.slice(0, 2).map((item, idx) => (
                                            <p key={idx} className="text-gray-700">
                                                {item.qty}x {item.meal.name}
                                            </p>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-gray-500 text-sm">+{order.items.length - 2} more items</p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <span className="font-bold text-lg">Total: ৳{order.total}</span>
                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}