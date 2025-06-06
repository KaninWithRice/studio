
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

  const categories = mockCategories.map(cat => cat.name);
  // Filter categories to only show those that have items
  const availableCategories = ['All', ...categories.filter(cat => menuItems.some(item => item.category === cat))];


  return (
    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {availableCategories.map((category) => {
          const Icon = category === 'All' ? undefined : getCategoryIcon(category);
          return (
            <TabsTrigger key={category} value={category} className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {Icon && <Icon className="h-4 w-4" />}
              {category}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
