
"use client";

import type { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNoodleContext } from "@/hooks/useNoodleContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useMemo } from "react";
import { PlusCircle } from "lucide-react";

interface CustomizeNoodleModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseNoodle: MenuItem | null;
}

export default function CustomizeNoodleModal({
  isOpen,
  onClose,
  baseNoodle,
}: CustomizeNoodleModalProps) {
  const { menuItems, addToCart } = useNoodleContext();
  const { toast } = useToast();
  const [selectedAddons, setSelectedAddons] = useState<MenuItem[]>([]);
  const [quantity, setQuantity] = useState(1); // For future quantity selection

  const availableSides = useMemo(
    () => menuItems.filter((item) => item.category === "Sides"),
    [menuItems]
  );
  const availableSauces = useMemo(
    () => menuItems.filter((item) => item.category === "Sauces"),
    [menuItems]
  );

  useEffect(() => {
    // Reset selected addons when modal opens for a new noodle or closes
    if (isOpen) {
      setSelectedAddons([]);
      setQuantity(1);
    }
  }, [isOpen, baseNoodle]);

  if (!baseNoodle) {
    return null;
  }

  const handleAddonChange = (addon: MenuItem, checked: boolean) => {
    setSelectedAddons((prev) =>
      checked ? [...prev, addon] : prev.filter((item) => item.id !== addon.id)
    );
  };

  const handleAddToCart = () => {
    if (baseNoodle) {
      addToCart(baseNoodle, selectedAddons, quantity);
      toast({
        title: `${baseNoodle.name} added to cart!`,
        description: `${selectedAddons.length > 0 ? `With ${selectedAddons.map(a => a.name).join(', ')}.` : ''} You can adjust quantity in your cart.`,
      });
      onClose(); // Close modal after adding to cart
    }
  };

  const currentTotal =
    (baseNoodle.price +
      selectedAddons.reduce((sum, addon) => sum + addon.price, 0)) *
    quantity;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[525px] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-primary">
            Customize {baseNoodle.name}
          </DialogTitle>
          <DialogDescription>
            Base Price: ₱{baseNoodle.price.toFixed(2)}. Select your add-ons below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] p-1">
          <div className="grid gap-6 py-4">
            {availableSides.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Sides</h3>
                <div className="grid gap-3">
                  {availableSides.map((side) => (
                    <div
                      key={side.id}
                      className="flex items-center space-x-3 p-3 rounded-md border border-border bg-background/50 hover:bg-accent/10 transition-colors"
                    >
                      <Checkbox
                        id={`addon-${side.id}`}
                        checked={selectedAddons.some(
                          (item) => item.id === side.id
                        )}
                        onCheckedChange={(checked) =>
                          handleAddonChange(side, !!checked)
                        }
                        aria-label={`Select ${side.name}`}
                      />
                      <Label
                        htmlFor={`addon-${side.id}`}
                        className="flex-grow cursor-pointer text-foreground"
                      >
                        {side.name}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        +₱{side.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {availableSauces.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">Sauces</h3>
                <div className="grid gap-3">
                  {availableSauces.map((sauce) => (
                    <div
                      key={sauce.id}
                      className="flex items-center space-x-3 p-3 rounded-md border border-border bg-background/50 hover:bg-accent/10 transition-colors"
                    >
                      <Checkbox
                        id={`addon-${sauce.id}`}
                        checked={selectedAddons.some(
                          (item) => item.id === sauce.id
                        )}
                        onCheckedChange={(checked) =>
                          handleAddonChange(sauce, !!checked)
                        }
                        aria-label={`Select ${sauce.name}`}
                      />
                      <Label
                        htmlFor={`addon-${sauce.id}`}
                        className="flex-grow cursor-pointer text-foreground"
                      >
                        {sauce.name}
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        +₱{sauce.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-between items-center pt-4 border-t border-border">
          <div className="text-xl font-bold text-primary">
            Total: ₱{currentTotal.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddToCart}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
