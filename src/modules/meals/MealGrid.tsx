"use client";

import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Star, Plus, MapPin} from "lucide-react";
import Link from "next/link";

// Extended dummy data for browse page
const meals = [
    {
        id: "1",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon",
        price: 24.99,
        category: "Seafood",
        rating: 4.8,
        restaurant: "Ocean's Delight",
        location: "Downtown",
        color: "bg-blue-500"
    },
    {
        id: "2",
        name: "Beef Burger",
        description: "Premium beef patty with fresh vegetables",
        price: 16.99,
        category: "Fast Food",
        rating: 4.6,
        restaurant: "Burger Palace",
        location: "Westside",
        color: "bg-red-500"
    },
    {
        id: "3",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with parmesan and croutons",
        price: 12.99,
        category: "Healthy",
        rating: 4.5,
        restaurant: "Green Garden",
        location: "Uptown",
        color: "bg-green-500"
    },
    {
        id: "4",
        name: "Pasta Carbonara",
        description: "Creamy Italian pasta with bacon and eggs",
        price: 18.99,
        category: "Italian",
        rating: 4.7,
        restaurant: "Roma Restaurant",
        location: "Midtown",
        color: "bg-yellow-500"
    },
    {
        id: "5",
        name: "Sushi Platter",
        description: "Assorted fresh sushi and sashimi",
        price: 32.99,
        category: "Asian",
        rating: 4.9,
        restaurant: "Tokyo Kitchen",
        location: "Downtown",
        color: "bg-purple-500"
    },
    {
        id: "6",
        name: "BBQ Ribs",
        description: "Slow-cooked ribs with signature BBQ sauce",
        price: 28.99,
        category: "BBQ",
        rating: 4.7,
        restaurant: "Smoke House",
        location: "Westside",
        color: "bg-orange-500"
    },
    {
        id: "7",
        name: "Chicken Tikka",
        description: "Marinated chicken with Indian spices",
        price: 19.99,
        category: "Asian",
        rating: 4.6,
        restaurant: "Curry House",
        location: "Eastside",
        color: "bg-amber-500"
    },
    {
        id: "8",
        name: "Greek Salad",
        description: "Fresh vegetables with feta cheese and olives",
        price: 14.99,
        category: "Healthy",
        rating: 4.4,
        restaurant: "Mediterranean Grill",
        location: "Uptown",
        color: "bg-teal-500"
    },
    {
        id: "9",
        name: "Fish and Chips",
        description: "Crispy battered fish with french fries",
        price: 15.99,
        category: "Seafood",
        rating: 4.5,
        restaurant: "London Fish",
        location: "Downtown",
        color: "bg-blue-500"
    },
    {
        id: "10",
        name: "Steak Frites",
        description: "Grilled steak with herb butter and fries",
        price: 29.99,
        category: "Fine Dining",
        rating: 4.8,
        restaurant: "Bistro 52",
        location: "Midtown",
        color: "bg-rose-500"
    },
    {
        id: "11",
        name: "Vegan Bowl",
        description: "Quinoa, avocado, chickpeas and tahini dressing",
        price: 16.99,
        category: "Healthy",
        rating: 4.7,
        restaurant: "Plant Power",
        location: "Eastside",
        color: "bg-emerald-500"
    },
    {
        id: "12",
        name: "Margherita Pizza",
        description: "Classic tomato, mozzarella and basil",
        price: 14.99,
        category: "Italian",
        rating: 4.6,
        restaurant: "Napoli Pizza",
        location: "Westside",
        color: "bg-red-500"
    },
];

export function MealGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {meals.map((meal) => (
                <Link href={`/meals/${meal.id}`} key={meal.id}>
                    <Card
                        className="overflow-hidden group cursor-pointer border-none shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 bg-white h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <div
                                className={`absolute inset-0 ${meal.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            <Badge
                                className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white font-semibold shadow-md">
                                {meal.category}
                            </Badge>

                            {/* Rating Badge */}
                            <div
                                className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full shadow-md">
                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"/>
                                <span className="text-xs font-bold text-gray-800">{meal.rating}</span>
                            </div>

                            {/* Location Badge */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs">
                                <MapPin className="h-3 w-3"/>
                                {meal.location}
                            </div>
                        </div>

                        <CardContent className="pt-4 flex-1">
                            <h3 className="font-bold text-lg mb-1 text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                                {meal.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                                {meal.description}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                by <span className="font-medium text-orange-600">{meal.restaurant}</span>
                            </p>
                        </CardContent>

                        <CardFooter className="flex justify-between items-center pt-0 pb-4 px-4 mt-auto">
                            <div className="flex flex-col">
                                <span
                                    className="text-xs text-gray-400 line-through">${(meal.price * 1.2).toFixed(2)}</span>
                                <span className="text-xl font-bold text-orange-600">${meal.price}</span>
                            </div>
                            <Button
                                size="sm"
                                className="bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/20 gap-1"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent navigation when clicking add to cart
                                    // Add to cart logic here
                                }}
                            >
                                <Plus className="h-4 w-4"/> Add
                            </Button>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}