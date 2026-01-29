
import { Search, ShoppingCart, Truck, Utensils } from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";

const steps = [
    {
        icon: Search,
        title: "Browse",
        description: "Explore thousands of meals from local restaurants and filter by cuisine, price, or dietary preferences.",
    },
    {
        icon: ShoppingCart,
        title: "Order",
        description: "Add your favorite meals to cart and proceed to checkout with Cash on Delivery option.",
    },
    {
        icon: Utensils,
        title: "Prepare",
        description: "Restaurant receives your order immediately and starts preparing your fresh meal.",
    },
    {
        icon: Truck,
        title: "Deliver",
        description: "Track your order in real-time and enjoy your meal delivered hot and fresh.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Get your favorite food delivered in 4 simple steps
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <Card key={step.title} className="relative border-none shadow-none bg-transparent">
                            <CardContent className="flex flex-col items-center text-center pt-6">
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="mb-6 p-4 rounded-full bg-primary/10">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
                    <p className="text-muted-foreground mb-6">
                        Join thousands of satisfied customers today
                    </p>
                    <a href="/meals">
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 rounded-md font-medium">
                            Get Started Now
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}