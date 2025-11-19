import React from "react";
import type { Sale, SaleItem } from "../../types/Sales";

interface SalesTableProps {
    sales?: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ sales = [] }) => {
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "LKR" }).format(price);

    const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

    const formatSaleId = (index: number) => `S${(index + 1).toString().padStart(4, "0")}`;

    const formatItems = (items: SaleItem[]) =>
        items
            .map((i) => {
                const itemName = typeof i.item === "string" ? i.item : i.item?.name || "Unknown";
                return `${itemName} x${i.quantity}`;
            })
            .join(", ");

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sold By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                {sales.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-8 py-4 text-center text-gray-500">
                            No sales found
                        </td>
                    </tr>
                ) : (
                    sales.map((sale, index) => (
                        <tr key={sale._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium">{formatSaleId(index)}</td>
                            <td className="px-6 py-4 text-sm">{formatItems(sale.items)}</td>
                            <td className="px-6 py-4 text-sm font-semibold">{formatPrice(sale.totalAmount)}</td>
                            <td className="px-6 py-4 text-sm">
                                {typeof sale.soldBy === "string" ? sale.soldBy : sale.soldBy?.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-sm">{formatDate(sale.createdAt)}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;