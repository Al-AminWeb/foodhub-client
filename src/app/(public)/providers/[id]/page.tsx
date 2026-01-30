"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Store,
    MapPin,
    Phone,
    ArrowLeft,
    Star,
    Clock,
    UtensilsCrossed,
    Plus,
    Loader2,
    AlertCircle
} from "lucide-react";

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    category?: {
        name: string;
    };
}

interface Provider {
    id: string;
    restaurant: string;
    address: string | null;
    phone: string | null;
    meals: Meal[];
}

export default function ProviderDetailPage() {
    const params = useParams();
    const providerId = params.id as string;

    const [provider, setProvider] = useState<Provider | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProvider = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${apiUrl}/api/providers/${providerId}`, {
                    cache: "no-store",
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch provider');
                }

                const json = await res.json();

                if (!json.success) {
                    throw new Error(json.message || 'Failed to fetch restaurant');
                }

                setProvider(json.data);
            } catch (err: any) {
                console.error("❌ Fetch error:", err);
                setError(err.message || "Failed to fetch restaurant details");
            } finally {
                setLoading(false);
            }
        };

        if (providerId) {
            fetchProvider();
        }
    }, [providerId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-orange-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500">Loading restaurant details...</p>
                </div>
            </div>
        );
    }

    if (error || !provider) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center p-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
                    <p className="text-gray-600 mb-4">{error || "Restaurant not found"}</p>
                    <Link href="/providers">
                        <Button className="bg-orange-600 hover:bg-orange-700">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Restaurants
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            {/* Orange Header with Restaurant Info */}
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white pt-8 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    {/* Back Button */}
                    <Link href="/providers">
                        <Button variant="ghost" className="text-white hover:bg-white/20 mb-6 -ml-4">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Restaurants
                        </Button>
                    </Link>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        {/* Restaurant Icon */}
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center flex-shrink-0">
                            <UtensilsCrossed className="h-12 w-12 text-orange-600" />
                        </div>

                        {/* Restaurant Info */}
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {provider.restaurant}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
                                {provider.address && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{provider.address}</span>
                                    </div>
                                )}
                                {provider.phone && (
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        <span>{provider.phone}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                                    <span className="font-bold">4.8</span>
                                    <span className="text-white/70">(120+ reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>30-45 min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Store className="h-4 w-4" />
                                    <span>{provider.meals?.length || 0} items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Menu Section */}
            <div className="container mx-auto max-w-7xl px-4 -mt-12 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Menu</h2>
                            <p className="text-gray-600">
                                {provider.meals?.length || 0} delicious items available
                            </p>
                        </div>
                    </div>

                    {provider.meals && provider.meals.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {provider.meals.map((meal) => (
                                <Card key={meal.id} className="overflow-hidden group border-none shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 bg-white">
                                    {/* Meal Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <img
                                            src={meal.image || "/api/placeholder/400/300"}
                                            alt={meal.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                        {meal.category && (
                                            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 font-semibold">
                                                {meal.category.name}
                                            </Badge>
                                        )}
                                    </div>

                                    <CardContent className="pt-4">
                                        <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {meal.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                            {meal.description}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="flex justify-between items-center pt-0 pb-4 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 line-through">
                                                ৳{(meal.price * 1.2).toFixed(0)}
                                            </span>
                                            <span className="text-xl font-bold text-orange-600">
                                                ৳{meal.price}
                                            </span>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-orange-600 hover:bg-orange-700 text-white gap-1"
                                            onClick={() => {
                                                console.log("Adding to cart:", meal.name);
                                                // Add to cart logic here
                                            }}
                                        >
                                            <Plus className="h-4 w-4" /> Add
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-xl">
                            <UtensilsCrossed className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No menu items yet</h3>
                            <p className="text-gray-500">This restaurant hasn't added any meals yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}