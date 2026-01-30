"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin, Phone, ArrowRight, Loader2, UtensilsCrossed, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Provider {
    id: string;
    restaurant: string;
    address: string | null;
    phone: string | null;
    userId: string;
}

export default function ProvidersPage() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${apiUrl}/api/providers`, {
                    cache: "no-store",
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch providers');
                }

                const json = await res.json();

                if (!json.success) {
                    throw new Error(json.message || 'Failed to fetch providers');
                }

                setProviders(json.data || []);
            } catch (err: any) {
                console.error("❌ Fetch error:", err);
                setError(err.message || "Failed to fetch restaurants");
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-orange-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading restaurants...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            {/* Orange Header */}
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white pt-12 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
                        Our <span className="text-yellow-300">Restaurants</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl text-center max-w-2xl mx-auto">
                        Discover the best local restaurants and their delicious offerings
                    </p>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">
                <div className="mt-8 flex items-center justify-between">
                    <p className="text-gray-600">
                        Showing <span className="font-bold text-gray-900">{providers.length}</span> restaurants
                    </p>
                </div>

                {providers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Store className="h-12 w-12 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No restaurants found</h3>
                        <p className="text-gray-500">Check back later for new restaurants</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {providers.map((provider) => (
                            <Link href={`/providers/${provider.id}`} key={provider.id}>
                                <Card className="overflow-hidden group cursor-pointer border-none shadow-lg hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 hover:-translate-y-2 bg-white h-full">
                                    {/* Header with Icon */}
                                    <div className="h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <UtensilsCrossed className="h-10 w-10 text-orange-600" />
                                        </div>
                                        <Badge className="absolute top-4 right-4 bg-white/90 text-orange-600 font-bold">
                                            Open Now
                                        </Badge>
                                    </div>

                                    <CardContent className="pt-6 pb-6">
                                        <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {provider.restaurant}
                                        </h3>

                                        {provider.address && (
                                            <div className="flex items-start gap-2 text-gray-500 mb-3">
                                                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{provider.address}</span>
                                            </div>
                                        )}

                                        {provider.phone && (
                                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                                <Phone className="h-4 w-4 flex-shrink-0" />
                                                <span className="text-sm">{provider.phone}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-bold">4.8</span>
                                            </div>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-sm text-gray-500">20+ items</span>
                                            <span className="text-gray-300">|</span>
                                            <span className="text-sm text-gray-500">30-45 min</span>
                                        </div>

                                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold gap-2 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all">
                                            View Menu <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}