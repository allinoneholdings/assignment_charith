import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";
import { getLowStock } from "../services/itemServices";
import salesService from "../services/salesService";
import type { Item } from "../types/Items";
import AllSalesReportTable, { type Sale } from "../components/tables/AllSalesReportTable";

const ReportsPage: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [lowStockItems, setLowStockItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [totalSales, setTotalSales] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            await loadLowStockItems();
            await loadSales();
        } catch (err: any) {
            toast.error(err?.message || "Failed to load report data");
        } finally {
            setIsLoading(false);
        }
    };

    const loadLowStockItems = async () => {
        try {
            const items = await getLowStock();
            setLowStockItems(items);
        } catch (err: any) {
            toast.error("Failed to load low stock items");
        }
    };

    const loadSales = async () => {
        try {
            const data = await salesService.fetchAllSales();
            setSales(data);

            setTotalSales(data.length);
            // @ts-ignore
            setTotalRevenue(data.reduce((sum, sale) => sum + sale.totalAmount, 0));
        } catch (err: any) {
            toast.error("Failed to load sales data");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <CircleLoader size={80} />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">All Sales Details (Report)</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">

                    {/* Total Sales */}
                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Total Sales</h2>
                        <p className="text-2xl font-bold text-blue-600 mt-2">{totalSales}</p>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Total Revenue</h2>
                        <p className="text-2xl font-bold text-green-600 mt-2">
                            Rs. {totalRevenue.toFixed(2)}
                        </p>
                    </div>

                    {/* Low Stock Items */}
                    <div className="bg-white shadow-md p-5 rounded-lg">
                        <h2 className="text-gray-600 text-sm">Low Stock Items</h2>
                        <p className="text-m text-red-600 mt-2">
                            {lowStockItems.length > 0
                                ? lowStockItems.map((item) => item.name).join(", ")
                                : "None"}
                        </p>
                    </div>
                </div>

                <AllSalesReportTable data={sales} />;

            </div>
        </div>
    );
};

export default ReportsPage;