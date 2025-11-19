import apiClient from "./apiClient";
import type { Sale, SaleItem } from "../types/Sales";

interface CreateSalePayload {
    items: SaleItem[];
}

const salesService = {
    createSale: async (payload: CreateSalePayload): Promise<Sale> => {
        const { data } = await apiClient.post<Sale>("/sales/create-sale", payload);
        return data;
    },

    getDailySales: async (): Promise<{
        totalSales: number;
        totalRevenue: number;
        sales: Sale[];
    }> => {
        const { data } = await apiClient.get("/sales/daily");
        return data;
    },

    fetchAllSales: async () => {
        const response = await apiClient.get("/sales/get-all");
        return response.data;
    },

    getMonthlySales: async (): Promise<{
        labels: string[];
        revenueData: number[];
        salesCountData: number[];
        raw: any[];
    }> => {
        const { data } = await apiClient.get("/sales/monthly-report");
        return data;
    },

    downloadSaleBill: async (saleId: string) => {
        const response = await apiClient.get(`/sales/${saleId}/bill`, {
            responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Sale-${saleId}.pdf`;
        link.click();
    },
};

export default salesService;