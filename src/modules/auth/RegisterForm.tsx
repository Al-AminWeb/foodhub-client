"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, UtensilsCrossed, User, Store, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"CUSTOMER" | "PROVIDER">("CUSTOMER");
    const [isLoading, setIsLoading] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Provider specific
    const [restaurant, setRestaurant] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                name,
                email,
                password,
                role,
                ...(role === "PROVIDER" && { restaurant, address, phone })
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message || "Registration failed");
                return;
            }

            toast.success("Account created successfully! Please login.");
            router.push("/login");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        setStep(2);
    };

    return (
        <Card className="w-full max-w-lg border-none shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-2">
                    <UtensilsCrossed className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">Create Account</CardTitle>
                <CardDescription className="text-gray-600">
                    Join FoodHub to order delicious meals or start selling
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {step === 1 ? (
                        <>
                            {/* Role Selection */}
                            <div className="space-y-3">
                                <Label className="text-gray-700 font-semibold">I want to</Label>
                                <RadioGroup
                                    value={role}
                                    onValueChange={(v) => setRole(v as "CUSTOMER" | "PROVIDER")}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className={`flex items-center space-x-2 border-2 rounded-xl p-4 cursor-pointer transition-all ${role === "CUSTOMER" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                                        <RadioGroupItem value="CUSTOMER" id="customer" className="sr-only" />
                                        <Label htmlFor="customer" className="flex flex-col items-center gap-2 cursor-pointer w-full">
                                            <User className={`h-8 w-8 ${role === "CUSTOMER" ? "text-orange-600" : "text-gray-400"}`} />
                                            <div className="text-center">
                                                <div className="font-bold text-gray-900">Order Food</div>
                                                <div className="text-xs text-gray-500">I am a customer</div>
                                            </div>
                                        </Label>
                                    </div>

                                    <div className={`flex items-center space-x-2 border-2 rounded-xl p-4 cursor-pointer transition-all ${role === "PROVIDER" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}>
                                        <RadioGroupItem value="PROVIDER" id="provider" className="sr-only" />
                                        <Label htmlFor="provider" className="flex flex-col items-center gap-2 cursor-pointer w-full">
                                            <Store className={`h-8 w-8 ${role === "PROVIDER" ? "text-orange-600" : "text-gray-400"}`} />
                                            <div className="text-center">
                                                <div className="font-bold text-gray-900">Sell Food</div>
                                                <div className="text-xs text-gray-500">I am a restaurant</div>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500 pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>

                            <Button
                                type="button"
                                onClick={nextStep}
                                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-500/30"
                            >
                                Continue <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setStep(1)}
                                className="mb-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>

                            {role === "PROVIDER" && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 mb-4">
                                        <h4 className="font-bold text-orange-800 mb-1">Restaurant Information</h4>
                                        <p className="text-sm text-orange-700">Please provide your restaurant details</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="restaurant" className="text-gray-700 font-semibold">Restaurant Name</Label>
                                        <Input
                                            id="restaurant"
                                            placeholder="Burger Palace"
                                            value={restaurant}
                                            onChange={(e) => setRestaurant(e.target.value)}
                                            required={role === "PROVIDER"}
                                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="text-gray-700 font-semibold">Address</Label>
                                        <Input
                                            id="address"
                                            placeholder="123 Main St, City"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+1 (555) 123-4567"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {role === "CUSTOMER" && (
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
                                    <User className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                                    <h4 className="font-bold text-blue-800 mb-1">Ready to Order!</h4>
                                    <p className="text-sm text-blue-700">Click Create Account to start ordering delicious meals</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg shadow-lg shadow-orange-500/30"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </>
                    )}
                </CardContent>

                {step === 1 && (
                    <CardFooter className="flex flex-col gap-4">
                        <p className="text-center text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-orange-600 hover:text-orange-700 font-bold">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>
                )}
            </form>
        </Card>
    );
}