import React from "react"
// import DashboardStats from "../components/dashboard/DashboardStats"
// import DashboardCharts from "../components/dashboard/DashboardCharts"
import {MdInventory, MdShoppingCart} from "react-icons/md"
import {IoMdPaper} from "react-icons/io";
// import RecentActivity from "../components/dashboard/RecentActivity"

const DashboardPage: React.FC = () => {
    // Sample data - in real app, this would come from API
    const dashboardData = {
        totalCustomers: 1250,
        totalItems: 89,
        totalOrders: 342,
        totalRevenue: 48750.5,

        monthlyRevenue: [
            { month: "Jan", revenue: 4200, orders: 45 },
            { month: "Feb", revenue: 3800, orders: 38 },
            { month: "Mar", revenue: 5200, orders: 52 },
            { month: "Apr", revenue: 4600, orders: 46 },
            { month: "May", revenue: 5800, orders: 58 },
            { month: "Jun", revenue: 6200, orders: 62 },
        ],

        topItems: [
            { name: "Wireless Headphones", sales: 125, revenue: 12475 },
            { name: "Bluetooth Speaker", sales: 98, revenue: 4900 },
            { name: "Phone Case", sales: 156, revenue: 3900 },
            { name: "USB-C Cable", sales: 234, revenue: 3040 },
            { name: "Laptop Stand", sales: 67, revenue: 2680 },
        ],

        orderStatus: [
            { name: "Completed", value: 65, color: "#10B981" },
            { name: "Pending", value: 25, color: "#F59E0B" },
            { name: "Cancelled", value: 10, color: "#EF4444" },
        ],

        recentActivities: [
            {
                id: 1,
                type: "order" as const,
                message: "New order #1234 received from John Doe",
                time: "2 minutes ago",
            },
            {
                id: 2,
                type: "customer" as const,
                message: "New customer Jane Smith registered",
                time: "15 minutes ago",
            },
            {
                id: 3,
                type: "item" as const,
                message: "Wireless Headphones stock updated",
                time: "1 hour ago",
            },
            {
                id: 4,
                type: "order" as const,
                message: "Order #1233 marked as completed",
                time: "2 hours ago",
            },
            {
                id: 5,
                type: "customer" as const,
                message: "Customer profile updated for Mike Johnson",
                time: "3 hours ago",
            },
        ],
    }

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
                    <p className='text-gray-600 mt-1'>Welcome back! Here's what's happening with your business.</p>
                </div>

                {/* Statistics Cards */}
                {/*<DashboardStats*/}
                {/*    totalCustomers={dashboardData.totalCustomers}*/}
                {/*    totalItems={dashboardData.totalItems}*/}
                {/*    totalOrders={dashboardData.totalOrders}*/}
                {/*    totalRevenue={dashboardData.totalRevenue}*/}
                {/*/>*/}

                {/*/!* Charts *!/*/}
                {/*<DashboardCharts*/}
                {/*    monthlyRevenue={dashboardData.monthlyRevenue}*/}
                {/*    topItems={dashboardData.topItems}*/}
                {/*    orderStatus={dashboardData.orderStatus}*/}
                {/*/>*/}

                {/* Recent Activity */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='lg:col-span-2'>
                        {/* This space can be used for additional charts or tables */}
                        <div className='bg-white rounded-lg shadow-md p-6'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Actions</h3>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <button className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
                                    <MdShoppingCart className='w-8 h-8 text-indigo-600 mx-auto mb-2' />
                                    <p className='text-sm font-medium text-gray-900'>Create Sale</p>
                                </button>
                                <button className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
                                    <IoMdPaper className='w-8 h-8 text-green-600 mx-auto mb-2' />
                                    <p className='text-sm font-medium text-gray-900'>View Report</p>
                                </button>
                                <button className='p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-150'>
                                    <MdInventory className='w-8 h-8 text-purple-600 mx-auto mb-2' />
                                    <p className='text-sm font-medium text-gray-900'>Add Item</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/*<RecentActivity activities={dashboardData.recentActivities} />*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
