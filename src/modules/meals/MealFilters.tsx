"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X, Filter } from "lucide-react";

interface Filters {
    search: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
}

interface MealFiltersProps {
    filters: Filters;
    setFilters: (filters: Filters) => void;
}

type Category = {
    id: string;
    name: string;
};

export function MealFilters({ filters, setFilters }: MealFiltersProps) {
    const [categories, setCategories] = useState<Category[]>([{ id: "all", name: "All" }]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Fetch categories from backend
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/all-category`);
                const data = await res.json();
                if (data.success) {
                    setCategories([{ id: "all", name: "All" }, ...data.data]);
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        };

        loadCategories();
    }, []);

    const handleSearchChange = (value: string) => {
        setFilters({ ...filters, search: value });
    };

    const handleCategoryChange = (categoryName: string) => {
        setFilters({ ...filters, category: categoryName });
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        setFilters({
            ...filters,
            [type === 'min' ? 'minPrice' : 'maxPrice']: value
        });
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            category: "All",
            minPrice: "",
            maxPrice: "",
            sortBy: "featured",
        });
    };

    const hasActiveFilters = filters.category !== "All" ||
        filters.search ||
        filters.minPrice ||
        filters.maxPrice;

    return (
        <div className="space-y-6">
            {/* Search and Top Row */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Search meals, cuisines..."
                        value={filters.search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 h-12 border-2 border-gray-100 focus:border-orange-500 focus:ring-orange-500 bg-gray-50 focus:bg-white transition-all"
                    />
                    {filters.search && (
                        <button
                            onClick={() => handleSearchChange("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="md:hidden gap-2 border-2 border-gray-200"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {hasActiveFilters && (
                            <Badge className="ml-1 bg-orange-600 text-white text-xs">
                                !
                            </Badge>
                        )}
                    </Button>

                    <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="h-12 px-4 rounded-lg border-2 border-gray-100 bg-white text-sm focus:border-orange-500 focus:ring-orange-500 outline-none cursor-pointer hover:border-orange-200 transition-colors"
                    >
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="hidden md:flex text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                            <X className="h-4 w-4 mr-1" /> Clear
                        </Button>
                    )}
                </div>
            </div>

            {/* Category Pills - Desktop */}
            <div className="hidden md:flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.name)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                            filters.category === category.name
                                ? "bg-orange-600 text-white shadow-lg shadow-orange-500/30 scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
                <div className="md:hidden bg-orange-50 p-4 rounded-xl border-2 border-orange-100 space-y-4">
                    <p className="font-semibold text-gray-900 mb-2">Categories</p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.name)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                    filters.category === category.name
                                        ? "bg-orange-600 text-white"
                                        : "bg-white text-gray-600 border border-gray-200"
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <div className="pt-2 border-t border-orange-200">
                        <p className="font-semibold text-gray-900 mb-2">Price Range (৳)</p>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={filters.minPrice}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                                className="w-full bg-white border-orange-200 focus:border-orange-500"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                                type="number"
                                placeholder="Max"
                                value={filters.maxPrice}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                                className="w-full bg-white border-orange-200 focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Price Range & Active Filters - Desktop */}
            <div className="hidden md:flex items-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Price Range (৳):</span>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => handlePriceChange('min', e.target.value)}
                            className="w-24 h-10 border-2 border-gray-100 focus:border-orange-500"
                        />
                        <span className="text-gray-400">-</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => handlePriceChange('max', e.target.value)}
                            className="w-24 h-10 border-2 border-gray-100 focus:border-orange-500"
                        />
                    </div>
                </div>

                {hasActiveFilters && (
                    <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm text-gray-500">Active filters:</span>
                        <div className="flex gap-2">
                            {filters.category !== "All" && (
                                <Badge
                                    variant="secondary"
                                    className="bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
                                    onClick={() => handleCategoryChange("All")}
                                >
                                    {filters.category} <X className="h-3 w-3 ml-1" />
                                </Badge>
                            )}
                            {(filters.minPrice || filters.maxPrice) && (
                                <Badge
                                    variant="secondary"
                                    className="bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer"
                                    onClick={() => {
                                        setFilters({ ...filters, minPrice: "", maxPrice: "" });
                                    }}
                                >
                                    ৳{filters.minPrice || "0"} - ৳{filters.maxPrice || "∞"} <X className="h-3 w-3 ml-1" />
                                </Badge>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}