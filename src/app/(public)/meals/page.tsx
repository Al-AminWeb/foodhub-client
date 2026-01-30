"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import {MealFilters} from "@/modules/meals/MealFilters";
import {MealGrid} from "@/modules/meals/MealGrid";

export default function MealsPage() {
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        category: "All",
        minPrice: "",
        maxPrice: "",
        sortBy: "featured",
    });

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            const params = new URLSearchParams();

            if (filters.search) params.append("search", filters.search);
            if (filters.category !== "All") params.append("category", filters.category);
            if (filters.minPrice) params.append("minPrice", filters.minPrice);
            if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

            // Note: Your backend doesn't have sortBy param yet, but keeping for future
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/meals?${params.toString()}`,
                { cache: "no-store" }
            );

            const json = await res.json();
            setMeals(json.data || []);
            setLoading(false);
        };

        fetchMeals();
    }, [filters]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            {/* Orange Header Section */}
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white pt-12 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
                        Browse <span className="text-yellow-300">Meals</span>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl text-center max-w-2xl mx-auto">
                        Discover delicious meals from top local restaurants near you
                    </p>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V60Z" fill="white"/>
                    </svg>
                </div>
            </div>

            {/* Filters & Grid */}
            <div className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <MealFilters filters={filters} setFilters={setFilters} />
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="h-12 w-12 text-orange-600 animate-spin mb-4" />
                        <p className="text-gray-500">Loading delicious meals...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                Showing <span className="font-bold text-gray-900">{meals.length}</span> delicious meals
                            </p>
                        </div>
                        <MealGrid meals={meals} />
                    </>
                )}
            </div>
        </div>
    );
}