import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Search, Plus } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ProductForm } from './ProductForm';
import type { Product, CreateProductInput } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export const ProductListCard: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, error, addProduct, updateProduct, deleteProduct, searchProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return searchProducts(searchTerm);
  }, [products, searchTerm, searchProducts]);

  // Handle add product
  const handleAddProduct = async (data: CreateProductInput) => {
    setSubmitting(true);
    try {
      const result = await addProduct(data);
      if (result) {
        setShowForm(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle update product
  const handleUpdateProduct = async (data: CreateProductInput) => {
    if (!editingProduct) return;
    setSubmitting(true);
    try {
      const result = await updateProduct(editingProduct.id, data);
      if (result) {
        setEditingProduct(null);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id: string) => {
    setSubmitting(true);
    try {
      const success = await deleteProduct(id);
      if (success) {
        setDeleteConfirm(null);
      }
    } finally {
      setSubmitting(false);
    }
  };

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

  // Show form when adding or editing
  if (showForm || editingProduct) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <Button
            variant="outline"
            onClick={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          >
            ← Back
          </Button>
        </div>
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          initialData={editingProduct || undefined}
          loading={submitting}
          isEditing={!!editingProduct}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your menu items ({filteredProducts.length} total)
          </p>
        </div>
        <Button
           onClick={() => navigate('/products/add')}
          className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ❌ {error}
        </div>
      )}

      {/* Search Box */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'No products match your search' : 'No products yet'}
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Add Your First Product
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Category</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Price</th>
                    <th className="text-center p-3 font-semibold text-gray-700">Stock</th>
                    <th className="text-center p-3 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            {product.description && (
                              <p className="text-xs text-gray-500 truncate max-w-xs">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-3 text-right font-semibold text-gray-900">
                        RM {product.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock > 10
                              ? 'bg-green-100 text-green-800'
                              : product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-3 text-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                          className="inline-flex items-center gap-1"
                        >
                          <Edit2 size={16} />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDeleteConfirm(product.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 border-red-300"
                        >
                          <Trash2 size={16} />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Delete Product?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => handleDeleteProduct(deleteConfirm)}
                  disabled={submitting}
                >
                  {submitting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}