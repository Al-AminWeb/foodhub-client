"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Flame, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    providerId: string;
    categoryId: string;
    provider?: {
        restaurant: string;
    };
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";

export function FeaturedMeals() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/meals`);
                const data = await res.json();

                if (data.success) {
                    // Get all meals, sort alphabetically by name, take first 4
                    const sortedMeals = (data.data || [])
                        .sort((a: Meal, b: Meal) => a.name.localeCompare(b.name))
                        .slice(0, 4);
                    setMeals(sortedMeals);
                }
            } catch (error) {
                console.error("Failed to fetch featured meals");
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, []);

    const handleAddToCart = (e: React.MouseEvent, meal: Meal) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            mealId: meal.id,
            name: meal.name,
            price: meal.price,
            image: meal.image,
            providerId: meal.providerId,
            providerName: meal.provider?.restaurant || "Local Restaurant",
        });
    };

    if (loading) {
        return (
            <section className="py-20 md:py-28 bg-gradient-to-b from-white to-orange-50/30">
                <div className="container mx-auto max-w-7xl px-4 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-white to-orange-50/30">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-4">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                            <Flame className="h-6 w-6 text-orange-500" />
                            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Most Popular</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                            Featured <span className="text-orange-600">Meals</span>
                        </h2>
                        <p className="text-gray-600 text-lg">Hand-picked favorites from top-rated restaurants</p>
                    </div>
                    <Link href="/meals">
                        <Button variant="outline" className="border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50 text-orange-700 font-semibold px-6">
                            View All Meals →
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {meals.map((meal) => (
                        <Link href={`/meals/${meal.id}`} key={meal.id}>
                            <Card className="overflow-hidden group border-none shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 bg-white cursor-pointer h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                    <Image
                                        src={meal.image || FALLBACK_IMAGE}
                                        alt={meal.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                </div>

                                <CardContent className="pt-6 flex-1">
                                    <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                        {meal.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                                        {meal.description}
                                    </p>
                                </CardContent>

                                <CardFooter className="flex justify-between items-center pt-0 pb-6 px-6 mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400 line-through">৳{(meal.price * 1.2).toFixed(0)}</span>
                                        <span className="text-2xl font-bold text-orange-600">৳{meal.price}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 gap-1 font-semibold"
                                        onClick={(e) => handleAddToCart(e, meal)}
                                    >
                                        <Plus className="h-4 w-4" /> Add
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>

                {meals.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No meals available at the moment
                    </div>
                )}
            </div>
        </section>
    );
}