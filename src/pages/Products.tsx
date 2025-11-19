import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, AlertCircle } from "lucide-react";

export default function Products() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-1">Create and manage your menu items</p>
        </div>
        <Button 
          onClick={() => navigate('/products/add')}
          className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products/list')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">24</div>
            <p className="text-gray-700 font-medium">Products</p>
            <p className="text-sm text-gray-500 mt-1">Click to view all</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products/add')}>
          <CardContent className="pt-6 text-center">
            <Plus className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-gray-700 font-medium">Add Product</p>
            <p className="text-sm text-gray-500 mt-1">Click to add new</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/products/categories')}>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
            <p className="text-gray-700 font-medium">Categories</p>
            <p className="text-sm text-gray-500 mt-1">Click to manage</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['Coffee', 'Tea', 'Food', 'Desserts', 'Beverages', 'Snacks'].map((cat) => (
              <div key={cat} className="bg-gray-100 rounded-lg p-4 text-center hover:bg-amber-100 transition-colors">
                <p className="font-semibold text-gray-900">{cat}</p>
                <p className="text-sm text-gray-600 mt-1">4 products</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-900">
              <strong>Product Management:</strong> Full CRUD operations (Create, Read, Update, Delete) are implemented in the detailed product pages.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}