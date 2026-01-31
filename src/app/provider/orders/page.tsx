"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    ShoppingBag,
    Loader2,
    ChevronDown,
    User,
    MapPin,
    Clock,

} from "lucide-react";
import {toast} from "sonner";

type OrderStatus = "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";

interface Order {
    id: string;
    status: OrderStatus;
    total: number;
    address: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
    items: Array<{
        qty: number;
        price: string;
        meal: {
            name: string;
            price: number;
            image: string | null;
        };
    }>;
}

const statusColors = {
    PLACED: "bg-yellow-100 text-yellow-700 border-yellow-200",
    PREPARING: "bg-blue-100 text-blue-700 border-blue-200",
    READY: "bg-purple-100 text-purple-700 border-purple-200",
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const statusFlow: OrderStatus[] = ["PLACED", "PREPARING", "READY", "DELIVERED"];

export default function ProviderOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders`,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
        setUpdating(orderId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders/${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({status: newStatus}),
                }
            );

            if (res.ok) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders();
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setUpdating(null);
        }
    };

    const getNextStatus = (current: OrderStatus): OrderStatus | null => {
        const currentIndex = statusFlow.indexOf(current);
        if (currentIndex === -1 || currentIndex === statusFlow.length - 1) return null;
        return statusFlow[currentIndex + 1];
    };

    const filteredOrders = filter === "ALL"
        ? orders
        : orders.filter(o => o.status === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600"/>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-500 mt-1">View and update order statuses</p>
                </div>

                <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Orders</SelectItem>
                        <SelectItem value="PLACED">New Orders</SelectItem>
                        <SelectItem value="PREPARING">Preparing</SelectItem>
                        <SelectItem value="READY">Ready</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredOrders.length === 0 ? (
                <Card className="border-none shadow-md">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <ShoppingBag className="h-12 w-12 text-gray-300 mb-4"/>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500">
                            {filter === "ALL" ? "You haven't received any orders yet" : `No ${filter.toLowerCase()} orders`}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const nextStatus = getNextStatus(order.status);

                        return (
                            <Card key={order.id} className="border-none shadow-md">
                                <CardHeader className="pb-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                                <ShoppingBag className="h-6 w-6 text-orange-600"/>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
                                                    <Badge className={`${statusColors[order.status]} border`}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4"/>
                              {order.user.name}
                          </span>
                                                    <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4"/>
                                                        {new Date(order.createdAt).toLocaleString()}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <p className="text-2xl font-bold text-orange-600">৳{order.total}</p>
                                            {nextStatus && (
                                                <Button
                                                    size="sm"
                                                    className="bg-orange-600 hover:bg-orange-700"
                                                    onClick={() => updateStatus(order.id, nextStatus)}
                                                    disabled={updating === order.id}
                                                >
                                                    {updating === order.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                                    ) : (
                                                        `Mark ${nextStatus}`
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div className="flex items-start gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5"/>
                                            <span className="text-gray-600">{order.address}</span>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-gray-700">Items:</p>
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-3">
                            <span
                                className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                              {item.qty}
                            </span>
                                                        <span className="text-gray-900">{item.meal.name}</span>
                                                    </div>
                                                    <span
                                                        className="text-gray-600">৳{parseInt(item.price) * item.qty}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <Select
                                                value={order.status}
                                                onValueChange={(value: OrderStatus) => updateStatus(order.id, value)}
                                                disabled={updating === order.id}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusFlow.map((status) => (
                                                        <SelectItem key={status} value={status}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                                    <SelectItem value="CANCELLED" className="text-red-600">
                                                        CANCELLED
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}