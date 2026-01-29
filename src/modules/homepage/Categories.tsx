import { Card, CardContent } from "@/components/ui/card";
import { Pizza, Coffee, Utensils, Beef, Fish, Salad } from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Fast Food", icon: Pizza, count: "120+ items", color: "bg-red-100 text-red-600" },
    { name: "Fine Dining", icon: Utensils, count: "85+ items", color: "bg-purple-100 text-purple-600" },
    { name: "Healthy", icon: Salad, count: "95+ items", color: "bg-green-100 text-green-600" },
    { name: "Seafood", icon: Fish, count: "60+ items", color: "bg-blue-100 text-blue-600" },
    { name: "Beverages", icon: Coffee, count: "200+ items", color: "bg-yellow-100 text-yellow-600" },
    { name: "BBQ", icon: Beef, count: "45+ items", color: "bg-orange-100 text-orange-600" },
];

export function Categories() {
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        Browse by <span className="text-orange-600">Category</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find exactly what you're craving from our wide selection of cuisines
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <Link key={category.name} href={`/meals?category=${category.name.toLowerCase()}`}>
                            <Card className="group hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 border-none shadow-md cursor-pointer h-full hover:-translate-y-1">
                                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                                    <div className={`mb-4 p-4 rounded-2xl ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <category.icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 text-gray-800">{category.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{category.count}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}