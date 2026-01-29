import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Plus, Flame } from "lucide-react";
import Link from "next/link";

const featuredMeals = [
    { id: "1", name: "Grilled Salmon", description: "Fresh Atlantic salmon with herbs and lemon", price: 24.99, category: "Seafood", rating: 4.8, restaurant: "Ocean's Delight", color: "bg-blue-500" },
    { id: "2", name: "Beef Burger", description: "Premium beef patty with fresh vegetables", price: 16.99, category: "Fast Food", rating: 4.6, restaurant: "Burger Palace", color: "bg-red-500" },
    { id: "3", name: "Caesar Salad", description: "Fresh romaine lettuce with parmesan and croutons", price: 12.99, category: "Healthy", rating: 4.5, restaurant: "Green Garden", color: "bg-green-500" },
    { id: "4", name: "Pasta Carbonara", description: "Creamy Italian pasta with bacon and eggs", price: 18.99, category: "Italian", rating: 4.7, restaurant: "Roma Restaurant", color: "bg-yellow-500" },
];

export function FeaturedMeals() {
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
                    {featuredMeals.map((meal) => (
                        <Card key={meal.id} className="overflow-hidden group border-none shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 bg-white">
                            {/* Image Container with Gradient */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <div className={`absolute inset-0 ${meal.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800 hover:bg-white font-semibold shadow-md">
                                    {meal.category}
                                </Badge>

                                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full shadow-md">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-gray-800">{meal.rating}</span>
                                </div>
                            </div>

                            <CardContent className="pt-6">
                                <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">{meal.name}</h3>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">{meal.description}</p>
                                <p className="text-sm font-medium text-gray-400 flex items-center gap-1">
                                    by <span className="text-orange-600">{meal.restaurant}</span>
                                </p>
                            </CardContent>

                            <CardFooter className="flex justify-between items-center pt-0 pb-6 px-6">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 line-through">${(meal.price * 1.2).toFixed(2)}</span>
                                    <span className="text-2xl font-bold text-orange-600">${meal.price}</span>
                                </div>
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 gap-1 font-semibold">
                                    <Plus className="h-4 w-4" /> Add
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}