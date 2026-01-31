"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, MapPin, Clock, Utensils, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
    };
}

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    provider: {
        restaurant: string;
        address: string | null;
        phone: string | null;
    };
    category: {
        name: string;
    };
    reviews: Review[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop";

export default function MealDetailPage() {
    const params = useParams();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/meals/${params.id}`
                );
                const data = await res.json();

                if (data.success) {
                    setMeal(data.data);
                } else {
                    toast.error("Meal not found");
                }
            } catch (error) {
                toast.error("Failed to fetch meal details");
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchMeal();
        }
    }, [params.id]);

    const calculateAverageRating = () => {
        if (!meal?.reviews?.length) return 0;
        const sum = meal.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / meal.reviews.length).toFixed(1);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal not found</h2>
                    <Link href="/meals">
                        <Button className="bg-orange-600 hover:bg-orange-700 mt-4">
                            Browse All Meals
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                {/* Back Button */}
                <Link href="/meals">
                    <Button variant="ghost" className="mb-6 gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-4 w-4" /> Back to Meals
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
                            <Image
                                src={meal.image || FALLBACK_IMAGE}
                                alt={meal.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            <Badge className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-3 py-1">
                                {meal.category.name}
                            </Badge>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {meal.reviews.length > 0 && (
                                    <div className="flex items-center gap-1 text-sm font-medium">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{calculateAverageRating()}</span>
                                        <span className="text-gray-500">({meal.reviews.length} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {meal.name}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {meal.description}
                            </p>
                        </div>

                        {/* Restaurant Info */}
                        <Card className="p-4 border-none shadow-sm bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Utensils className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{meal.provider.restaurant}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        {meal.provider.address && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {meal.provider.address}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> 30-45 min
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between py-4 border-y border-gray-100">
                            <div>
                                <p className="text-sm text-gray-500 line-through">৳{(meal.price * 1.2).toFixed(0)}</p>
                                <p className="text-3xl font-bold text-orange-600">৳{meal.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-xl shadow-orange-500/20 gap-2"
                            onClick={() => {
                                console.log("Add to cart:", meal.name, "Quantity:", quantity);
                                toast.success(`Added ${quantity}x ${meal.name} to cart`);
                            }}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart - ৳{meal.price * quantity}
                        </Button>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {meal.description}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        {meal.reviews.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="font-bold text-lg">Customer Reviews</h3>
                                <div className="space-y-3">
                                    {meal.reviews.map((review) => (
                                        <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                    <span className="text-orange-600 font-bold text-sm">
                                                        {review.user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm">{review.user.name}</p>
                                                    <div className="flex text-yellow-400 text-xs">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}