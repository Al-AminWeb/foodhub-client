import Link from "next/link";
import {UtensilsCrossed, Instagram, Twitter, Facebook, Mail} from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
                            <div className="p-1.5 bg-orange-500 rounded-lg">
                                <UtensilsCrossed className="h-5 w-5 text-white"/>
                            </div>
                            <span>FoodHub</span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Discover and order delicious meals from the best local restaurants. Fast delivery, amazing
                            taste.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                                <Instagram className="h-4 w-4"/>
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                                <Twitter className="h-4 w-4"/>
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                                <Facebook className="h-4 w-4"/>
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-600 transition-colors">
                                <Mail className="h-4 w-4"/>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link href="/meals" className="hover:text-white transition-colors">Browse All
                                    Meals</Link>
                            </li>
                            <li>
                                <Link href="/providers" className="hover:text-white transition-colors">Top
                                    Restaurants</Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-white transition-colors">Become a
                                    Provider</Link>
                            </li>
                            <li>
                                <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-orange-400">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>
                                <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy
                                    Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms of
                                    Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-orange-400">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>📍 123 Food Street, Cuisine City</li>
                            <li>📞 +1 (555) 123-4567</li>
                            <li>✉️ support@foodhub.com</li>
                            <li>🕒 Mon-Sun: 8AM - 11PM</li>
                        </ul>
                    </div>
                </div>

                <div
                    className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} FoodHub. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}