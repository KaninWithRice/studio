"use client";
import { db } from "@/lib/firebase";
import { mockMenuItems } from "@/lib/mockData";
import type {
  CartItem,
  CartItemInFirestore,
  MenuItem,
  OrderFirestoreData,
  OrderStatus,
} from "@/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import type { ReactNode } from "react";
import React, { createContext, useCallback, useState } from "react";

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

export const NoodleContext = createContext<NoodleContextType | undefined>(
  undefined
);

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
      const existingItem = prevCart.find(
        (cartItem) => cartItem.menuItem.id === item.id
      );
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
    setCart((prevCart) =>
      prevCart.filter((item) => item.menuItem.id !== itemId)
    );
  }, []);

  const updateCartItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.menuItem.id === itemId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    console.log("NoodleContext: Clearing cart.");
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0
    );
  }, [cart]);

  const addOrder = useCallback(
    async (customerName: string): Promise<string | null> => {
      console.log("NoodleContext: addOrder called for customer:", customerName);
      if (cart.length === 0) {
        console.warn("NoodleContext: Attempted to add order with empty cart.");
        return null;
      }

      const newOrderData: OrderFirestoreData = {
        items: cart.map((cartItem): CartItemInFirestore => {
          const { icon, ...serializableMenuItem } = cartItem.menuItem;
          return {
            menuItem: serializableMenuItem,
            quantity: cartItem.quantity,
          };
        }),
        customerName,
        totalAmount: getCartTotal(),
        status: "New",
        createdAt: serverTimestamp(),
      };

      console.log(
        "NoodleContext: Preparing to add document to Firestore with data:",
        newOrderData
      );
      try {
        if (!db) {
          console.error(
            "NoodleContext: Firestore database (db) is not initialized!"
          );
          return null;
        }
        console.log("db", db);
        console.log(
          "NoodleContext: Attempting to call addDoc for 'orders' collection..."
        );
        const docRef = await addDoc(collection(db, "orders"), newOrderData);
        console.log(
          "NoodleContext: Document successfully added to Firestore with ID:",
          docRef.id
        );
        clearCart();
        return docRef.id;
      } catch (error) {
        console.error("NoodleContext: Error adding order to Firestore:", error);
        if (error instanceof Error) {
          console.error(
            "NoodleContext: Firestore error details:",
            error.message,
            error.stack
          );
        }
        return null;
      }
    },
    [cart, clearCart, getCartTotal]
  );

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      console.log(
        `NoodleContext: Updating order ${orderId} to status ${status}`
      );
      try {
        if (!db) {
          console.error(
            "NoodleContext: Firestore database (db) is not initialized for updateOrderStatus!"
          );
          return;
        }
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status });
        console.log(
          `NoodleContext: Order ${orderId} status updated successfully.`
        );
      } catch (error) {
        console.error(
          `NoodleContext: Error updating order status for ${orderId}:`,
          error
        );
      }
    },
    []
  );

  const getCategoryIcon = useCallback(
    (categoryName: string): React.ElementType | undefined => {
      const itemInCategory = menuItems.find(
        (item) => item.category === categoryName
      );
      return itemInCategory?.icon;
    },
    [menuItems]
  );

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
