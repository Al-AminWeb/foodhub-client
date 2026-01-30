import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, MapPin, Clock, Utensils } from "lucide-react";
import Link from "next/link";

export default function MealDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white pb-20">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                {/* Back Button */}
                <Link href="/meals">
                    <Button variant="ghost" className="mb-6 gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-4 w-4" /> Back to Meals
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden relative">
                            <Badge className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-3 py-1">
                                Seafood
                            </Badge>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="text-orange-600 bg-orange-100">Best Seller</Badge>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    4.8 (120 reviews)
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Grilled Salmon
                            </h1>
                            <p className="text-gray-600 text-lg">
                                Fresh Atlantic salmon with herbs and lemon
                            </p>
                        </div>

                        {/* Restaurant Info */}
                        <Card className="p-4 border-none shadow-sm bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Utensils className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Ocean's Delight</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Downtown
                    </span>
                                        <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> 30-45 min
                    </span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between py-4 border-y border-gray-100">
                            <div>
                                <p className="text-sm text-gray-500 line-through">${(24.99 * 1.2).toFixed(2)}</p>
                                <p className="text-3xl font-bold text-orange-600">$24.99</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-bold text-xl w-8 text-center">1</span>
                                <Button variant="outline" size="icon" className="rounded-full">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <Button className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-xl shadow-orange-500/20 gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart - $24.99
                        </Button>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fresh Atlantic salmon grilled to perfection with our special blend of herbs and lemon butter.
                                Served with a side of seasonal vegetables and garlic mashed potatoes.
                                Prepared fresh upon order for the best taste and quality.
                            </p>
                        </div>

                        {/* Reviews Preview */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Customer Reviews</h3>
                            <div className="space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                        <div>
                                            <p className="font-semibold text-sm">John Doe</p>
                                            <div className="flex text-yellow-400 text-xs">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">Amazing taste! The salmon was perfectly cooked and seasoned.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}