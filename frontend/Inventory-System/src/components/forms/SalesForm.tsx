import React, { useState } from "react"
import { MdAdd, MdRemove, MdDelete } from "react-icons/md"

interface SaleFormProps {
    onPrintBill: (saleItems: { item: string; quantity: number }[]) => void
}

interface FormItem {
    itemId: string
    quantity: number
}

const SaleForm: React.FC<SaleFormProps> = ({ onPrintBill }) => {
    const [selectedItems, setSelectedItems] = useState<FormItem[]>([])
    const [newItemId, setNewItemId] = useState("")

    const addItem = () => {
        if (!newItemId) return
        const existing = selectedItems.find(i => i.itemId === newItemId)
        if (existing) {
            setSelectedItems(prev =>
                prev.map(i => i.itemId === newItemId ? { ...i, quantity: i.quantity + 1 } : i)
            )
        } else {
            setSelectedItems(prev => [...prev, { itemId: newItemId, quantity: 1 }])
        }
        setNewItemId("")
    }

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            setSelectedItems(prev => prev.filter(i => i.itemId !== itemId))
            return
        }
        setSelectedItems(prev =>
            prev.map(i => i.itemId === itemId ? { ...i, quantity } : i)
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={newItemId}
                    onChange={e => setNewItemId(e.target.value)}
                    placeholder="Enter Item ID"
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="button"
                    onClick={addItem}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Add Item
                </button>
            </div>

            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Items</h3>
                {selectedItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-md">
                        No items added
                    </div>
                ) : (
                    <div className="space-y-2">
                        {selectedItems.map(item => (
                            <div key={item.itemId} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                                <div className="flex-1">{item.itemId}</div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                        className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <MdRemove className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                                        className="p-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <MdAdd className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(item.itemId, 0)}
                                        className="p-1 text-red-500 hover:text-red-700"
                                    >
                                        <MdDelete className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedItems.length > 0 && (
                <div className="border-t pt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => onPrintBill(selectedItems.map(i => ({ item: i.itemId, quantity: i.quantity })))}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Print Bill
                    </button>
                </div>
            )}
        </div>
    )
}

export default SaleForm