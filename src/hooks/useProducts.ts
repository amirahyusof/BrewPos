// src/hooks/useProducts.ts - FIXED OFFLINE SUPPORT
import { useState, useEffect } from 'react';
import { useLocalDB } from './useLocalDB';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  imageUrl?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, getAll, updateItem, deleteItem } = useLocalDB();

  // Load all products from IndexedDB
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading products from IndexedDB...');
      
      const allProducts = (await getAll('products')) || [];
      console.log(`Loaded ${allProducts.length} products from IndexedDB`);
      
      setProducts(allProducts);
    } catch (err) {
      const errorMsg = 'Failed to load products';
      setError(errorMsg);
      console.error('Error loading products:', err);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Add new product
  const addProduct = async (input: CreateProductInput): Promise<Product | null> => {
    try {
      const newProduct: Product = {
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Adding product to IndexedDB:', newProduct.name);
      await addItem('products', newProduct);
      
      setProducts((prev) => [...prev, newProduct]);
      console.log('Product added successfully');
      return newProduct;
    } catch (err) {
      const errorMsg = 'Failed to add product';
      setError(errorMsg);
      console.error('Error adding product:', err);
      toast.error(errorMsg);
      return null;
    }
  };

  // Update product
  const updateProduct = async (
    id: string,
    updates: Partial<CreateProductInput>
  ): Promise<Product | null> => {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) {
        const errorMsg = 'Product not found';
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      }

      const updatedProduct: Product = {
        ...product,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      console.log('Updating product in IndexedDB:', updatedProduct.name);
      await updateItem('products', id, updatedProduct);
      
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
      console.log('Product updated successfully');
      return updatedProduct;
    } catch (err) {
      const errorMsg = 'Failed to update product';
      setError(errorMsg);
      console.error('Error updating product:', err);
      toast.error(errorMsg);
      return null;
    }
  };

  // Delete product
  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      console.log('Deleting product from IndexedDB:', id);
      await deleteItem('products', id);
      
      setProducts((prev) => prev.filter((p) => p.id !== id));
      console.log('Product deleted successfully');
      return true;
    } catch (err) {
      const errorMsg = 'Failed to delete product';
      setError(errorMsg);
      console.error('Error deleting product:', err);
      toast.error(errorMsg);
      return false;
    }
  };

  // Get product by ID
  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  // Get unique categories
  const getCategories = (): string[] => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
  };

  // Search products (works offline!)
  const searchProducts = (query: string): Product[] => {
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getCategories,
    searchProducts,
    reloadProducts: loadProducts,
    clearError: () => setError(null),
  };
}