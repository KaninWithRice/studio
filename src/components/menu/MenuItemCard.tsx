
"use client";
import Image from 'next/image';
import type { MenuItem as MenuItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import CustomizeNoodleModal from './CustomizeNoodleModal'; // Import the modal

interface MenuItemCardProps {
  item: MenuItemType;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useNoodleContext();
  const { toast } = useToast();
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [selectedNoodleForCustomization, setSelectedNoodleForCustomization] = useState<MenuItemType | null>(null);

  const handleAddToCartDirectly = () => {
    // Only for drinks or items that don't need customization
    addToCart(item, [], 1); // Drinks have no selected addons
    toast({
      title: `${item.name} added to cart!`,
      description: "You can adjust quantity in your cart.",
    });
  };

  const handleOpenCustomizeModal = () => {
    setSelectedNoodleForCustomization(item);
    setIsCustomizeModalOpen(true);
  };

  const handleCloseCustomizeModal = () => {
    setIsCustomizeModalOpen(false);
    setSelectedNoodleForCustomization(null);
  };
  
  const handleCardAction = () => {
    if (item.category === 'Drinks') {
      handleAddToCartDirectly();
    } else if (item.category === 'Base Noodles') {
      handleOpenCustomizeModal();
    } else if (item.category === 'Sides' || item.category === 'Sauces') {
      toast({
        title: `${item.name} is an add-on`,
        description: "Please select a base noodle to add this item via the customize option.",
        variant: "default", 
      });
    } else {
      // Fallback for any other category
      addToCart(item, [], 1); 
      toast({
        title: `${item.name} added to cart!`,
      });
    }
  };

  const IconComponent = item.icon;
  const isBaseNoodle = item.category === 'Base Noodles';
  const canDirectlyAddToCart = item.category === 'Drinks';

  return (
    <>
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        {item.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={`${item.category.toLowerCase()} food`}
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
            {item.name}
          </CardTitle>
          <CardDescription className="text-sm h-12 overflow-hidden text-ellipsis">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-lg font-semibold text-primary">${item.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleCardAction} 
            className="w-full"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            {isBaseNoodle ? "Customize" : (canDirectlyAddToCart ? "Add to Cart" : "View Options")}
          </Button>
        </CardFooter>
      </Card>

      {selectedNoodleForCustomization && (
        <CustomizeNoodleModal
          isOpen={isCustomizeModalOpen}
          onClose={handleCloseCustomizeModal}
          baseNoodle={selectedNoodleForCustomization}
        />
      )}
    </>
  );
}
