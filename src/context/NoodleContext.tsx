
"use client";
import { db } from "@/lib/firebase";
import { mockMenuItems } from "@/lib/mockData";
import type {
  CartItem,
  MenuItem,
  OrderFirestoreData,
  OrderStatus,
  CartItemInFirestore, // Import the new type
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
import { v4 as uuidv4 } from 'uuid'; // For generating unique cart item IDs

interface NoodleContextType {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  cart: CartItem[];
  addToCart: (baseItem: MenuItem, selectedAddons: MenuItem[], quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  addOrder: (customerName: string) => Promise<string | null>;
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

  const addToCart = useCallback((baseItem: MenuItem, selectedAddons: MenuItem[], quantity: number = 1) => {
    setCart((prevCart) => {
      // For simplicity, always add as a new item.
      // Future enhancement: check if an identical item (base + exact addons) exists and increment quantity.
      const newCartItem: CartItem = {
        id: uuidv4(), // Generate a unique ID for this cart entry
        baseItem,
        selectedAddons,
        quantity,
      };
      return [...prevCart, newCartItem];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== cartItemId)
    );
  }, []);

  const updateCartItemQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: Math.max(0, quantity) } // Prevent negative quantity
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity is 0
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    console.log("NoodleContext: Clearing cart.");
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, cartItem) => {
      const basePrice = cartItem.baseItem.price;
      const addonsPrice = cartItem.selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
      const itemTotal = (basePrice + addonsPrice) * cartItem.quantity;
      return total + itemTotal;
    }, 0);
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { icon, ...serializableBaseItem } = cartItem.baseItem;
          const serializableAddons = cartItem.selectedAddons.map(addon => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { icon: addonIcon, ...serializableAddonItem } = addon;
            return serializableAddonItem;
          });
          return {
            id: cartItem.id,
            baseItem: serializableBaseItem,
            selectedAddons: serializableAddons,
            quantity: cartItem.quantity,
          };
        }),
        customerName,
        totalAmount: getCartTotal(),
        status: "New",
        createdAt: serverTimestamp() as Timestamp, // Ensure correct type
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
      // This might need adjustment based on how categories are handled now.
      // For now, it attempts to find an icon from any item in that category.
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
