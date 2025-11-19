import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import salesService from "../../services/salesService.ts";


interface ChartData {
    month: string;
    revenue: number;
    sales: number;
}

const MonthlySalesChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const res = await salesService.getMonthlySales();

            const formatted = res.labels.map((label: string, index: number) => ({
                month: label,
                revenue: res.revenueData[index],
                sales: res.salesCountData[index]
            }));

            setChartData(formatted);
        };

        loadData();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Sales Chart</h3>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={true}
                        name="Revenue"
                    />

                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={true}
                        name="Sales Count"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlySalesChart;