import { createContext } from "react";

export interface AuthUser {
    _id: string;
    name: string;
    email: string;
    role: "Admin" | "Cashier";
    token: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    isLoggedIn: boolean;
    login: (userData: AuthUser) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);