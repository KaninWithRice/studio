
import type { MenuItem } from '@/types';
import { Soup, GlassWater, Egg, Leaf, CookingPot, Square, Circle, Blend } from 'lucide-react';

// mockCategories now only defines categories intended for direct display or tabbing.
// Sides and Sauces are still item categories but not primary display categories.
export const mockCategories = [
  { name: 'Base Noodles', icon: Soup },
  { name: 'Drinks', icon: GlassWater },
  // 'Sides' and 'Sauces' are removed from here as they are not main selectable categories for display.
  // Their items will still be used in the CustomizeNoodleModal.
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
    icon: CookingPot,
  },

  // Sides (Add-ons) - These items remain for the CustomizeNoodleModal
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
    icon: Square,
  },
  {
    id: 's3',
    name: 'Siomai',
    description: 'Steamed pork and shrimp dumplings (4 pcs).',
    price: 3.99,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Circle,
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

  // Sauces (Add-ons) - These items remain for the CustomizeNoodleModal
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
    name: 'Pandan Cooler',
    description: 'A refreshing cooler infused with the aromatic flavor of pandan leaves.',
    price: 3.25,
    category: 'Drinks',
    imageUrl: 'https://i.ibb.co/mN0sS92/pandan-cooler.jpg',
    icon: GlassWater,
  },
  {
    id: 'd2',
    name: 'Choco Cooler',
    description: 'A cool and creamy chocolate beverage, perfect for a sweet treat.',
    price: 3.75,
    category: 'Drinks',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: GlassWater,
  },
];

