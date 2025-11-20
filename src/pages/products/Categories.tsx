// src/pages/products/Categories.tsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Package, 
  TrendingUp,
  AlertCircle,
  X,
  Check
} from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { toast } from 'sonner';

interface CategoryStats {
  name: string;
  productCount: number;
  totalValue: number;
  totalStock: number;
}

export default function Categories() {
  const navigate = useNavigate();
  const { products, getCategories, updateProduct } = useProducts();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Calculate category statistics
  const categoryStats: CategoryStats[] = useMemo(() => {
    const categories = getCategories();
    
    return categories.map(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const totalValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
      const totalStock = categoryProducts.reduce((sum, p) => sum + p.stock, 0);
      
      return {
        name: category,
        productCount: categoryProducts.length,
        totalValue,
        totalStock,
      };
    }).sort((a, b) => b.productCount - a.productCount); // Sort by product count
  }, [products, getCategories]);

  // Handle add new category
  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim();
    
    if (!trimmed) {
      toast.error('Category name cannot be empty');
      return;
    }

    if (categoryStats.some(cat => cat.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error('Category already exists');
      return;
    }

    // Category will be created when first product is added to it
    toast.success(`Category "${trimmed}" ready to use`);
    setNewCategoryName('');
    setShowAddForm(false);
  };

  // Handle rename category
  const handleRenameCategory = async (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    
    if (!trimmed) {
      toast.error('Category name cannot be empty');
      return;
    }

    if (trimmed.toLowerCase() === oldName.toLowerCase()) {
      setEditingCategory(null);
      return;
    }

    if (categoryStats.some(cat => cat.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error('Category name already exists');
      return;
    }

    // Update all products with this category
    const productsToUpdate = products.filter(p => p.category === oldName);
    
    try {
      for (const product of productsToUpdate) {
        await updateProduct(product.id, { category: trimmed });
      }
      
      toast.success(`Renamed "${oldName}" to "${trimmed}"`);
      setEditingCategory(null);
    } catch (error) {
      toast.error('Failed to rename category');
      console.error('Error renaming category:', error);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryName: string) => {
    const productsInCategory = products.filter(p => p.category === categoryName);
    
    if (productsInCategory.length > 0) {
      toast.error(`Cannot delete category with ${productsInCategory.length} products`);
      setDeleteConfirm(null);
      return;
    }

    toast.success(`Category "${categoryName}" deleted`);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
          <p className="text-gray-600 mt-1">Organize and manage your product categories</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate('/products')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{categoryStats.length}</p>
                <p className="text-sm text-gray-600">Total Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  RM {categoryStats.reduce((sum, cat) => sum + cat.totalValue, 0).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Inventory Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Category Button/Form */}
      {showAddForm ? (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                placeholder="Enter category name..."
                className="flex-1 px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <Button
                onClick={handleAddCategory}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check size={18} />
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCategoryName('');
                }}
              >
                <X size={18} />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Category
        </Button>
      )}

      {/* Categories List */}
      {categoryStats.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Yet</h3>
              <p className="text-gray-600 mb-6">
                Start by adding products with categories to see them here
              </p>
              <Button
                onClick={() => navigate('/products/add')}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Add Your First Product
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((category) => (
            <Card 
              key={category.name}
              className="hover:shadow-lg transition-shadow border-2 hover:border-amber-200"
            >
              <CardHeader className="pb-3">
                {editingCategory === category.name ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={category.name}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRenameCategory(category.name, e.currentTarget.value);
                        } else if (e.key === 'Escape') {
                          setEditingCategory(null);
                        }
                      }}
                      className="flex-1 px-3 py-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                      autoFocus
                      onBlur={(e) => handleRenameCategory(category.name, e.target.value)}
                    />
                  </div>
                ) : (
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl">{category.name}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingCategory(category.name)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(category.name)}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                        disabled={category.productCount > 0}
                      >
                        <Trash2 
                          size={16} 
                          className={category.productCount > 0 ? 'text-gray-300' : 'text-red-600'}
                        />
                      </button>
                    </div>
                  </CardTitle>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Product Count */}
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Products</span>
                  <span className="font-semibold text-gray-900">
                    {category.productCount}
                  </span>
                </div>

                {/* Total Stock */}
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-gray-600">Total Stock</span>
                  <span className={`font-semibold ${
                    category.totalStock > 50 
                      ? 'text-green-600' 
                      : category.totalStock > 20 
                      ? 'text-yellow-600' 
                      : 'text-red-600'
                  }`}>
                    {category.totalStock} units
                  </span>
                </div>

                {/* Total Value */}
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Inventory Value</span>
                  <span className="font-bold text-amber-600">
                    RM {category.totalValue.toFixed(2)}
                  </span>
                </div>

                {/* View Products Button */}
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    navigate('/products/list', { 
                      state: { filterCategory: category.name } 
                    });
                  }}
                >
                  View Products
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Category Management Tips</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <strong>Rename:</strong> Click the edit icon to rename a category</li>
                <li>• <strong>Delete:</strong> Categories with products cannot be deleted</li>
                <li>• <strong>Auto-creation:</strong> Categories are created when you add products</li>
                <li>• <strong>Best practice:</strong> Keep category names short and descriptive</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-96 shadow-2xl">
            <CardHeader className="bg-red-50 border-b">
              <CardTitle className="text-red-900 flex items-center gap-2">
                <Trash2 size={20} />
                Delete Category?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {(() => {
                const category = categoryStats.find(c => c.name === deleteConfirm);
                if (!category) return null;

                if (category.productCount > 0) {
                  return (
                    <>
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-yellow-900">Cannot Delete</p>
                          <p className="text-sm text-yellow-800 mt-1">
                            This category has {category.productCount} product(s). 
                            Delete or move all products first.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirm(null)}
                        className="w-full"
                      >
                        Close
                      </Button>
                    </>
                  );
                }

                return (
                  <>
                    <p className="text-gray-700">
                      Are you sure you want to delete the category <strong>"{deleteConfirm}"</strong>?
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteCategory(deleteConfirm)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}