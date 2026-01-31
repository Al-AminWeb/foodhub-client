"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Edit2,
    Trash2,
    MoreVertical,
    Loader2,
    Image as ImageIcon,
    UtensilsCrossed
} from "lucide-react";
import { toast } from "sonner";

interface Meal {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string | null;
    categoryId: string;
    category?: {
        name: string;
    };
}

interface Category {
    id: string;
    name: string;
}

export default function MenuManagement() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        categoryId: "",
    });

    useEffect(() => {
        fetchMenuData();
        fetchCategories();
    }, []);

    const fetchMenuData = async () => {
        try {
            const token = localStorage.getItem("token");


            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await res.json();

            if (data.success) {
                setMeals(data.data || []);
            } else {
                toast.error("Failed to fetch meals");
            }
        } catch (error) {
            toast.error("Failed to fetch menu");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/all-category`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            if (data.success) {
                setCategories(data.data);
                if (data.data.length > 0 && !formData.categoryId) {
                    setFormData(prev => ({ ...prev, categoryId: data.data[0].id }));
                }
            }
        } catch (error) {
            console.error("Failed to fetch categories");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            const url = editingMeal
                ? `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals/${editingMeal.id}`
                : `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals`;

            const method = editingMeal ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseInt(formData.price),
                    description: formData.description,
                    image: formData.image || null,
                    categoryId: formData.categoryId,
                }),
            });

            if (res.ok) {
                toast.success(editingMeal ? "Meal updated successfully" : "Meal added successfully");
                resetForm();
                fetchMenuData();
                setIsAddDialogOpen(false);
                setEditingMeal(null);
            } else {
                const error = await res.json();
                toast.error(error.message || "Failed to save meal");
            }
        } catch (error) {
            toast.error("Failed to save meal");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (mealId: string) => {
        if (!confirm("Are you sure you want to delete this meal?")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/provider/meals/${mealId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (res.ok) {
                toast.success("Meal deleted successfully");
                fetchMenuData();
            } else {
                toast.error("Failed to delete meal");
            }
        } catch (error) {
            toast.error("Failed to delete meal");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            description: "",
            image: "",
            categoryId: categories[0]?.id || "",
        });
    };

    const openEditDialog = (meal: Meal) => {
        setEditingMeal(meal);
        setFormData({
            name: meal.name,
            price: meal.price.toString(),
            description: meal.description || "",
            image: meal.image || "",
            categoryId: meal.categoryId,
        });
        setIsAddDialogOpen(true);
    };

    const openAddDialog = () => {
        setEditingMeal(null);
        resetForm();
        setIsAddDialogOpen(true);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
                    <p className="text-gray-500 mt-1">Add, edit, or remove menu items</p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-600 hover:bg-orange-700 gap-2" onClick={openAddDialog}>
                            <Plus className="h-4 w-4" />
                            Add New Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>{editingMeal ? "Edit Meal" : "Add New Meal"}</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to {editingMeal ? "update" : "add"} a menu item.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Meal Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., Chicken Biryani"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price (৳)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="250"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <select
                                            id="category"
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
                                            required
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input
                                        id="image"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your meal..."
                                        className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>

                                <Button type="submit"  disabled={isSubmitting || !formData.categoryId}  className="bg-orange-600 hover:bg-orange-700" >
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> :
                                        editingMeal ? "Update Meal" : "Add Meal"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Menu Grid */}
            {meals.length === 0 ? (
                <Card className="border-none shadow-md">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                            <UtensilsCrossed className="h-8 w-8 text-orange-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No menu items yet</h3>
                        <p className="text-gray-500 mb-4">Start building your menu by adding your first dish</p>
                        <Button onClick={openAddDialog} className="bg-orange-600 hover:bg-orange-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Add First Item
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meals.map((meal) => (
                        <Card key={meal.id} className="border-none shadow-md overflow-hidden group">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                {meal.image ? (
                                    <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="h-12 w-12 text-gray-300" />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openEditDialog(meal)}>
                                                <Edit2 className="h-4 w-4 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(meal.id)}
                                                className="text-red-600 focus:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{meal.name}</h3>
                                        <p className="text-sm text-orange-600 font-medium">{meal.category?.name}</p>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">৳{meal.price}</p>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2">{meal.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}