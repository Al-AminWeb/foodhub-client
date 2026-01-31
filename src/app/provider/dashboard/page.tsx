"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    ShoppingBag,
    UtensilsCrossed,
    TrendingUp,
    Clock,
    ArrowRight,
    Loader2,
    DollarSign
} from "lucide-react";
import Link from "next/link";

interface Stats {
    totalOrders: number;
    totalMenuItems: number;
    pendingOrders: number;
    totalRevenue: number;
}

interface RecentOrder {
    id: string;
    status: string;
    total: number;
    user: {
        name: string;
    };
    createdAt: string;
}

export default function ProviderDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalOrders: 0,
        totalMenuItems: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");


            const ordersRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/orders`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const ordersData = await ordersRes.json();


            const mealsRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const mealsData = await mealsRes.json();
            const meals = mealsData.data || [];
            const orders = ordersData.data || [];

            // Calculate stats
            const pendingOrders = orders.filter((o: any) =>
                o.status === "PLACED" || o.status === "PREPARING"
            ).length;

            const totalRevenue = orders
                .filter((o: any) => o.status === "DELIVERED")
                .reduce((acc: number, o: any) => acc + o.total, 0);

            setStats({
                totalOrders: orders.length,
                totalMenuItems: meals.length,
                pendingOrders,
                totalRevenue,
            });

            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error("Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLACED": return "bg-yellow-100 text-yellow-700";
            case "PREPARING": return "bg-blue-100 text-blue-700";
            case "READY": return "bg-purple-100 text-purple-700";
            case "DELIVERED": return "bg-green-100 text-green-700";
            case "CANCELLED": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your menu and orders</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <ShoppingBag className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Menu Items</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalMenuItems}</p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <UtensilsCrossed className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-xl">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Revenue</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">৳{stats.totalRevenue}</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-xl">
                                <DollarSign className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-md lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Recent Orders</CardTitle>
                        <Link href="/provider/orders">
                            <Button variant="ghost" className="text-orange-600 hover:bg-orange-50">
                                View All <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recentOrders.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No orders yet</p>
                        ) : (
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-sm text-gray-500">{order.user.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                                            <p className="font-bold text-gray-900 mt-1">৳{order.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-gradient-to-br from-orange-500 to-red-600 text-white">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
                        <p className="text-white/80 mb-6">Manage your restaurant</p>
                        <div className="space-y-3">
                            <Link href="/provider/menu">
                                <Button className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold gap-2">
                                    <UtensilsCrossed className="h-4 w-4" />
                                    Manage Menu
                                </Button>
                            </Link>
                            <Link href="/provider/orders">
                                <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold gap-2">
                                    <ShoppingBag className="h-4 w-4" />
                                    View Orders
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}