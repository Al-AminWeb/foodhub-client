import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-32">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        500+ Local Restaurants
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
                        Delicious Meals <br className="hidden sm:block" />
                        <span className="text-primary">Delivered Fast</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Discover the best local restaurants, browse menus, and order your favorite meals with ease.
                        Cash on delivery available.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href="/meals">
                            <Button size="lg" className="gap-2 px-8">
                                <Search className="h-4 w-4" />
                                Browse Meals
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="gap-2 px-8">
                                Become a Provider
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 md:gap-16 mt-12 pt-8 border-t w-full max-w-2xl justify-center">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">500+</div>
                            <div className="text-sm text-muted-foreground">Restaurants</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">10k+</div>
                            <div className="text-sm text-muted-foreground">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold">30min</div>
                            <div className="text-sm text-muted-foreground">Avg. Delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </section>
    );
}