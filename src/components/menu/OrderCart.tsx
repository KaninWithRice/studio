
"use client";
import { useState } from 'react';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, MinusCircle, PlusCircle, XCircle } from 'lucide-react';

export default function OrderCart() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal, addOrder, clearCart } = useNoodleContext();
  const [customerName, setCustomerName] = useState('');
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      toast({
        title: "Customer Name Required",
        description: "Please enter your name to place the order.",
        variant: "destructive",
      });
      return;
    }
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }
    const newOrder = addOrder(customerName);
    if (newOrder) {
      toast({
        title: "Order Placed!",
        description: `Thank you, ${customerName}! Your order #${newOrder.id.slice(-5)} has been placed.`,
      });
      setCustomerName('');
    }
  };

  if (cart.length === 0) {
    return (
      <Card className="sticky top-24 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline"><ShoppingCart className="h-6 w-6" /> Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your cart is empty. Add some delicious noodles!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-headline">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Your Cart
          </div>
          {cart.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearCart} className="text-destructive border-destructive hover:bg-destructive/10">
              <XCircle className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          )}
        </CardTitle>
        <CardDescription>Review your items and place your order.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4 mb-4">
          {cart.map((item) => (
            <div key={item.menuItem.id} className="mb-3 pb-3 border-b border-border last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{item.menuItem.name}</p>
                  <p className="text-sm text-muted-foreground">${item.menuItem.price.toFixed(2)} each</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.menuItem.id)} className="text-destructive hover:text-destructive h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity - 1)} className="h-7 w-7">
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateCartItemQuantity(item.menuItem.id, parseInt(e.target.value) || 0)}
                  className="w-16 h-7 text-center px-1"
                  min="0"
                />
                <Button variant="outline" size="icon" onClick={() => updateCartItemQuantity(item.menuItem.id, item.quantity + 1)} className="h-7 w-7">
                  <PlusCircle className="h-4 w-4" />
                </Button>
                <p className="ml-auto font-medium">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <Separator className="my-4" />
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-foreground">Your Name</Label>
          <Input 
            id="customerName" 
            placeholder="Enter your name" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="bg-background"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex justify-between w-full text-xl font-bold">
          <span>Total:</span>
          <span className="text-primary">${getCartTotal().toFixed(2)}</span>
        </div>
        <Button onClick={handlePlaceOrder} className="w-full" size="lg" disabled={!customerName.trim()}>
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
}
