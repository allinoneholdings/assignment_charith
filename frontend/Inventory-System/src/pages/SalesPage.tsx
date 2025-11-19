import React, { useEffect, useState } from "react";
import Dialog from "../components/Dialog";
import { CircleLoader } from "react-spinners";
import { MdAdd } from "react-icons/md";
import toast from "react-hot-toast";
import salesService from "../services/salesService";
import SaleForm from "../components/forms/SalesForm.tsx";
import SalesTable from "../components/tables/ReportTable.tsx";
import type { Sale } from "../types/Sales.ts";
import {getLowStock} from "../services/itemServices.ts";
import type {Item} from "../types/Items.ts";

const SalesPage: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [lowStockItems, setLowStockItems] = useState<Item[]>([]);

    useEffect(() => {
        loadAllSales();
    }, []);

    const loadAllSales = async () => {
        try {
            setIsLoading(true);
            await loadLowStockItems();

            const result = await salesService.getDailySales();
            console.log("API Response:", result);

            setTotalSales(result.totalSales || 0);
            setTotalRevenue(result.totalRevenue || 0);
            setSales(result.sales || []);

        } catch (err: any) {
            toast.error(err?.message || "Failed to load sales");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrintBill = async (saleItems: { item: string; quantity: number }[]) => {
        try {
            setIsLoading(true);

            const sale = await salesService.createSale({ items: saleItems });

            await salesService.downloadSaleBill(sale._id);

            toast.success("Bill generated successfully!");
            setIsDialogOpen(false);

            await loadAllSales();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const loadLowStockItems = async () => {
        try {
            const items = await getLowStock();
            setLowStockItems(items);
        } catch (err: any) {
            toast.success("Load low stock items");
        }
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
                    <h1 className="text-3xl font-bold text-gray-800">Sales</h1>
                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        <MdAdd className="w-5 h-5" />
                        <span>New Sale</span>
                    </button>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Total Sales</h2>
                        <p className="text-2xl font-bold">{totalSales}</p>
                    </div>

                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Total Revenue</h2>
                        <p className="text-2xl font-bold text-green-600">
                            LKR {(Number(totalRevenue) || 0).toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Low Stock Items</h2>
                        <p className="text-m text-red-600 mt-2">
                            {lowStockItems.length > 0
                                ? lowStockItems.map((item) => item.name).join(", ")
                                : "None"}
                        </p>
                    </div>
                </div>

                <SalesTable sales={sales} />

                <Dialog
                    isOpen={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    onConfirm={() => {}}
                    title="Create New Sale"
                >
                    <SaleForm onPrintBill={handlePrintBill} />
                </Dialog>
            </div>
        </div>
    );
};

export default SalesPage;