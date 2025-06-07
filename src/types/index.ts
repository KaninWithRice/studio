
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  icon?: LucideIcon; // Icon is optional, used for display in menu, not stored in order items
}

export interface CartItem {
  menuItem: MenuItem; // Client-side cart uses the full MenuItem
  quantity: number;
}

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Served' | 'Cancelled';

// This is the structure of an Order object as used throughout the application,
// especially when displaying order details.
export interface Order {
  id: string;
  items: CartItem[]; // When orders are fetched, menuItem.icon will be undefined, which is fine
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date; // JS Date object in the app, converted from Firestore Timestamp
}

// Defines the structure of a cart item specifically for Firestore storage.
// MenuItem is stripped of non-serializable fields like 'icon'.
interface CartItemInFirestore {
  menuItem: Omit<MenuItem, 'icon'>; // Ensures only serializable parts of MenuItem are stored
  quantity: number;
}

// This type represents the data structure for an order as it is written to Firestore.
export interface OrderFirestoreData {
  items: CartItemInFirestore[]; // Uses the Firestore-specific cart item structure
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Timestamp; // Firestore Timestamp
}
