import React from "react";
import { MdInventory, MdShoppingCart } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import MonthlySalesChart from "../components/dashboard/MonthlySalesChart.tsx";

const DashboardPage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back! Here's what's happening with your business.
                    </p>
                </div>

                {/* Monthly Sales Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <MonthlySalesChart />
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
                            <MdShoppingCart className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Create Sale</p>
                        </button>

                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
                            <IoMdPaper className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">View Report</p>
                        </button>

                        <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150">
                            <MdInventory className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-900">Add Item</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;