import React from "react";
import type { SaleItem } from "../../types/Sales";

export interface Sale {
    _id: string;
    items: SaleItem[];
    totalAmount: number;
    soldBy: any;
    createdAt: string;
}

interface Props {
    data: Sale[];
}

const AllSalesReportTable: React.FC<Props> = ({ data = [] }) => {

    const formatPrice = (price: number) => `Rs. ${price.toFixed(2)}`;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleString();

    const formatSaleId = (index: number) =>
        `S${(index + 1).toString().padStart(4, "0")}`;

    const formatItems = (items: SaleItem[]) =>
        items
            .map((i) => {
                if (typeof i.item === "object" && i.item?.name !== undefined && i.item?.name !== null) {
                    return `${i.item.name} x${i.quantity}`;
                }

                if (typeof i.item === "string") {
                    return `Unknown Item x${i.quantity}`;
                }

                return `Unknown x${i.quantity}`;
            })
            .join(", ");

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Sale No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Sold By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                    </th>
                </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-8 py-4 text-center text-gray-500">
                            No sales found
                        </td>
                    </tr>
                ) : (
                    data.map((sale, index) => (
                        <tr key={sale._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium">
                                {formatSaleId(index)}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                {formatItems(sale.items)}
                            </td>

                            <td className="px-6 py-4 text-sm font-semibold">
                                {formatPrice(sale.totalAmount)}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                {typeof sale.soldBy === "string"
                                    ? sale.soldBy
                                    : sale.soldBy?.name || "N/A"}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                {formatDate(sale.createdAt)}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    )
};

export default AllSalesReportTable;