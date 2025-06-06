import type { MenuItem, Order, OrderStatus } from '@/types';
import { PackageSearch, Soup, Sandwich, Utensils, GlassWater, IceCream, Pizza, Drumstick } from 'lucide-react';

export const mockCategories = [
  { name: 'Noodles', icon: Soup },
  { name: 'Appetizers', icon: Sandwich },
  { name: 'Sides', icon: Pizza },
  { name: 'Main Courses', icon: Drumstick },
  { name: 'Drinks', icon: GlassWater },
  { name: 'Desserts', icon: IceCream },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Ramen',
    description: 'Rich pork broth, chashu pork, soft-boiled egg, and narutomaki.',
    price: 12.99,
    category: 'Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Soup,
  },
  {
    id: '2',
    name: 'Spicy Miso Ramen',
    description: 'Fiery miso broth, ground pork, corn, and chili oil.',
    price: 13.99,
    category: 'Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Soup,
  },
  {
    id: '3',
    name: 'Vegetable Udon',
    description: 'Thick udon noodles in a light dashi broth with seasonal vegetables.',
    price: 11.99,
    category: 'Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Utensils,
  },
  {
    id: '4',
    name: 'Gyoza (6 pcs)',
    description: 'Pan-fried pork and vegetable dumplings.',
    price: 6.99,
    category: 'Appetizers',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Sandwich,
  },
  {
    id: '5',
    name: 'Edamame',
    description: 'Steamed soybeans with sea salt.',
    price: 4.99,
    category: 'Appetizers',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: PackageSearch,
  },
  {
    id: '6',
    name: 'Green Tea',
    description: 'Refreshing classic green tea.',
    price: 2.50,
    category: 'Drinks',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: GlassWater,
  },
  {
    id: '7',
    name: 'Mochi Ice Cream',
    description: 'Assorted mochi ice cream (3 pcs).',
    price: 5.50,
    category: 'Desserts',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: IceCream,
  },
   {
    id: '8',
    name: 'Tempura Shrimp Udon',
    description: 'Udon noodles with crispy tempura shrimp.',
    price: 14.50,
    category: 'Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Utensils,
  },
  {
    id: '9',
    name: 'Takoyaki',
    description: 'Ball-shaped Japanese snack with diced octopus.',
    price: 7.50,
    category: 'Appetizers',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Sandwich,
  },
  {
    id: '10',
    name: 'Seaweed Salad',
    description: 'Healthy and refreshing seaweed salad.',
    price: 5.99,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Pizza,
  },
  {
    id: '11',
    name: 'Chicken Karaage',
    description: 'Japanese style fried chicken.',
    price: 8.99,
    category: 'Main Courses',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Drumstick,
  },
  {
    id: '12',
    name: 'Ramune Soda',
    description: 'Classic Japanese marble soda.',
    price: 3.50,
    category: 'Drinks',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: GlassWater,
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    items: [
      { menuItem: mockMenuItems[0], quantity: 1 },
      { menuItem: mockMenuItems[3], quantity: 2 },
    ],
    customerName: 'Alice Wonderland',
    totalAmount: mockMenuItems[0].price + mockMenuItems[3].price * 2,
    status: 'New' as OrderStatus,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: 'order2',
    items: [{ menuItem: mockMenuItems[1], quantity: 1 }],
    customerName: 'Bob The Builder',
    totalAmount: mockMenuItems[1].price,
    status: 'Preparing' as OrderStatus,
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
  },
];
