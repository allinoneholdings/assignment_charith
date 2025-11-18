import React, { useState, useEffect } from "react"
import type { Item } from "../../types/Items"

interface ItemFormProps {
    item?: Item | null
    onSubmit: (itemData: Omit<Item, "_id">) => void
}

interface ItemFormData {
    name: string
    category: string
    unitPrice: string
    quantity: string
}

interface FormErrors {
    name?: string
    category?: string
    unitPrice?: string
    quantity?: string
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit }) => {
    const [formData, setFormData] = useState<ItemFormData>({
        name: "",
        category: "",
        unitPrice: "",
        quantity: "",
    })

    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name,
                category: item.category,
                unitPrice: item.unitPrice.toString(),
                quantity: item.quantity.toString(),
            })
        } else {
            setFormData({
                name: "",
                category: "",
                unitPrice: "",
                quantity: "",
            })
        }
        setErrors({})
    }, [item])

    // VALIDATION
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) newErrors.name = "Item name is required"

        if (!formData.category.trim()) newErrors.category = "Category is required"

        // unitPrice
        if (!formData.unitPrice.trim()) {
            newErrors.unitPrice = "Unit price is required"
        } else if (isNaN(parseFloat(formData.unitPrice))) {
            newErrors.unitPrice = "Invalid price"
        } else if (parseFloat(formData.unitPrice) <= 0) {
            newErrors.unitPrice = "Price must be > 0"
        }

        // quantity
        if (!formData.quantity.trim()) {
            newErrors.quantity = "Quantity is required"
        } else if (isNaN(Number(formData.quantity))) {
            newErrors.quantity = "Quantity must be a number"
        } else if (Number(formData.quantity) < 0) {
            newErrors.quantity = "Quantity cannot be negative"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit({
                name: formData.name.trim(),
                category: formData.category.trim(),
                unitPrice: parseFloat(formData.unitPrice),
                quantity: Number(formData.quantity),
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // Allow only numbers and decimal point
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            handleChange(e)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter item name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* CATEGORY */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.category ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="Enter category"
                />
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {/* UNIT PRICE */}
            <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                </label>
                <input
                    type="text"
                    id="unitPrice"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handlePriceChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.unitPrice ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                />
                {errors.unitPrice && <p className="mt-1 text-sm text-red-600">{errors.unitPrice}</p>}
            </div>

            {/* QUANTITY */}
            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                </label>
                <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.quantity ? "border-red-300" : "border-gray-300"
                    }`}
                    placeholder="0"
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>
        </form>
    )
}

export default ItemForm