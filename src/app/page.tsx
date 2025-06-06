import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, ShoppingCart, ClipboardList, Settings } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <Utensils className="mx-auto h-24 w-24 text-primary mb-4" />
        <h1 className="text-5xl font-headline font-bold text-primary mb-2">Welcome to Noodle Hub!</h1>
        <p className="text-xl text-foreground">
          Your one-stop shop for delicious noodles and more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Customer Menu
            </CardTitle>
            <CardDescription>Browse our delicious menu and place your order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/menu">Go to Menu</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ClipboardList className="h-6 w-6 text-primary" />
              Kitchen View
            </CardTitle>
            <CardDescription>See incoming orders and manage their status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/kitchen/orders">Open Kitchen Display</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Settings className="h-6 w-6 text-primary" />
              Admin Panel
            </CardTitle>
            <CardDescription>Manage the menu by uploading an Excel file.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/admin/menu-management">Menu Management</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
