import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";
import Link from "next/link";


const featuredMeals = [
    {
        id: "1",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon",
        price: 24.99,
        image: "/api/placeholder/300/200",
        category: "Seafood",
        rating: 4.8,
        restaurant: "Ocean's Delight",
    },
    {
        id: "2",
        name: "Beef Burger",
        description: "Premium beef patty with fresh vegetables",
        price: 16.99,
        image: "/api/placeholder/300/200",
        category: "Fast Food",
        rating: 4.6,
        restaurant: "Burger Palace",
    },
    {
        id: "3",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with parmesan and croutons",
        price: 12.99,
        image: "/api/placeholder/300/200",
        category: "Healthy",
        rating: 4.5,
        restaurant: "Green Garden",
    },
    {
        id: "4",
        name: "Pasta Carbonara",
        description: "Creamy Italian pasta with bacon and eggs",
        price: 18.99,
        image: "/api/placeholder/300/200",
        category: "Italian",
        rating: 4.7,
        restaurant: "Roma Restaurant",
    },
];

export function FeaturedMeals() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Meals</h2>
                        <p className="text-muted-foreground text-lg">
                            Hand-picked favorites from top-rated restaurants
                        </p>
                    </div>
                    <Link href="/meals">
                        <Button variant="outline">View All Meals</Button>
                    </Link>
                </div>

                {/* Meals Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredMeals.map((meal) => (
                        <Card key={meal.id} className="overflow-hidden group">
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] bg-muted">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <Badge className="absolute top-3 left-3" variant="secondary">
                                    {meal.category}
                                </Badge>
                            </div>

                            <CardContent className="pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg line-clamp-1">{meal.name}</h3>
                                    <div className="flex items-center gap-1 text-sm font-medium">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {meal.rating}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {meal.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    by {meal.restaurant}
                                </p>
                            </CardContent>

                            <CardFooter className="flex justify-between items-center pt-0">
                                <span className="text-xl font-bold">${meal.price}</span>
                                <Button size="sm" className="gap-1">
                                    <Plus className="h-4 w-4" />
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}