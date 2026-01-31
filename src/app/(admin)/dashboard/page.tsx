"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, Store, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Stats {
    totalUsers: number;
    totalOrders: number;
    totalProviders: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem("token");

            // Fetch users count
            const usersRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?limit=1`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const usersData = await usersRes.json();

            // Fetch orders
            const ordersRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const ordersData = await ordersRes.json();

            setStats({
                totalUsers: usersData.pagination?.total || 0,
                totalOrders: ordersData.data?.length || 0,
                totalProviders: 0, // You can add a specific endpoint for this
                totalRevenue: ordersData.data?.reduce((acc: number, order: any) => acc + order.total, 0) || 0,
            });
        } catch (error) {
            console.error("Failed to fetch stats");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Users",
            value: stats?.totalUsers || 0,
            icon: Users,
            color: "bg-blue-500",
            link: "/admin/users",
        },
        {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            icon: ShoppingBag,
            color: "bg-orange-500",
            link: "/admin/orders",
        },
        {
            title: "Providers",
            value: stats?.totalProviders || 0,
            icon: Store,
            color: "bg-green-500",
            link: "/admin/users?role=PROVIDER",
        },
        {
            title: "Total Revenue",
            value: `৳${(stats?.totalRevenue || 0).toLocaleString()}`,
            icon: TrendingUp,
            color: "bg-purple-500",
            link: "/admin/orders",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your FoodHub platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color.replace("bg-", "text-")}`} />
                                </div>
                            </div>
                            <Link href={stat.link}>
                                <Button variant="ghost" className="mt-4 w-full text-orange-600 hover:bg-orange-50">
                                    View Details →
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Link href="/admin/users">
                            <Button variant="outline" className="w-full justify-between h-12">
                                Manage Users
                                <Users className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/admin/categories">
                            <Button variant="outline" className="w-full justify-between h-12">
                                Manage Categories
                                <Store className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/admin/orders">
                            <Button variant="outline" className="w-full justify-between h-12">
                                View All Orders
                                <ShoppingBag className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium text-green-800">API Server</span>
                                </div>
                                <span className="text-sm text-green-600">Online</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium text-green-800">Database</span>
                                </div>
                                <span className="text-sm text-green-600">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium text-blue-800">Admin Access</span>
                                </div>
                                <span className="text-sm text-blue-600">Active</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}