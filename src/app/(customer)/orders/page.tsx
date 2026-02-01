"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ChevronRight, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type Order = {
    id: string;
    status: "PLACED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
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
    const [cancellingId, setCancellingId] = useState<string | null>(null);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

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

    const handleCancelClick = (orderId: string) => {
        setSelectedOrderId(orderId);
        setShowCancelDialog(true);
    };

    const handleCancelOrder = async () => {
        if (!selectedOrderId) return;

        setCancellingId(selectedOrderId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/${selectedOrderId}/cancel`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Order cancelled successfully");
                // Update the order status locally
                setOrders(prev => prev.map(order =>
                    order.id === selectedOrderId
                        ? { ...order, status: "CANCELLED" }
                        : order
                ));
                setShowCancelDialog(false);
                setSelectedOrderId(null);
            } else {
                toast.error(data.message || "Failed to cancel order");
            }
        } catch (error) {
            toast.error("Failed to cancel order");
        } finally {
            setCancellingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-green-100 text-green-700";
            case "CANCELLED": return "bg-red-100 text-red-700";
            case "PLACED": return "bg-blue-100 text-blue-700";
            case "PREPARING": return "bg-yellow-100 text-yellow-700";
            case "READY": return "bg-purple-100 text-purple-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

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
                        <Card key={order.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Link href={`/orders/${order.id}`} className="flex-1">
                                        <div className="cursor-pointer">
                                            <p className="text-sm text-gray-500">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-sm text-gray-400">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            className={getStatusColor(order.status)}
                                        >
                                            {order.status}
                                        </Badge>
                                        {/* Cancel Button - Only for PLACED orders */}
                                        {order.status === "PLACED" && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                onClick={() => handleCancelClick(order.id)}
                                                disabled={cancellingId === order.id}
                                            >
                                                {cancellingId === order.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <XCircle className="h-4 w-4" />
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <Link href={`/orders/${order.id}`}>
                                    <div className="space-y-1 mb-4 cursor-pointer">
                                        {order.items.slice(0, 2).map((item, idx) => (
                                            <p key={idx} className="text-gray-700">
                                                {item.qty}x {item.meal.name}
                                            </p>
                                        ))}
                                        {order.items.length > 2 && (
                                            <p className="text-gray-500 text-sm">+{order.items.length - 2} more items</p>
                                        )}
                                    </div>
                                </Link>

                                <div className="flex items-center justify-between pt-4 border-t">
                                    <span className="font-bold text-lg">Total: ৳{order.total}</span>
                                    <Link href={`/orders/${order.id}`}>
                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Cancel Confirmation Dialog */}
            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            Cancel Order?
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this order? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                            Keep Order
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleCancelOrder}
                            disabled={!!cancellingId}
                        >
                            {cancellingId ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : null}
                            Yes, Cancel Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}