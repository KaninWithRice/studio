
"use client";
import Image from 'next/image';
import type { MenuItem as MenuItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItemType;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useNoodleContext();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (item.category === 'Drinks') {
      addToCart(item, [], 1); // Drinks have no selected addons
      toast({
        title: `${item.name} added to cart!`,
        description: "You can adjust quantity in your cart.",
      });
    } else if (item.category === 'Base Noodles') {
      // This is where we would open a customization modal
      // For now, let's prevent adding directly and inform the user
      toast({
        title: `Customize ${item.name}`,
        description: "Please select this noodle to customize with add-ons (modal coming soon!).",
        variant: "default",
      });
      // Or, if we wanted to allow adding base noodle without addons directly for testing:
      // addToCart(item, [], 1);
      // toast({
      //   title: `${item.name} added (without add-ons).`,
      //   description: "Customize option coming soon.",
      // });
    } else if (item.category === 'Sides' || item.category === 'Sauces') {
      toast({
        title: `${item.name} is an add-on`,
        description: "Please select a base noodle to add this item.",
        variant: "default", 
      });
    } else {
      // Fallback for any other category, though unlikely with current setup
      addToCart(item, [], 1); 
      toast({
        title: `${item.name} added to cart!`,
      });
    }
  };

  const IconComponent = item.icon;

  // Determine if the "Add to Cart" button should be shown/enabled
  // For Base Noodles, it will eventually trigger a modal. For Drinks, it adds directly.
  // For Sides/Sauces, direct add from card is discouraged in the new model.
  const canDirectlyAddToCart = item.category === 'Drinks';
  const isBaseNoodle = item.category === 'Base Noodles';
  // Button text logic can be enhanced later based on modal flow.

  return (
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
        {/* For Base Noodles, this button will eventually open a modal.
            For Drinks, it adds directly.
            For Sides/Sauces, it's currently a toast message. Consider disabling or changing text.
        */}
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          // Potentially disable if it's a Side/Sauce and we don't want direct add:
          // disabled={item.category === 'Sides' || item.category === 'Sauces'}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          {isBaseNoodle ? "Customize" : (canDirectlyAddToCart ? "Add to Cart" : "View Options")}
        </Button>
      </CardFooter>
    </Card>
  );
}
