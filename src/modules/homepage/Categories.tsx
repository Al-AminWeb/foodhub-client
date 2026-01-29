import { Card, CardContent } from "@/components/ui/card";
import { Pizza, Coffee, Utensils, Beef, Fish, Salad } from "lucide-react";
import Link from "next/link";

const categories = [
    {
        name: "Fast Food",
        icon: Pizza,
        count: "120+ items",
        href: "/meals?category=fast-food",
    },
    {
        name: "Fine Dining",
        icon: Utensils,
        count: "85+ items",
        href: "/meals?category=fine-dining",
    },
    {
        name: "Healthy",
        icon: Salad,
        count: "95+ items",
        href: "/meals?category=healthy",
    },
    {
        name: "Seafood",
        icon: Fish,
        count: "60+ items",
        href: "/meals?category=seafood",
    },
    {
        name: "Beverages",
        icon: Coffee,
        count: "200+ items",
        href: "/meals?category=beverages",
    },
    {
        name: "BBQ",
        icon: Beef,
        count: "45+ items",
        href: "/meals?category=bbq",
    },
];

export function Categories() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Find exactly what you're craving from our wide selection of cuisines
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link key={category.name} href={category.href}>
                            <Card className="group hover:border-primary transition-colors cursor-pointer h-full">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <category.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-1">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">{category.count}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}