import React from "react"
import { MdEdit, MdDelete } from "react-icons/md"
import type { Item } from "../../types/Items"

interface ItemsTableProps {
    items: Item[]
    onEdit: (item: Item) => void
    onDelete: (item: Item) => void
}

const ItemsTable: React.FC<ItemsTableProps> = ({ items, onEdit, onDelete }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)
    }

    const formatItemId = (index: number) => {
        return `I${(index + 1).toString().padStart(4, "0")}`;
    };

    return (
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                {items.length === 0 ? (
                    <tr>
                        <td colSpan={6} className='px-8 py-4 text-center text-gray-500'>
                            No items found
                        </td>
                    </tr>
                ) : (
                    items.map((item,index) => (
                        <tr key={item._id} className='hover:bg-gray-50'>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'> {formatItemId(index)}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.name}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.category}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold'>
                                {formatPrice(item.unitPrice)}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.quantity}</td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                                <div className='flex space-x-2'>
                                    <button
                                        onClick={() => onEdit(item)}
                                        className='text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100 transition duration-150'
                                    >
                                        <MdEdit className='w-4 h-4' />
                                    </button>
                                    <button
                                        onClick={() => onDelete(item)}
                                        className='text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition duration-150'
                                    >
                                        <MdDelete className='w-4 h-4' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ItemsTable