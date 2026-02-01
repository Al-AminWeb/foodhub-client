"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface CartItem {
    mealId: string;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
    providerId: string;
    providerName: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (meal: Omit<CartItem, "quantity">) => void;
    removeFromCart: (mealId: string) => void;
    updateQuantity: (mealId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("foodhub-cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("foodhub-cart", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (meal: Omit<CartItem, "quantity">) => {
        setItems((current) => {
            const existing = current.find((item) => item.mealId === meal.mealId);
            if (existing) {
                toast.info(`${meal.name} already in cart. Quantity added!`);
                return current.map((item) =>
                    item.mealId === meal.mealId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            toast.success(`${meal.name} added to cart!`);
            return [...current, { ...meal, quantity: 1 }];
        });
    };

    const removeFromCart = (mealId: string) => {
        setItems((current) => {
            const item = current.find((i) => i.mealId === mealId);
            if (item) {
                toast.info(`${item.name} removed from cart`);
            }
            return current.filter((item) => item.mealId !== mealId);
        });
    };

    const updateQuantity = (mealId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(mealId);
            return;
        }
        setItems((current) =>
            current.map((item) =>
                item.mealId === mealId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("foodhub-cart");
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}