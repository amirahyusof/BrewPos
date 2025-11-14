import { useState } from "react";
import { ProductCard } from "@/components/pos/ProductCard";
import { OrderSidebar } from "@/components/pos/OrderSidebar";
import type { OrderItem } from "@/components/pos/OrderSidebar";
import { useLocalDB } from "@/hooks/useLocalDB";
import { Search } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: string;
}

export default function POSScreen(){
  const [cart, setCart] = useState<OrderItem[]>([]);
  const { addItem } = useLocalDB();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const sampleProducts: Product[] = [
    { id: "1", name: "Latte", price: 8.5, category: "Coffee" },
    { id: "2", name: "Americano", price: 7.0, category: "Coffee" },
    { id: "3", name: "Cappuccino", price: 9.0, category: "Coffee" },
    { id: "4", name: "Oolong Tea", price: 5.0, category: "Tea" },
    { id: "5", name: "Green Tea", price: 4.5, category: "Tea" },
    { id: "6", name: "Black Tea", price: 5.5, category: "Tea" },
  ];

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  };

  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
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

    await addItem("local_transactions", transaction);
    alert("Transaction saved locally!");
    setCart([]);
  };

  const handleClear = () => setCart([]);

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(sampleProducts.map((p) => p.category))];

  return (
    <div className="h-screen flex">
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1 rounded-full whitespace-nowrap transition ${
                  filterCategory === cat
                    ? "bg-amber-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => handleAdd(product)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-50 -mt-4 text-gray-800 overflow-hidden border-l border-gray-200">
        <OrderSidebar
          items={cart}
          onCheckout={handleCheckout}
          onClear={handleClear}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemove}
        />
      </div>
    </div>
  );
};
