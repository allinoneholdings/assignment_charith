import apiClient, {BASE_URL} from "./apiClient";
import type { Sale } from "../types/Sales";

interface SaleItemPayload {
    item: string;
    quantity: number;
}

interface CreateSalePayload {
    items: SaleItemPayload[];
}

const salesService = {
    // Create a new sale
    createSale: async (payload: CreateSalePayload): Promise<Sale> => {
        const { data } = await apiClient.post<Sale>(`${BASE_URL}sales/create-sale`, payload);
        return data;
    },

    // Get PDF bill URL for a sale
    getBillUrl: (saleId: string): string => {
        return `${BASE_URL}sales/${saleId}/bill`;
    },

    // You can add more sales-related methods here in future
    // e.g., getAllSales, getSaleById, deleteSale, etc.
};

export default salesService;