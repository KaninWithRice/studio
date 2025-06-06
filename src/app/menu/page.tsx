
"use client";
import { useState, useMemo } from 'react';
import MenuItemCard from '@/components/menu/MenuItemCard';
import OrderCart from '@/components/menu/OrderCart';
import CategoryTabs from '@/components/menu/CategoryTabs';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MenuPage() {
  const { menuItems } = useNoodleContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenuItems = useMemo(() => {
    return menuItems
      .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [menuItems, selectedCategory, searchTerm]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-8 text-primary">
        Our Delicious Menu
      </h1>
      
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search for your favorite dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
      </div>

      <CategoryTabs selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-3">
          {filteredMenuItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-lg col-span-full py-10">
              No items match your current filter. Try adjusting your search or category!
            </p>
          )}
        </div>
        <div className="md:col-span-1">
          <OrderCart />
        </div>
      </div>
    </div>
  );
}
