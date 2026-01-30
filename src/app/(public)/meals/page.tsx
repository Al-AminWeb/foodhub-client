import {MealFilters} from "@/modules/meals/MealFilters";
import {MealGrid} from "@/modules/meals/MealGrid";


export default function MealsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            {/* Header Section */}
            <div className="bg-white border-b pt-8 pb-6">
                <div className="container mx-auto max-w-7xl px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Browse <span className="text-orange-600">Meals</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover delicious meals from local restaurants
                    </p>
                </div>
            </div>

            {/* Filters & Grid */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <MealFilters />
                <MealGrid />
            </div>
        </div>
    );
}