
import type { MenuItem } from '@/types';
import { Soup, GlassWater, Egg, Leaf, CookingPot, Square, Circle, Blend, CupSoda } from 'lucide-react'; // Added CupSoda for Bottled Water

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
    imageUrl: 'https://i.postimg.cc/Vv7Dkcwm/494818606-705953962383271-6306270323901820584-n.png',
    icon: Soup,
  },
  {
    id: 'bn2',
    name: 'Lucky Me! Pancit Canton Sweet and Spicy',
    description: 'Stir-fried noodles with a delightful blend of sweet and spicy notes.',
    price: 6.99,
    category: 'Base Noodles',
    imageUrl: 'https://i.postimg.cc/xTGn1xJh/494825430-631164829981102-8060055739963445748-n-1.png',
    icon: Soup,
  },
  {
    id: 'bn3',
    name: 'Samyang Buldak Ramen',
    description: 'Spicy Korean chicken ramen with a creamy twist.',
    price: 8.99,
    category: 'Base Noodles',
    imageUrl: 'https://i.postimg.cc/KzTCsjtw/494862838-1966220937517772-2580075167850733316-n.png',
    icon: CookingPot,
  },

  // Sides (Add-ons) - These items remain for the CustomizeNoodleModal
  {
    id: 's1-fried',
    name: 'Egg (Fried)',
    description: 'A perfectly cooked fried egg.',
    price: 1.50,
    category: 'Sides',
    imageUrl: 'https://placehold.co/600x400.png',
    icon: Egg,
  },
  {
    id: 's1-boiled',
    name: 'Egg (Boiled)',
    description: 'A perfectly cooked boiled egg.',
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
    imageUrl: 'https://i.postimg.cc/QNnQCm58/494857294-708875265242364-971137207945955177-n.png',
    icon: GlassWater,
  },
  {
    id: 'd2',
    name: 'Choco Cooler',
    description: 'A cool and creamy chocolate beverage, perfect for a sweet treat.',
    price: 3.75,
    category: 'Drinks',
    imageUrl: 'https://i.postimg.cc/brMk5Y8D/494859236-1685295855493847-6118392729639336969-n.png',
    icon: GlassWater,
  },
  {
    id: 'd3',
    name: 'Bottled Water',
    description: 'Crisp and refreshing bottled spring water.',
    price: 1.50,
    category: 'Drinks',
    imageUrl: 'https://i.postimg.cc/hvhVMQFR/494813963-1388083395571994-4303440077336902831-n.png',
    icon: CupSoda, // Using CupSoda for bottled water, can be changed
  },
];
