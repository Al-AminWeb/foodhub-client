"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, MapPin, Clock, Utensils, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
    };
    createdAt?: string;
}

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    provider: {
        restaurant: string;
        address: string | null;
        phone: string | null;
    };
    category: {
        name: string;
    };
    reviews: Review[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop";

export default function MealDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [meal, setMeal] = useState<Meal | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasOrdered, setHasOrdered] = useState(false);
    const [userReview, setUserReview] = useState<Review | null>(null);

    // Review form state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);

        fetchMeal();
        if (token) {
            checkIfCanReview();
        }
    }, [params.id]);

    const fetchMeal = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/meals/${params.id}`
            );
            const data = await res.json();

            if (data.success) {
                setMeal(data.data);
            } else {
                toast.error("Meal not found");
            }
        } catch (error) {
            toast.error("Failed to fetch meal details");
        } finally {
            setLoading(false);
        }
    };

    const checkIfCanReview = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Check if user has any delivered orders with this meal
            const ordersRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/orders/me`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (ordersRes.ok) {
                const ordersData = await ordersRes.json();
                if (ordersData.success && ordersData.data) {
                    // Check if any delivered order contains this meal
                    const hasDeliveredOrder = ordersData.data.some((order: any) =>
                        order.status === "DELIVERED" &&
                        order.items?.some((item: any) => item.meal?.id === params.id || item.mealId === params.id)
                    );
                    setHasOrdered(hasDeliveredOrder);
                }
            }

            // Check if user already reviewed this meal
            const reviewsRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${params.id}`
            );

            if (reviewsRes.ok) {
                const reviewsData = await reviewsRes.json();
                if (reviewsData.success && reviewsData.data) {
                    // Try to find if current user already reviewed
                    const token = localStorage.getItem("token");
                    if (token) {
                        try {
                            const userRes = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                                { headers: { Authorization: `Bearer ${token}` } }
                            );
                            if (userRes.ok) {
                                const userData = await userRes.json();
                                if (userData.success) {
                                    const existingReview = reviewsData.data.find(
                                        (r: Review) => r.user.name === userData.data.name
                                    );
                                    if (existingReview) {
                                        setUserReview(existingReview);
                                    }
                                }
                            }
                        } catch (e) {
                            console.error("Failed to check existing review");
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Failed to check review eligibility", error);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write a comment");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to submit a review");
            router.push("/login");
            return;
        }

        setSubmittingReview(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        mealId: params.id,
                        rating: rating,
                        comment: comment.trim()
                    })
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success("Review submitted successfully!");
                setUserReview(data.data);
                setRating(0);
                setComment("");
                // Refresh meal data to show new review
                fetchMeal();
            } else {
                toast.error(data.message || "Failed to submit review");
            }
        } catch (error) {
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setSubmittingReview(false);
        }
    };

    const calculateAverageRating = () => {
        if (!meal?.reviews?.length) return 0;
        const sum = meal.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / meal.reviews.length).toFixed(1);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-orange-600" />
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50/30 to-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal not found</h2>
                    <Link href="/meals">
                        <Button className="bg-orange-600 hover:bg-orange-700 mt-4">
                            Browse All Meals
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

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
                            <Image
                                src={meal.image || FALLBACK_IMAGE}
                                alt={meal.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            <Badge className="absolute top-4 left-4 bg-orange-600 text-white text-sm px-3 py-1">
                                {meal.category.name}
                            </Badge>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {meal.reviews.length > 0 && (
                                    <div className="flex items-center gap-1 text-sm font-medium">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{calculateAverageRating()}</span>
                                        <span className="text-gray-500">({meal.reviews.length} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {meal.name}
                            </h1>
                            <p className="text-gray-600 text-lg">
                                {meal.description}
                            </p>
                        </div>

                        {/* Restaurant Info */}
                        <Card className="p-4 border-none shadow-sm bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Utensils className="h-6 w-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{meal.provider.restaurant}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        {meal.provider.address && (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {meal.provider.address}
                                            </span>
                                        )}
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
                                <p className="text-sm text-gray-500 line-through">৳{(meal.price * 1.2).toFixed(0)}</p>
                                <p className="text-3xl font-bold text-orange-600">৳{meal.price}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full"
                                    onClick={() => handleQuantityChange(1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <Button
                            className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-xl shadow-orange-500/20 gap-2"
                            onClick={() => {
                                console.log("Add to cart:", meal.name, "Quantity:", quantity);
                                toast.success(`Added ${quantity}x ${meal.name} to cart`);
                            }}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart - ৳{meal.price * quantity}
                        </Button>

                        {/* Description */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {meal.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - Full Width */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Review Form */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24">
                                <h3 className="font-bold text-lg mb-4">Write a Review</h3>

                                {!isAuthenticated ? (
                                    <div className="text-center py-6">
                                        <p className="text-gray-600 mb-4">Please login to write a review</p>
                                        <Button
                                            className="w-full bg-orange-600 hover:bg-orange-700"
                                            onClick={() => router.push("/login")}
                                        >
                                            Login to Review
                                        </Button>
                                    </div>
                                ) : userReview ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                        <p className="text-green-800 font-medium mb-2">✓ You already reviewed this meal</p>
                                        <p className="text-sm text-green-600">Thank you for your feedback!</p>
                                    </div>
                                ) : !hasOrdered ? (
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                                        <p className="text-yellow-800 text-sm">
                                            You can only review meals you have ordered and received.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmitReview} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Rating
                                            </label>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        <Star
                                                            className={`h-8 w-8 ${
                                                                star <= (hoverRating || rating)
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-gray-300"
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {rating > 0 ? `${rating} out of 5 stars` : "Click to rate"}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Review
                                            </label>
                                            <Textarea
                                                placeholder="Share your experience with this meal..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="min-h-[120px] resize-none"
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-orange-600 hover:bg-orange-700 gap-2"
                                            disabled={submittingReview || rating === 0}
                                        >
                                            {submittingReview ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Submit Review
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-2 space-y-4">
                            {meal.reviews.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No reviews yet</h3>
                                    <p className="text-gray-500">Be the first to review this meal!</p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {meal.reviews.map((review) => (
                                        <Card key={review.id} className="p-6 border-none shadow-sm">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <span className="text-orange-600 font-bold">
                                                            {review.user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{review.user.name}</p>
                                                        <div className="flex text-yellow-400 text-sm">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${
                                                                        i < review.rating ? "fill-current" : "text-gray-300"
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                {review.createdAt && (
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-4 text-gray-600 leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}