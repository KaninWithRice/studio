"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useNoodleContext } from "@/hooks/useNoodleContext";
import type { Order, OrderStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle2,
  ChefHat,
  Clock,
  FileText,
  PackageCheck,
  ShoppingBasket,
  Utensils,
} from "lucide-react";

interface KitchenOrderCardProps {
  order: Order;
}

const statusIcons: Record<OrderStatus, React.ElementType> = {
  New: ShoppingBasket,
  Preparing: ChefHat,
  Ready: PackageCheck,
  Served: CheckCircle2,
  Cancelled: Clock, // Or a cancel icon
};

const orderStatusOptions: OrderStatus[] = [
  "New",
  "Preparing",
  "Ready",
  "Served",
  "Cancelled",
];

export default function KitchenOrderCard({ order }: KitchenOrderCardProps) {
  const { updateOrderStatus } = useNoodleContext();

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  const StatusIcon = statusIcons[order.status || "New"] || FileText;

  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-headline">
          <span>Order #{order.id ? order.id.slice(-5) : "N/A"}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {order.createdAt
              ? formatDistanceToNow(new Date(order.createdAt), {
                  addSuffix: true,
                })
              : "Unknown time"}
          </span>
        </CardTitle>
        <CardDescription>
          Customer: {order.customerName || "Unknown"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-2">
          <StatusIcon className="h-5 w-5 text-primary" />
          <span
            className={`font-semibold ${
              order.status === "New"
                ? "text-destructive"
                : order.status === "Ready"
                ? "text-green-600"
                : "text-primary"
            }`}
          >
            Status: {order.status}
          </span>
        </div>
        <Separator className="my-2" />
        <h4 className="font-semibold mb-1 text-foreground/80">Items:</h4>
        <ul className="list-disc pl-5 space-y-1 max-h-40 overflow-y-auto pr-2">
          {order.items && order.items.length > 0 ? (
            order.items.map((cartItem, index) => (
              <li key={index} className="text-sm">
                {cartItem.menuItem?.name || "Unknown item"} (x
                {cartItem.quantity || 0})
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">No items found</li>
          )}
        </ul>
        <Separator className="my-2" />
        <p className="font-bold text-lg text-primary">
          Total: ${order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center gap-2">
        <Select
          value={order.status || "New"}
          onValueChange={(value: OrderStatus) => handleStatusChange(value)}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-card">
            <SelectValue placeholder="Update status" />
          </SelectTrigger>
          <SelectContent>
            {orderStatusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            /* Potentially add other actions like print ticket */
          }}
        >
          <Utensils className="mr-2 h-4 w-4" /> Details
        </Button>
      </CardFooter>
    </Card>
  );
}
