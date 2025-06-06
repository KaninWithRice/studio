import type { MenuItem, Order, OrderStatus } from '@/types';
import { Soup, PackageSearch, Blend, GlassWater, Egg, Leaf, Drumstick, CookingPot, Square, Circle } from 'lucide-react'; // Added CookingPot, Square, Circle

export const mockCategories = [
  { name: 'Base Noodles', icon: Soup },
  { name: 'Sides', icon: PackageSearch },
  { name: 'Sauces', icon: Blend },
  { name: 'Drinks', icon: GlassWater },
];

export const mockMenuItems: MenuItem[] = [
  // Base Noodles
  {
    id: 'bn1',
    name: 'Lucky Me! Pancit Canton Kalamansi',
    description: 'Classic Filipino stir-fried noodles with a zesty kalamansi flavor.',
    price: 6.99,
    category: 'Base Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Soup,
  },
  {
    id: 'bn2',
    name: 'Lucky Me! Pancit Canton Sweet and Spicy',
    description: 'Stir-fried noodles with a delightful blend of sweet and spicy notes.',
    price: 6.99,
    category: 'Base Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Soup,
  },
  {
    id: 'bn3',
    name: 'Samyang Buldak Carbonara Ramen',
    description: 'Spicy Korean chicken ramen with a creamy carbonara twist.',
    price: 8.99,
    category: 'Base Noodles',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: CookingPot, // Using a different icon for variety
  },

  // Sides (Add-ons)
  {
    id: 's1',
    name: 'Egg (fried or boiled)',
    description: 'A perfectly cooked egg, your choice of fried or boiled.',
    price: 1.50,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Egg,
  },
  {
    id: 's2',
    name: 'Spam',
    description: 'Slices of savory Spam, grilled to perfection.',
    price: 2.50,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Square, // Representing a slice/block
  },
  {
    id: 's3',
    name: 'Siomai',
    description: 'Steamed pork and shrimp dumplings (4 pcs).',
    price: 3.99,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Circle, // Representing a dumpling
  },
  {
    id: 's4',
    name: 'Nori Seaweed',
    description: 'Crispy sheets of roasted seaweed.',
    price: 1.00,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Leaf,
  },

  // Sauces (Add-ons)
  {
    id: 'sc1',
    name: 'Cheese Sauce',
    description: 'Rich and creamy cheese sauce, perfect for dipping or drizzling.',
    price: 1.25,
    category: 'Sauces',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Blend,
  },

  // Drinks
  {
    id: 'd1',
    name: 'Pandan Choco',
    description: 'A unique and refreshing chocolate drink infused with pandan.',
    price: 3.50,
    category: 'Drinks',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: GlassWater,
  },
];

// Keeping existing mockOrders structure, but it might reference old menu items not in the new list.
// For a clean state, orders should ideally be cleared or updated to use new menu items.
// For now, we'll leave them, but be aware they might show "missing" items if not updated.
export const mockOrders: Order[] = [
  {
    id: 'order1',
    items: [
      { menuItem: mockMenuItems.find(item => item.id === 'bn1') || mockMenuItems[0], quantity: 1 }, // Example: use new item
      { menuItem: mockMenuItems.find(item => item.id === 's1') || mockMenuItems[3], quantity: 2 }, // Example: use new item
    ],
    customerName: 'Alice Wonderland',
    totalAmount: (mockMenuItems.find(item => item.id === 'bn1')?.price || 0) + (mockMenuItems.find(item => item.id === 's1')?.price || 0) * 2,
    status: 'New' as OrderStatus,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: 'order2',
    items: [{ menuItem: mockMenuItems.find(item => item.id === 'bn2') || mockMenuItems[1], quantity: 1 }], // Example: use new item
    customerName: 'Bob The Builder',
    totalAmount: mockMenuItems.find(item => item.id === 'bn2')?.price || 0,
    status: 'Preparing' as OrderStatus,
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
  },
];
