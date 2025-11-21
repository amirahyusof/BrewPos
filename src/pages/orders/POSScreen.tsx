import React, { useState, useMemo } from "react";
import { ProductCard } from "@/components/pos/ProductCard";
import { OrderSidebar } from "@/components/pos/OrderSidebar";
import type { OrderItem } from "@/components/pos/OrderSidebar";
import { useLocalDB } from "@/hooks/useLocalDB";
import { useProducts } from "@/hooks/useProducts";
import { Search, AlertCircle } from "lucide-react";

export default function POSScreen() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const { addItem } = useLocalDB();
  
  // Get products from IndexedDB via useProducts hook
  const { products, loading, error, getCategories } = useProducts();

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = getCategories();
    return ["All", ...cats];
  }, [getCategories]);

  // Handle adding product to cart
  const handleAdd = (product: typeof products[0]) => {
    if (product.stock <= 0) {
      alert(`${product.name} is out of stock`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        // Check if quantity doesn't exceed stock
        if (existing.qty >= product.stock) {
          alert(`Only ${product.stock} items available in stock`);
          return prev;
        }
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        },
      ];
    });
  };

  // Handle updating quantity
  const handleUpdateQty = (id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  };

  // Handle removing item from cart
  const handleRemove = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.qty * i.price, 0),
      quantity: cart.reduce((sum, i) => sum + i.qty, 0),
      createdAt: new Date().toISOString(),
      synced: false,
    };

    try {
      await addItem("transactions", transaction);
      alert(
        `✅ Order saved!\nOrder ID: ${transaction.id}\nTotal: RM ${transaction.total.toFixed(2)}`
      );
      setCart([]);
    } catch (err) {
      alert("Failed to save order");
      console.error("Checkout error:", err);
    }
  };

  // Handle clear cart
  const handleClear = () => {
    if (cart.length === 0) return;
    if (confirm("Clear cart? This cannot be undone.")) {
      setCart([]);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show empty products state
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Products Available
          </h3>
          <p className="text-gray-600">
            Go to Products section to add menu items
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex gap-4">
      {/* Products Section */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-lg">
        {/* Search and Filter */}
        <div className="bg-white p-4 border-b space-y-3">
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

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition-all ${
                  filterCategory === cat
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} available
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No products found</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    imageUrl: product.imageUrl,
                  }}
                  addToCart={() => handleAdd(product)}
                  outOfStock={product.stock <= 0}
                  stock={product.stock}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Sidebar */}
      <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
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
}

