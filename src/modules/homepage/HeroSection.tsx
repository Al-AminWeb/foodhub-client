import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-20 md:py-32">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="container mx-auto max-w-7xl px-4 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1.5 text-sm font-medium">
                        <span className="flex h-2 w-2 rounded-full bg-yellow-300 mr-2 animate-pulse"></span>
                        🔥 500+ Local Restaurants
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-tight">
                        Delicious Meals <br className="hidden sm:block" />
                        <span className="text-yellow-300">Delivered Fast</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium">
                        Discover the best local restaurants, browse menus, and order your favorite meals with ease.
                        <span className="text-yellow-300 font-bold"> Cash on delivery available.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link href="/meals">
                            <Button size="lg" className="gap-2 px-8 bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg shadow-2xl shadow-black/20">
                                <Search className="h-5 w-5" />
                                Browse Meals
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="gap-2 px-8 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-lg">
                                Become a Provider
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 pt-8 border-t border-white/20 w-full max-w-3xl">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-yellow-300">500+</div>
                            <div className="text-white/80 text-sm mt-1">Restaurants</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-yellow-300">10k+</div>
                            <div className="text-white/80 text-sm mt-1">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-yellow-300">30min</div>
                            <div className="text-white/80 text-sm mt-1">Avg. Delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave divider */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-1">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
                </svg>
            </div>
        </section>
    );
}