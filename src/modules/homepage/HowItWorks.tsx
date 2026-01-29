import { Search, ShoppingCart, Truck, Utensils, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = [
    {
        icon: Search,
        title: "Browse",
        description: "Explore thousands of meals from local restaurants and filter by cuisine, price, or dietary preferences.",
        color: "bg-blue-500",
        lightColor: "bg-blue-100 text-blue-600"
    },
    {
        icon: ShoppingCart,
        title: "Order",
        description: "Add your favorite meals to cart and proceed to checkout with Cash on Delivery option.",
        color: "bg-orange-500",
        lightColor: "bg-orange-100 text-orange-600"
    },
    {
        icon: Utensils,
        title: "Prepare",
        description: "Restaurant receives your order immediately and starts preparing your fresh meal.",
        color: "bg-green-500",
        lightColor: "bg-green-100 text-green-600"
    },
    {
        icon: Truck,
        title: "Deliver",
        description: "Track your order in real-time and enjoy your meal delivered hot and fresh.",
        color: "bg-purple-500",
        lightColor: "bg-purple-100 text-purple-600"
    },
];

export function HowItWorks() {
    return (
        <section className="py-20 md:py-28 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-50/30 to-white -z-10"></div>
            <div className="absolute top-20 right-0 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        How It <span className="text-orange-600">Works</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Get your favorite food delivered in 4 simple steps
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-purple-200 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={step.title} className="relative group">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 border border-gray-100 h-full flex flex-col items-center text-center group-hover:-translate-y-2">
                                {/* Step Number */}
                                <div className={`absolute -top-4 w-8 h-8 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className={`mb-6 p-5 rounded-2xl ${step.lightColor} group-hover:scale-110 transition-transform duration-300 mt-4`}>
                                    <step.icon className="h-8 w-8" />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-20 text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white shadow-2xl shadow-orange-500/20">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h3>
                    <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
                        Join thousands of satisfied customers and get your favorite meals delivered today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/meals">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-lg px-8 shadow-xl">
                                Order Now <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8">
                                Become a Provider
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}