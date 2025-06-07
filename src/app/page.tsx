
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, ClipboardList } from 'lucide-react'; // Utensils icon is no longer needed here
import Link from 'next/link';
import Image from 'next/image'; // Import next/image

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <Image
          src="https://i.postimg.cc/gkQHSskS/491217354-1444421803583279-4943638660982686923-n-removebg-preview.png"
          alt="Sippin' & Slurpin' Logo"
          width={96} // Using a slightly larger size for the home page hero
          height={96}
          className="mx-auto h-24 w-24 text-primary mb-4" // Retaining size classes for layout consistency, width/height props handle optimization
        />
        <h1 className="text-5xl font-headline font-bold text-primary mb-2">Welcome to Sippin' & Slurpin'!</h1>
        <p className="text-xl text-foreground">
          Your one-stop shop for delicious noodles, drinks, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
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
      </div>
    </div>
  );
}
