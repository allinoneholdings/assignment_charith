import type {Item} from "../types/Items";
import apiClient from "./apiClient.ts";

export const fetchAllItems = async () : Promise<Item[]> => {
    const response = await apiClient.get("/item/get-all");
    return response.data;
}

export const handleDelete = async (itemId:number): Promise<void> => {
    await apiClient.delete(`/items/${itemId}`,{});
}

export const handleUpdate = async (id:number, item:Omit<Item, "id">):Promise<Item> => {
    const response = await apiClient.put(`/item/update-item/${id}`, item);
    return response.data;
}

export const handleSave = async (itemsData:Omit<Item, "id">):Promise<Item> => {
    const response = await apiClient.post(`/item/create`,itemsData,{
    })
    return response.data;
}