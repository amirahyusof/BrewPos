import React, { useState } from 'react';
import { ProductCard } from '@/components/pos/ProductCard';
import { OrderSidebar } from '@/components/pos/OrderSidebar';
import { useLocalDB } from '@/hooks/useLocalDB';


interface Product {
id: string;
name: string;
price: number;
imageUrl?: string;
}


export const POS: React.FC = () => {
const [cart, setCart] = useState<any[]>([]);
const { addItem } = useLocalDB();


const sampleProducts: Product[] = [
{ id: '1', name: 'Latte', price: 8.5 },
{ id: '2', name: 'Americano', price: 7.0 },
{ id: '3', name: 'Cappuccino', price: 9.0 },
];


const handleAdd = (product: Product) => {
setCart(prev => {
const existing = prev.find(p => p.id === product.id);
if (existing) {
return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
}
return [...prev, { ...product, qty: 1 }];
});
};


const handleCheckout = async () => {
if (cart.length === 0) return;
const transaction = {
id: `txn_${Date.now()}`,
items: cart,
total: cart.reduce((sum, i) => sum + i.qty * i.price, 0),
createdAt: new Date().toISOString(),
synced: false,
};
await addItem('local_transactions', transaction);
alert('Transaction saved locally!');
setCart([]);
};


const handleClear = () => setCart([]);


return (
<div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-800">
<div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto">
{sampleProducts.map((product) => (
<ProductCard key={product.id} product={product} onAdd={handleAdd} />
))}
</div>
<OrderSidebar items={cart} onCheckout={handleCheckout} onClear={handleClear} />
</div>
);
};