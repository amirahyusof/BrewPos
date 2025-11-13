
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus} from 'lucide-react';

export interface OrderItem {
id: string;
name: string;
qty: number;
price: number;
}


interface OrderSidebarProps {
  items: OrderItem[];
  onCheckout: () => void;
  onClear: () => void;
  onUpdateQty?: (id: string, qty: number) => void;
  onRemoveItem?: (id: string) => void;
}


export const OrderSidebar: React.FC<OrderSidebarProps> = ({ items, onCheckout, onClear, onUpdateQty, onRemoveItem }) => {
  
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const tax = total * 0.06;

return (
  <div className="w-full md:w-80 bg-white border-l border-gray-100 flex flex-col justify-between h-full shadow-sm">
    <div className="bg-amber-600 text-white p-4 font-bold flex items-center gap-2">
      <ShoppingCart size={20} />
      Current Order ({items.length})
    </div>
    
    <div className="p-4 overflow-y-auto flex-1">
      {items.length === 0 ? (
      <p className="text-gray-400 text-sm">No items added yet</p>
      ) : (
        items.map(item => (
         <div key={item.id} className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
              <p className="text-xs text-gray-600">RM {item.price.toFixed(2)} each</p>
            </div>
            <button onClick={() => onRemoveItem?.(item.id)} className="text-red-600 hover:text-red-700">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onUpdateQty?.(item.id, item.qty - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-sm">
              <Minus size={14} />
            </button>
            <span className="flex-1 text-center font-semibold">{item.qty}</span>
            <button onClick={() => onUpdateQty?.(item.id, item.qty + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-sm">
              <Plus size={14} />
            </button>
          </div>
          <div className="text-right font-bold text-amber-600">RM {(item.qty * item.price).toFixed(2)}</div>
        </div>
        ))
      )}
    </div>

    {items.length > 0 && (
      <div className="border-t p-4 space-y-3 border-gray-200">
        <div className="flex justify-between mb-3 text-gray-700 text-sm">
          <span className="font-medium">Subtotal:</span>
          <span className="font-semibold">RM {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-3 text-gray-700 text-sm">
          <span className="font-medium">Tax:</span>
          <span className="font-semibold">RM {tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-amber-600 border-t pt-2">
          <span className="font-medium">Total:</span>
          <span className="font-semibold">RM {(total + tax).toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button disabled={!items.length} onClick={onCheckout} className="w-full bg-green-600 hover:bg-green-700 text-white mb-2">
            Checkout
          </Button>
          <Button variant="outline" onClick={onClear}  className="w-full bg-gray-400 hover:bg-gray-500 font-semibold transition">
            Clear
          </Button>
        </div>
      </div>
    )}
  </div>
  );
};