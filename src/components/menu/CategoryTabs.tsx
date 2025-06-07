
"use client";
import type { Dispatch, SetStateAction } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { mockCategories } from '@/lib/mockData'; // Using mockCategories to define available tabs

interface CategoryTabsProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

export default function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  const { menuItems, getCategoryIcon } = useNoodleContext();

  // Define which categories should appear as tabs
  const displayableCategories = ['All', ...mockCategories.filter(cat => cat.name === 'Base Noodles' || cat.name === 'Drinks').map(cat => cat.name)];

  // Further filter these displayable categories to only show those that actually have items
  const availableTabs = displayableCategories.filter(cat => {
    if (cat === 'All') return true; // 'All' tab is always available
    return menuItems.some(item => item.category === cat);
  });


  return (
    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {availableTabs.map((category) => {
          // Find the original category object to get its icon, if it's not 'All'
          const categoryObj = mockCategories.find(c => c.name === category);
          const Icon = category === 'All' ? undefined : (categoryObj ? getCategoryIcon(categoryObj.name) : undefined);
          
          return (
            <TabsTrigger 
              key={category} 
              value={category} 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
