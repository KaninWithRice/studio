
"use client";
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { Button } from '@/components/ui/button';
// Utensils icon is no longer needed here directly
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Customer Menu' },
  { href: '/kitchen/orders', label: 'Kitchen View' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:text-accent-foreground transition-colors">
          <Image 
            src="https://i.postimg.cc/gkQHSskS/491217354-1444421803583279-4943638660982686923-n-removebg-preview.png" 
            alt="Sippin' & Slurpin' Logo" 
            width={40} // Adjusted size for the logo
            height={40}
            className="h-10 w-10" // Keeping a similar size class, width/height props handle optimization
          />
          <h1 className="text-2xl font-headline font-semibold">Sippin' & Slurpin'</h1>
        </Link>
        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? 'secondary' : 'ghost'}
              asChild
              className={cn(
                "text-primary-foreground hover:bg-primary/80 hover:text-accent-foreground",
                pathname === link.href && "bg-accent text-accent-foreground hover:bg-accent/90"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
