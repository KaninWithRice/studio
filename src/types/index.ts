
import type { LucideIcon } from 'lucide-react';
import type { Timestamp } from 'firebase/firestore';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Base Noodles' | 'Sides' | 'Sauces' | 'Drinks'; // More specific categories
  imageUrl?: string;
  icon?: LucideIcon;
}

// Represents an item in the shopping cart.
// A cart item consists of a base noodle and any selected add-ons (sides/sauces).
// Drinks will be a CartItem with a baseItem of category 'Drinks' and empty selectedAddons.
export interface CartItem {
  id: string; // Unique identifier for this specific cart entry
  baseItem: MenuItem;
  selectedAddons: MenuItem[]; // Array of selected sides and sauces for this base item
  quantity: number;
}

export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Served' | 'Cancelled';

// Structure for an Order object used in the application.
export interface Order {
  id: string; // Firestore document ID
  items: CartItem[]; // Uses the new CartItem structure
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date; // JS Date object
}

// Firestore-specific structure for a MenuItem (omitting non-serializable 'icon').
type MenuItemInFirestore = Omit<MenuItem, 'icon'>;

// Firestore-specific structure for a CartItem.
interface CartItemInFirestore {
  id: string; // Retain the unique cart entry ID if needed, or it can be implicit by array index
  baseItem: MenuItemInFirestore;
  selectedAddons: MenuItemInFirestore[];
  quantity: number;
}

// Data structure for an order as written to Firestore.
export interface OrderFirestoreData {
  items: CartItemInFirestore[];
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Timestamp; // Firestore Timestamp
}
