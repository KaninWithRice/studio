
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { NoodleProvider } from '@/context/NoodleContext';
import SiteHeader from '@/components/common/SiteHeader';

export const metadata: Metadata = {
  title: "Sippin' & Slurpin'",
  description: 'Order your favorite noodles and drinks!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <NoodleProvider>
          <SiteHeader />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </NoodleProvider>
      </body>
    </html>
  );
}
