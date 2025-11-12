import React from 'react';
import { Button } from "@/components/ui/button";


interface OrderItem {
id: string;
name: string;
qty: number;
price: number;
}


interface OrderSidebarProps {
items: OrderItem[];
onCheckout: () => void;
onClear: () => void;
}


export const OrderSidebar: React.FC<OrderSidebarProps> = ({ items, onCheckout, onClear }) => {
const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);


return (
  <div className="w-full md:w-80 bg-white border-l border-gray-100 flex flex-col justify-between h-full shadow-sm">
    <div className="p-4 overflow-y-auto flex-1">
      <h2 className="font-semibold text-lg mb-3">🧾 Current Order</h2>
      {items.length === 0 ? (
      <p className="text-gray-400 text-sm">No items added yet</p>
      ) : (
        <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="flex justify-between text-sm border-b pb-1">
            <span>{item.name} × {item.qty}</span>
            <span>RM {(item.qty * item.price).toFixed(2)}</span>
          </li>
        ))}
        </ul>
      )}
    </div>


    <div className="border-t border-gray-200 p-4">
      <div className="flex justify-between mb-3 text-gray-700">
        <span className="font-medium">Total:</span>
        <span className="font-semibold">RM {total.toFixed(2)}</span>
      </div>
      <Button disabled={!items.length} onClick={onCheckout} className="w-full bg-amber-600 hover:bg-amber-700 mb-2">
        Checkout
      </Button>
      <Button variant="outline" onClick={onClear} className="w-full">
        Clear
      </Button>
    </div>
  </div>
  );
};