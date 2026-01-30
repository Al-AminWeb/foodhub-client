"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Plus, MapPin, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    category?: {
        name: string;
    };
    provider?: {
        restaurant: string;
        address?: string;
    };
}

interface MealGridProps {
    meals: Meal[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";

export function MealGrid({ meals }: MealGridProps) {
    const handleAddToCart = (e: React.MouseEvent, mealName: string) => {
        e.preventDefault();
        e.stopPropagation();
        // Backend expects mealName for now (per your choice)
        console.log("Adding to cart:", mealName);
        toast.success(`${mealName} added to cart!`);
    };

    if (meals.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-12 w-12 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No meals found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
                <Link href={`/meals/${meal.id}`} key={meal.id}>
                    <Card className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 hover:-translate-y-2 bg-white h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                            <Image
                                src={meal.image || FALLBACK_IMAGE}
                                alt={meal.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                            {/* Category Badge */}
                            <Badge className="absolute top-4 left-4 bg-white/95 text-gray-800 hover:bg-white font-bold shadow-lg border-none">
                                {meal.category?.name || "Food"}
                            </Badge>

                            {/* Rating Badge */}
                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-full shadow-lg">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold text-gray-800">4.5</span>
                            </div>

                            {/* Restaurant Info Overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="flex items-center gap-2 text-white text-sm mb-1">
                                    <MapPin className="h-4 w-4 text-orange-400" />
                                    <span className="font-medium truncate">
                                        {meal.provider?.restaurant || "Local Restaurant"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <CardContent className="pt-5 flex-1">
                            <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                {meal.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                                {meal.description}
                            </p>
                        </CardContent>

                        <CardFooter className="flex justify-between items-center pt-0 pb-5 px-5 mt-auto border-t border-gray-50">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 line-through font-medium">
                                    ৳{(meal.price * 1.2).toFixed(0)}
                                </span>
                                <span className="text-2xl font-bold text-orange-600">
                                    ৳{meal.price}
                                </span>
                            </div>
                            <Button
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 gap-1.5 font-semibold px-4 h-10"
                                onClick={(e) => handleAddToCart(e, meal.name)}
                            >
                                <Plus className="h-4 w-4" /> Add
                            </Button>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}