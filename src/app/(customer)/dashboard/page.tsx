"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/app/context/CartContext";
import {
    ShoppingBag,
    Package,
    User,
    Clock,
    ChevronRight,
    Loader2
} from "lucide-react";

type Order = {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    items: {
        qty: number;
        meal: { name: string };
    }[];
};

type UserData = {
    name: string;
    email: string;
    role: string;
};

export default function CustomerDashboard() {
    const [user, setUser] = useState<UserData | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { totalItems } = useCart();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = await userRes.json();

                const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const ordersData = await ordersRes.json();

                if (userData.success) setUser(userData.data);
                if (ordersData.success) setOrders(ordersData.data);
            } catch (error) {
                console.error("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    const lastOrder = orders[0];
    const totalOrders = orders.length;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name?.split(' ')[0]}!
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Cart Items</p>
                                <p className="text-3xl font-bold text-orange-600">{totalItems}</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <ShoppingBag className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                        <Link href="/cart">
                            <Button variant="ghost" className="mt-4 w-full text-orange-700 hover:bg-orange-100">
                                View Cart <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Orders</p>
                                <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <Link href="/orders">
                            <Button variant="ghost" className="mt-4 w-full text-blue-700 hover:bg-blue-100">
                                View Orders <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className={`${
                    lastOrder?.status === "DELIVERED" ? "bg-green-50 border-green-200" :
                        lastOrder?.status === "CANCELLED" ? "bg-red-50 border-red-200" :
                            "bg-yellow-50 border-yellow-200"
                }`}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Last Order</p>
                                <p className="text-lg font-bold">
                                    {lastOrder ? lastOrder.status : "No orders"}
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${
                                lastOrder?.status === "DELIVERED" ? "bg-green-100" :
                                    lastOrder?.status === "CANCELLED" ? "bg-red-100" :
                                        "bg-yellow-100"
                            }`}>
                                <Clock className={`h-6 w-6 ${
                                    lastOrder?.status === "DELIVERED" ? "text-green-600" :
                                        lastOrder?.status === "CANCELLED" ? "text-red-600" :
                                            "text-yellow-600"
                                }`} />
                            </div>
                        </div>
                        {lastOrder && (
                            <div className="mt-3">
                                <Badge className={
                                    lastOrder.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                        lastOrder.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                            "bg-yellow-100 text-yellow-700"
                                }>
                                    {lastOrder.status}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">৳{lastOrder.total}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">No orders yet. Start shopping!</p>
                            <Link href="/meals">
                                <Button className="bg-orange-600 hover:bg-orange-700">
                                    Browse Meals
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {orders.slice(0, 5).map((order) => (
                                <Link key={order.id} href={`/orders/${order.id}`}>
                                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div>
                                            <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">৳{order.total}</p>
                                            <Badge variant="outline">{order.status}</Badge>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}