"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";

const categories = [
    "All",
    "Fast Food",
    "Fine Dining",
    "Healthy",
    "Seafood",
    "Beverages",
    "BBQ",
    "Italian",
    "Asian",
    "Desserts"
];

const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating: High to Low", value: "rating" },
    { label: "Newest", value: "newest" }
];

export function MealFilters() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sortBy, setSortBy] = useState("featured");

    const clearFilters = () => {
        setSelectedCategory("All");
        setSearchQuery("");
        setPriceRange({ min: "", max: "" });
        setSortBy("featured");
    };

    const hasActiveFilters = selectedCategory !== "All" || searchQuery || priceRange.min || priceRange.max;

    return (
        <div className="space-y-6 mb-8">
            {/* Search and Top Row */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search meals, cuisines, restaurants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="md:hidden gap-2"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="h-12 px-4 rounded-md border border-gray-200 bg-white text-sm focus:border-orange-500 focus:ring-orange-500 w-full md:w-auto"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                Sort by: {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Category Pills - Desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                            selectedCategory === category
                                ? "bg-orange-600 text-white shadow-md shadow-orange-500/20"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
                <div className="md:hidden bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                    selectedCategory === category
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Price Range & Active Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Price Range:</span>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                            className="w-24 h-9 text-sm"
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                            className="w-24 h-9 text-sm"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Clear Filters
                        </Button>
                    )}
                    <span className="text-sm text-gray-500">Showing <span className="font-bold text-gray-900">24</span> meals</span>
                </div>
            </div>
        </div>
    );
}