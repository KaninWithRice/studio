import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  icon?: LucideIcon;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Served' | 'Cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string; // For simplicity, could be more complex
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO date string
}
