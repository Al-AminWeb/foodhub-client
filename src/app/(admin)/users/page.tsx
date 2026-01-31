"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    UserX,
    UserCheck,
    Loader2,
    Users,
    Store,
    User
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "PROVIDER" | "CUSTOMER";
    isActive: boolean;
    createdAt: string;
}

export default function UsersManagement() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("ALL");
    const [updating, setUpdating] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1,
        total: 0,
    });

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, pagination.page]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: "10",
                ...(search && { search }),
                ...(roleFilter !== "ALL" && { role: roleFilter }),
            });

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${params}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
                setPagination(data.pagination);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
        setUpdating(userId);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ isActive: !currentStatus }),
                }
            );

            if (res.ok) {
                toast.success(`User ${currentStatus ? "suspended" : "activated"} successfully`);
                fetchUsers();
            } else {
                throw new Error("Failed to update user");
            }
        } catch (error) {
            toast.error("Failed to update user status");
        } finally {
            setUpdating(null);
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "PROVIDER": return <Store className="h-4 w-4" />;
            case "ADMIN": return <UserCheck className="h-4 w-4" />;
            default: return <User className="h-4 w-4" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "ADMIN": return "bg-purple-100 text-purple-700";
            case "PROVIDER": return "bg-orange-100 text-orange-700";
            default: return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage customers and providers</p>
                </div>
            </div>

            {/* Filters */}
            <Card className="border-none shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["ALL", "CUSTOMER", "PROVIDER", "ADMIN"].map((role) => (
                                <Button
                                    key={role}
                                    variant={roleFilter === role ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setRoleFilter(role)}
                                    className={roleFilter === role ? "bg-orange-600 hover:bg-orange-700" : ""}
                                >
                                    {role === "ALL" ? "All" : role.charAt(0) + role.slice(1).toLowerCase()}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-600" />
                        Users ({pagination.total})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No users found matching your criteria
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">User</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Role</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Joined</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge className={`${getRoleColor(user.role)} border-0`}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                              {user.role}
                          </span>
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge
                                                variant={user.isActive ? "default" : "secondary"}
                                                className={user.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-700 hover:bg-red-100"}
                                            >
                                                {user.isActive ? "Active" : "Suspended"}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button
                                                size="sm"
                                                variant={user.isActive ? "destructive" : "outline"}
                                                onClick={() => toggleUserStatus(user.id, user.isActive)}
                                                disabled={updating === user.id || user.role === "ADMIN"}
                                                className={!user.isActive ? "border-green-200 text-green-700 hover:bg-green-50" : ""}
                                            >
                                                {updating === user.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : user.isActive ? (
                                                    <>
                                                        <UserX className="h-4 w-4 mr-1" />
                                                        Suspend
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserCheck className="h-4 w-4 mr-1" />
                                                        Activate
                                                    </>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Page {pagination.page} of {pagination.totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={pagination.page === 1}
                                    onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={pagination.page === pagination.totalPages}
                                    onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}