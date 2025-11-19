import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Dialog from "../components/Dialog";
import type { Item } from "../types/Items.ts";
import ItemsTable from "../components/tables/ItemTable.tsx";
import ItemForm from "../components/forms/ItemForm";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";
import { fetchAllItems, handleUpdate, handleSave, handleDelete } from "../services/itemServices.ts";
import { useAuth } from "../context/UseAuth.ts";

const ItemsPage: React.FC = () => {
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    useEffect(() => {
        getAllItems();
    }, []);

    const getAllItems = async () => {
        try {
            setIsLoading(true);
            const result = await fetchAllItems();
            setItems(result);
        } catch (err) {
            toast.error("Something went wrong while fetching items.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddItem = () => {
        if (!user || user.role !== "Admin") return;
        setSelectedItem(null);
        setIsAddDialogOpen(true);
    };

    const handleEditItem = (item: Item) => {
        if (!user || user.role !== "Admin") return;
        setSelectedItem(item);
        setIsEditDialogOpen(true);
    };

    const handleDeleteItem = (item: Item) => {
        if (!user || user.role !== "Admin") {
            toast.error("Only Admin can delete items");
            return;
        }
        setSelectedItem(item);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!user || user.role !== "Admin") return; // Extra safety
        if (selectedItem) {
            try {
                await handleDelete(selectedItem._id); // Use _id
                toast.success("Item deleted successfully");
                await getAllItems(); // Refresh list
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete item");
            } finally {
                setIsDeleteDialogOpen(false);
                setSelectedItem(null);
            }
        }
    };

    const handleFormSubmit = async (itemData: Omit<Item, "_id">) => {
        if (!user || user.role !== "Admin") return;

        if (selectedItem) {
            try {
                const updatedItem = await handleUpdate(selectedItem._id, itemData);
                setItems((prev) =>
                    prev.map((item) => (item._id === selectedItem._id ? updatedItem : item))
                );
                toast.success("Item updated successfully");
                setIsEditDialogOpen(false);
            } catch {
                toast.error("Failed to update item");
            }
        } else {
            try {
                const newItem = await handleSave(itemData);
                setItems((prev) => [...prev, newItem]);
                toast.success("Item added successfully");
                setIsAddDialogOpen(false);
            } catch {
                toast.error("Failed to add item");
            }
        }
        setSelectedItem(null);
    };

    const cancelDialog = () => {
        setIsAddDialogOpen(false);
        setIsEditDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setSelectedItem(null);
    };

    const getTotalValue = () => {
        return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "LKR",
        }).format(price);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <CircleLoader color="#4F46E5" size={80} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Items</h1>
                        <p className="text-gray-600 mt-1">
                            Total Items: {items.length} | Total Value: {formatPrice(getTotalValue())}
                        </p>
                    </div>
                    {user && user.role === "Admin" && (
                        <button
                            onClick={handleAddItem}
                            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150"
                        >
                            <MdAdd className="w-5 h-5" />
                            <span>Add Item</span>
                        </button>
                    )}
                </div>

                <ItemsTable
                    items={items}
                    onEdit={user?.role === "Admin" ? handleEditItem : undefined}
                    onDelete={user?.role === "Admin" ? handleDeleteItem : undefined}
                />

                {user?.role === "Admin" && (
                    <Dialog
                        isOpen={isAddDialogOpen}
                        onCancel={cancelDialog}
                        onConfirm={() => {
                            const form = document.querySelector("form") as HTMLFormElement;
                            if (form) form.requestSubmit();
                        }}
                        title="Add New Item"
                    >
                        <ItemForm onSubmit={handleFormSubmit} />
                    </Dialog>
                )}

                {user?.role === "Admin" && (
                    <Dialog
                        isOpen={isEditDialogOpen}
                        onCancel={cancelDialog}
                        onConfirm={() => {
                            const form = document.querySelector("form") as HTMLFormElement;
                            if (form) form.requestSubmit();
                        }}
                        title="Edit Item"
                    >
                        <ItemForm item={selectedItem ?? undefined} onSubmit={handleFormSubmit} />
                    </Dialog>
                )}

                <Dialog
                    isOpen={isDeleteDialogOpen}
                    onCancel={cancelDialog}
                    onConfirm={confirmDelete}
                    title="Delete Item"
                >
                    <p className="text-gray-700">
                        Are you sure you want to delete <strong>{selectedItem?.name}</strong>? This action cannot be undone.
                    </p>
                </Dialog>
            </div>
        </div>
    );
};

export default ItemsPage;