export type UserRole = 'Admin' | 'Cashier';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
}

export type UserFormData = {
    email: string,
    phone: string,
    password: string
}