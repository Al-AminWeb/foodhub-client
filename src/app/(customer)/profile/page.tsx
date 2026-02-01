"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Mail, Save, ArrowLeft, Shield, Calendar } from "lucide-react";
import { toast } from "sonner";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    providerProfile?: {
        restaurant: string;
        address: string | null;
        phone: string | null;
    } | null;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state - initialized empty
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (data.success) {
                const userData = data.data;
                setUser(userData);
                // Pre-fill form with current data
                setFormData({
                    name: userData.name,
                    email: userData.email
                });
            } else {
                toast.error("Failed to load profile");
            }
        } catch (error) {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation - only check if name is provided (required field)
        if (!formData.name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }

        // Only validate email format if it's being changed and not empty
        if (formData.email && formData.email !== user?.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                toast.error("Please enter a valid email address");
                return;
            }
        }

        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            // Build payload - only send fields that changed
            const payload: { name?: string; email?: string } = {};

            if (formData.name !== user?.name) {
                payload.name = formData.name;
            }

            if (formData.email !== user?.email) {
                payload.email = formData.email;
            }

            // If nothing changed, just return
            if (Object.keys(payload).length === 0) {
                toast.info("No changes to save");
                setSaving(false);
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                toast.success("Profile updated successfully");
                setUser(data.data);
                // Update form with new data
                setFormData({
                    name: data.data.name,
                    email: data.data.email
                });
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // Check if form has changes compared to original data
    const hasChanges = user && (
        formData.name !== user.name ||
        formData.email !== user.email
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="hover:bg-orange-50"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 mt-1">Manage your account information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - User Info Card */}
                <Card className="lg:col-span-1 h-fit">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4">
                                {user ? getInitials(user.name) : "U"}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                            <p className="text-gray-500 capitalize mb-4">{user?.role.toLowerCase()}</p>

                            <div className="w-full space-y-3 text-left pt-4 border-t">
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="h-4 w-4 text-orange-600" />
                                    <span className="text-gray-600">Status:</span>
                                    <span className={`font-medium ${user?.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.isActive ? 'Active' : 'Suspended'}
                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-orange-600" />
                                    <span className="text-gray-600">Joined:</span>
                                    <span className="font-medium text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-orange-600" />
                                    <span className="text-gray-600">Email:</span>
                                    <span className="font-medium text-gray-900 truncate max-w-[150px]">
                    {user?.email}
                  </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column - Edit Form */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-xl">Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field - Can update alone */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    Full Name *
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                                <p className="text-xs text-gray-500">
                                    Change only this field if you want to update just your name
                                </p>
                            </div>

                            {/* Email Field - Optional update */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                                <p className="text-xs text-gray-500">
                                    Leave unchanged if you don't want to update email
                                </p>
                            </div>

                            {/* Provider Specific Info (Read Only) */}
                            {user?.providerProfile && (
                                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 space-y-3">
                                    <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                                        <Shield className="h-4 w-4" />
                                        Restaurant Information
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex justify-between">
                                            <span className="text-gray-600">Restaurant:</span>
                                            <span className="font-medium text-gray-900">{user.providerProfile.restaurant}</span>
                                        </p>
                                        {user.providerProfile.address && (
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Address:</span>
                                                <span className="font-medium text-gray-900">{user.providerProfile.address}</span>
                                            </p>
                                        )}
                                        {user.providerProfile.phone && (
                                            <p className="flex justify-between">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="font-medium text-gray-900">{user.providerProfile.phone}</span>
                                            </p>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 italic">
                                        Restaurant details can only be updated by admin
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12"
                                    onClick={() => {
                                        if (user) {
                                            setFormData({
                                                name: user.name,
                                                email: user.email
                                            });
                                        }
                                    }}
                                    disabled={!hasChanges}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold"
                                    disabled={saving || !hasChanges}
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}