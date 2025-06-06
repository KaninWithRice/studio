
"use client";
import type { ReactNode } from 'react';
import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { MenuItem, CartItem, Order, OrderStatus } from '@/types';
import { mockMenuItems, mockOrders } from '@/lib/mockData'; // Default mock data

interface NoodleContextType {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  orders: Order[];
  addOrder: (customerName: string) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getCategoryIcon: (categoryName: string) => React.ElementType | undefined;
}

export const NoodleContext = createContext<NoodleContextType | undefined>(undefined);

interface NoodleProviderProps {
  children: ReactNode;
}

export const NoodleProvider: React.FC<NoodleProviderProps> = ({ children }) => {
  const [menuItems, setMenuItemsState] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrdersState] = useState<Order[]>([]);

  useEffect(() => {
    // Initialize with mock data on client mount
    setMenuItemsState(mockMenuItems);
    setOrdersState(mockOrders);
  }, []);

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
      ).filter(item => item.quantity > 0) // Remove if quantity is 0
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  }, [cart]);

  const addOrder = useCallback((customerName: string): Order | null => {
    if (cart.length === 0) return null;
    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      items: [...cart],
      customerName,
      totalAmount: getCartTotal(),
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    setOrdersState((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  }, [cart, clearCart, getCartTotal]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrdersState((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);
  
  const getCategoryIcon = useCallback((categoryName: string): React.ElementType | undefined => {
    const itemInCateogry = menuItems.find(item => item.category === categoryName);
    return itemInCateogry?.icon;
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
        orders,
        addOrder,
        updateOrderStatus,
        getCategoryIcon,
      }}
    >
      {children}
    </NoodleContext.Provider>
  );
};
