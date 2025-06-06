
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Utensils } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Customer Menu' },
  { href: '/kitchen/orders', label: 'Kitchen View' },
  // { href: '/admin/menu-management', label: 'Admin Upload' }, // Admin link removed
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground hover:text-accent-foreground transition-colors">
          <Utensils className="h-8 w-8" />
          <h1 className="text-2xl font-headline font-semibold">Noodle Hub</h1>
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
