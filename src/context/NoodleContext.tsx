
"use client";
import type { ReactNode } from 'react';
import React, { createContext, useState, useCallback } from 'react';
import type { MenuItem, CartItem, Order, OrderStatus, OrderFirestoreData } from '@/types';
import { mockMenuItems } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';

interface NoodleContextType {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addOrder: (customerName: string) => Promise<string | null>; // Returns new order ID or null
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  getCategoryIcon: (categoryName: string) => React.ElementType | undefined;
}

export const NoodleContext = createContext<NoodleContextType | undefined>(undefined);

interface NoodleProviderProps {
  children: ReactNode;
}

export const NoodleProvider: React.FC<NoodleProviderProps> = ({ children }) => {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>(mockMenuItems);
  const [cart, setCart] = useState<CartItem[]>([]);

  const setMenuItems = (items: MenuItem[]) => {
    setMenuItemsState(items);
  };

  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.menuItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { menuItem: item, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== itemId));
  }, []);

  const updateCartItemQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  }, [cart]);

  const addOrder = useCallback(async (customerName: string): Promise<string | null> => {
    if (cart.length === 0) return null;

    const newOrderData: OrderFirestoreData = {
      items: cart.map(cartItem => {
        // Create a serializable version of menuItem, omitting the 'icon'
        const { icon, ...serializableMenuItem } = cartItem.menuItem;
        return {
          menuItem: serializableMenuItem,
          quantity: cartItem.quantity,
        };
      }),
      customerName,
      totalAmount: getCartTotal(),
      status: 'New',
      createdAt: Timestamp.fromDate(new Date()), // Use Firestore Timestamp
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), newOrderData);
      clearCart();
      return docRef.id; // Return the ID of the newly created document
    } catch (error) {
      console.error("Error adding order to Firestore: ", error);
      return null;
    }
  }, [cart, clearCart, getCartTotal]);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error("Error updating order status in Firestore: ", error);
    }
  }, []);
  
  const getCategoryIcon = useCallback((categoryName: string): React.ElementType | undefined => {
    const itemInCategory = menuItems.find(item => item.category === categoryName);
    return itemInCategory?.icon;
  }, [menuItems]);

  return (
    <NoodleContext.Provider
      value={{
        menuItems,
        setMenuItems,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotal,
        addOrder,
        updateOrderStatus,
        getCategoryIcon,
      }}
    >
      {children}
    </NoodleContext.Provider>
  );
};
