import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Search, Plus, Filter, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

export const ProductListCard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading, error, deleteProduct, searchProducts, getCategories } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = getCategories();

  // Check if navigated from Categories page with filter
  useEffect(() => {
    if (location.state?.filterCategory) {
      setCategoryFilter(location.state.filterCategory);
      // Clear the state so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = searchProducts(searchTerm);
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    return result;
  }, [products, searchTerm, categoryFilter, searchProducts]);

  // Handle delete product
  const handleDeleteProduct = async (id: string) => {
    setSubmitting(true);
    try {
      const success = await deleteProduct(id);
      if (success) {
        setDeleteConfirm(null);
        toast.success('Product deleted successfully!');
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

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          ❌ {error}
        </div>
      )}

      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            {categoryFilter 
              ? `${filteredProducts.length} products in "${categoryFilter}"`
              : `Manage your menu items (${filteredProducts.length} total)`
            }
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

      {/* Search and Filter Box */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Search */}
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

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter size={16} />
                <span className="font-medium">Filter by category:</span>
              </div>
              
              <Button
                variant={categoryFilter === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('')}
                className={categoryFilter === '' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                All
              </Button>

              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  className={categoryFilter === cat ? 'bg-amber-600 hover:bg-amber-700' : ''}
                >
                  {cat}
                  {categoryFilter === cat && (
                    <X size={14} className="ml-1" />
                  )}
                </Button>
              ))}
            </div>
          )}

          {/* Active Filters Display */}
          {(searchTerm || categoryFilter) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X size={14} />
                  </button>
                </span>
              )}
              {categoryFilter && (
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center gap-1">
                  Category: {categoryFilter}
                  <button onClick={() => setCategoryFilter('')} className="hover:bg-amber-200 rounded-full p-0.5">
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
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
                {searchTerm || categoryFilter
                  ? 'No products match your filters'
                  : 'No products yet'
                }
              </p>
              {!searchTerm && !categoryFilter && (
                <Button
                  onClick={() => navigate('/products/add')}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Add Your First Product
                </Button>
              )}
              {(searchTerm || categoryFilter) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                  }}
                >
                  Clear Filters
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
                        <button
                          onClick={() => setCategoryFilter(product.category)}
                          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors"
                        >
                          {product.category}
                        </button>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-96 shadow-2xl">
            <CardHeader className="border-b">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <Trash2 size={20} />
                Delete Product?
              </CardTitle>
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