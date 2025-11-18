import React, { useState, useEffect } from "react";
import { AuthContext, type AuthUser } from "./AuthContext";
import { setHeader } from "../services/apiClient";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (token) {
            setHeader(token); // attach token globally
        }

        if (!storedUser || storedUser === "undefined") return;

        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } catch (err) {
            console.error("Invalid user JSON:", err);
            localStorage.removeItem("user");
        }
    }, []);

    const login = (userData: AuthUser) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.accessToken);

        setHeader(userData.accessToken); // IMPORTANT
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setHeader(null); // remove token
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};