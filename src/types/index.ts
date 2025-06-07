
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

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
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date; // Will be JS Date object in the app, converted from Firestore Timestamp
}

// This type can be used when preparing data specifically for Firestore
export interface OrderFirestoreData {
  items: CartItem[];
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Timestamp; // Firestore Timestamp
}
