// src/pages/Products.tsx (UPDATED for Issue #4)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from '@/hooks/useProducts';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const { products, getCategories } = useProducts();

  const categories = getCategories();
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock <= 5).length;


  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
        <p className="text-gray-600 mt-1">Create and manage your menu items</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-amber-600">{totalProducts}</div>
            <p className="text-sm text-gray-600 mt-1">Total Products</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
            <p className="text-sm text-gray-600 mt-1">Categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">RM {totalValue.toFixed(2)}</div>
            <p className="text-sm text-gray-600 mt-1">Inventory Value</p>
          </CardContent>
        </Card>

        <Card className={lowStockProducts > 0 ? 'border-yellow-400' : ''}>
          <CardContent className="pt-6">
            <div className={`text-3xl font-bold ${lowStockProducts > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
              {lowStockProducts}
            </div>
            <p className="text-sm text-gray-600 mt-1">Low Stock Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Action */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Ready to manage products?</h3>
              <p className="text-sm text-gray-600 mt-1">
                Add, edit, or delete menu items. Full CRUD operations with image uploads.
              </p>
            </div>
            <Button
              onClick={() => navigate('/products/list')}
              className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap"
            >
              Manage Products
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Overview */}
      {categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat).length;
                const value = products
                  .filter(p => p.category === cat)
                  .reduce((sum, p) => sum + (p.price * p.stock), 0);
                return (
                  <div
                    key={cat}
                    className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
                  >
                    <p className="font-semibold text-gray-900">{cat}</p>
                    <p className="text-sm text-gray-600 mt-1">{count} products</p>
                    <p className="text-xs text-gray-500 mt-2">Value: RM {value.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alert */}
      {lowStockProducts > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">
                {lowStockProducts} product{lowStockProducts !== 1 ? 's' : ''} running low on stock
              </p>
              <p className="text-sm text-yellow-800 mt-1">
                Consider restocking items with 5 or fewer units in stock.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/products/list?filter=low-stock')}
                className="mt-3 border-yellow-400 text-yellow-700 hover:bg-yellow-100"
              >
                View Products
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-blue-900 mb-3">Product Management Features</h4>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>✅ <strong>Create:</strong> Add new products with images</li>
            <li>✅ <strong>Read:</strong> View all products with search & filter</li>
            <li>✅ <strong>Update:</strong> Edit product details and images</li>
            <li>✅ <strong>Delete:</strong> Remove products with confirmation</li>
            <li>✅ <strong>Upload:</strong> Add product images (max 2MB)</li>
            <li>✅ <strong>Validation:</strong> Form validation and error messages</li>
            <li>✅ <strong>Categories:</strong> Organize by category</li>
            <li>✅ <strong>Search:</strong> Search by name, category, or description</li>
            <li>✅ <strong>Stock Tracking:</strong> Monitor inventory levels</li>
            <li>✅ <strong>Offline:</strong> All data persists locally</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}