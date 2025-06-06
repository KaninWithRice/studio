
"use client";
import KitchenOrderCard from '@/components/kitchen/KitchenOrderCard';
import { useNoodleContext } from '@/hooks/useNoodleContext';
import type { OrderStatus } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from 'react';

const TABS_CONFIG: { value: OrderStatus | 'All'; label: string }[] = [
  { value: 'All', label: 'All Orders' },
  { value: 'New', label: 'New' },
  { value: 'Preparing', label: 'Preparing' },
  { value: 'Ready', label: 'Ready' },
  { value: 'Served', label: 'Served' },
  { value: 'Cancelled', label: 'Cancelled' },
];

export default function KitchenOrdersPage() {
  const { orders } = useNoodleContext();
  const [activeTab, setActiveTab] = useState<OrderStatus | 'All'>('All');

  const filteredOrders = useMemo(() => {
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (activeTab === 'All') {
      return sortedOrders;
    }
    return sortedOrders.filter(order => order.status === activeTab);
  }, [orders, activeTab]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold text-center mb-8 text-primary">
        Kitchen Order Display
      </h1>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrderStatus | 'All')} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {TABS_CONFIG.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filteredOrders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <KitchenOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">
          No orders match the current filter.
        </p>
      )}
    </div>
  );
}
