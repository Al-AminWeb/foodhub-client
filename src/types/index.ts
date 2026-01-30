// Enums (match backend)
export type Role = 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
export type OrderStatus = 'PLACED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';

// User
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    providerProfile?: ProviderProfile;
}

// Provider Profile
export interface ProviderProfile {
    id: string;
    userId: string;
    restaurant: string;
    address: string | null;
    phone: string | null;
    user?: User;
    meals?: Meal[];
}

// Category
export interface Category {
    id: string;
    name: string;
    meals?: Meal[];
}

// Meal (from your JSON)
export interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    providerId: string;
    categoryId: string;
    provider?: ProviderProfile;
    category?: Category;
    reviews?: Review[];
}

// Review
export interface Review {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    mealId: string;
    user?: User;
    meal?: Meal;
}

// Order
export interface Order {
    id: string;
    userId: string;
    status: OrderStatus;
    total: number;
    address: string;
    createdAt: string;
    user?: User;
    items?: OrderItem[];
}

// Order Item
export interface OrderItem {
    id: string;
    orderId: string;
    mealId: string;
    qty: number;
    price: string;
    order?: Order;
    meal?: Meal;
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}