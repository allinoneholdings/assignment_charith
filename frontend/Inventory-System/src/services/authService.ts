import type {User} from "../types/User.ts";
import apiClient from "./apiClient.ts";

export interface SignupResponse {
    name: string;
    email: string;
    _id: string;
    role: "Admin" | "Cashier";
}

export interface LoginResponse {
    _id: string;
    name: string;
    email: string;
    role: "Admin" | "Cashier";
    accessToken: string;
}

export const signUp = async (userData: User): Promise<SignupResponse> => {
    const response = await apiClient.post(`/auth/signUp`, userData);
    return response.data;
}

export const login = async (loginData: { email: string; password: string }) => {
    const response = await apiClient.post("/auth/login", loginData);
    console.log(response.data);
    return response.data;
};