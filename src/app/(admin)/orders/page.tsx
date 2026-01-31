"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, Loader2 } from "lucide-react";

interface Order {
    id: string;
    user: {
        name: string;
        email: string;
    };
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
    total: number;
    address: string;
    createdAt: string;
    items: Array<{
        qty: number;
        meal: {
            name: string;
            price: number;
        };
    }>;
}

const statusColors = {
    PLACED: "bg-yellow-100 text-yellow-700",
    PREPARING: "bg-blue-100 text-blue-700",
    READY: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
};

export default function OrdersManagement() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order =>
        order.user.name.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-500 mt-1">View and track all platform orders</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search by customer or order ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-orange-600" />
                        All Orders ({filteredOrders.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No orders found
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h3>
                                                <Badge className={`${statusColors[order.status]} border-0`}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {order.user.name} ({order.user.email})
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-orange-600">৳{order.total}</p>
                                            <p className="text-sm text-gray-500">{order.items.length} items</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-gray-700 mb-2">Items:</p>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.qty}x {item.meal.name}
                          </span>
                                                    <span className="text-gray-900">৳{item.meal.price * item.qty}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-200 mt-3 pt-3">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Delivery Address:</span> {order.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}