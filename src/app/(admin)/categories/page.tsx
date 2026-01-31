"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Trash2,
    Edit2,
    Loader2,
    UtensilsCrossed,
    X,
    Check
} from "lucide-react";
import { toast } from "sonner";

interface Category {
    id: string;
    name: string;
    _count?: {
        meals: number;
    };
}

export default function CategoriesManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState("");
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            const data = await res.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setAdding(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/category`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name: newCategory }),
                }
            );

            if (res.ok) {
                toast.success("Category added successfully");
                setNewCategory("");
                fetchCategories();
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to add category");
            }
        } catch (error) {
            toast.error("Failed to add category");
        } finally {
            setAdding(false);
        }
    };

    const updateCategory = async (id: string) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/category/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name: editName }),
                }
            );

            if (res.ok) {
                toast.success("Category updated successfully");
                setEditing(null);
                fetchCategories();
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to update category");
            }
        } catch (error) {
            toast.error("Failed to update category");
        }
    };

    const deleteCategory = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/categories/category/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.ok) {
                toast.success("Category deleted successfully");
                fetchCategories();
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to delete category");
            }
        } catch (error) {
            toast.error("Failed to delete category");
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Category Management</h1>
                <p className="text-gray-500 mt-1">Manage meal categories</p>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                        Categories
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Add New Category */}
                    <form onSubmit={addCategory} className="flex gap-3 mb-8">
                        <Input
                            placeholder="New category name..."
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="max-w-sm"
                        />
                        <Button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700"
                            disabled={adding}
                        >
                            {adding ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Category
                                </>
                            )}
                        </Button>
                    </form>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                                >
                                    {editing === category.id ? (
                                        <div className="flex items-center gap-2 flex-1">
                                            <Input
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="h-8"
                                                autoFocus
                                            />
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => updateCategory(category.id)}
                                            >
                                                <Check className="h-4 w-4 text-green-600" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setEditing(null)}
                                            >
                                                <X className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                    <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{category.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {category._count?.meals || 0} meals
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setEditing(category.id);
                                                        setEditName(category.name);
                                                    }}
                                                >
                                                    <Edit2 className="h-4 w-4 text-gray-400 hover:text-orange-600" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => deleteCategory(category.id)}
                                                    disabled={category._count && category._count.meals > 0}
                                                >
                                                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}