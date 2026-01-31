import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    UtensilsCrossed,
    Truck,
    Shield,
    Clock,
    Heart,
    Users,
    Leaf,
    ArrowRight,
    Star,
    Phone,
    Mail,
    MapPin
} from "lucide-react";
import Link from "next/link";

const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Partner Restaurants", value: "500+", icon: UtensilsCrossed },
    { label: "Meals Delivered", value: "50K+", icon: Truck },
    { label: "Cities Served", value: "25+", icon: MapPin },
];

const values = [
    {
        icon: Heart,
        title: "Made with Love",
        description: "Every meal is prepared with care and passion by our partner restaurants to bring joy to your table."
    },
    {
        icon: Shield,
        title: "Quality Assured",
        description: "We maintain strict quality standards. Only verified restaurants with high hygiene ratings join our platform."
    },
    {
        icon: Clock,
        title: "Fast Delivery",
        description: "Average delivery time of 30 minutes. Hot meals delivered fresh to your doorstep every time."
    },
    {
        icon: Leaf,
        title: "Sustainable",
        description: "Committed to eco-friendly packaging and supporting local businesses in our community."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="container mx-auto max-w-7xl px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <Badge className="bg-white/20 text-white border-white/30 mb-6">
                            About FoodHub
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Connecting Food Lovers with <span className="text-yellow-300">Local Flavors</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            We're on a mission to make delicious food accessible to everyone while supporting local restaurants and creating opportunities.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 mx-auto">
                                        <UtensilsCrossed className="h-16 w-16 text-orange-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800">Since 2024</p>
                                    <p className="text-gray-600 mt-2">Serving with love</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl"></div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Our story began with a simple <span className="text-orange-600">idea</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                FoodHub was born from a desire to bridge the gap between hungry customers and local restaurants. We noticed that many amazing local eateries struggled to reach customers, while food lovers craved authentic, home-style meals.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Today, we're proud to be Bangladesh's fastest-growing food delivery platform, connecting thousands of customers with their favorite local restaurants. From street food to fine dining, we bring the best of your city to your doorstep.
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/register">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 h-12">
                                        Join FoodHub <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/meals">
                                    <Button variant="outline" className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50 font-bold px-8 h-12">
                                        Explore Meals
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={index} className="border-none shadow-lg bg-gradient-to-br from-orange-50 to-white">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-orange-600">FoodHub</span>?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We're more than just a food delivery service. We're your partners in discovering great food.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                                    <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Icon className="h-7 w-7 text-orange-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* For Restaurants Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Are you a Restaurant Owner?
                                </h2>
                                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                    Join our network of partner restaurants and reach thousands of hungry customers. We provide the platform, you provide the amazing food. Together, let's grow your business.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Star className="h-3 w-3 text-white" />
                                        </div>
                                        <span>Increase your reach and revenue</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Star className="h-3 w-3 text-white" />
                                        </div>
                                        <span>Easy-to-use dashboard and analytics</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Star className="h-3 w-3 text-white" />
                                        </div>
                                        <span>Dedicated support team</span>
                                    </li>
                                </ul>
                                <Link href="/register">
                                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-bold">
                                        Become a Partner
                                    </Button>
                                </Link>
                            </div>
                            <div className="hidden lg:block">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                            <p className="text-3xl font-bold text-orange-400 mb-2">30%</p>
                                            <p className="text-sm text-gray-300">Average Revenue Increase</p>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                            <p className="text-3xl font-bold text-orange-400 mb-2">24/7</p>
                                            <p className="text-sm text-gray-300">Support Available</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                            <p className="text-3xl font-bold text-orange-400 mb-2">0</p>
                                            <p className="text-sm text-gray-300">Setup Fees</p>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                            <p className="text-3xl font-bold text-orange-400 mb-2">Fast</p>
                                            <p className="text-sm text-gray-300">Weekly Payouts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Have questions or suggestions? We'd love to hear from you. Reach out to our team anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="outline" className="gap-2 border-2 border-gray-200 h-12 px-6">
                                <Mail className="h-4 w-4" />
                                support@foodhub.com
                            </Button>
                            <Button variant="outline" className="gap-2 border-2 border-gray-200 h-12 px-6">
                                <Phone className="h-4 w-4" />
                                +880 1234-567890
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Order?
                    </h2>
                    <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and discover the best local food today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8">
                                Sign Up Now
                            </Button>
                        </Link>
                        <Link href="/meals">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8">
                                Browse Menu
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}