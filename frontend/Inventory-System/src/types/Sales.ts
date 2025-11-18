import type { Item } from "./Items"
import type { User } from "./User"

export interface SaleItem {
    item: Item | string
    quantity: number
}

export interface Sale {
    _id: string
    items: SaleItem[]
    totalAmount: number
    soldBy: User | string
    createdAt: string
}