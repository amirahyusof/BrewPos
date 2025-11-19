// src/hooks/useProducts.ts (FIXED)
import { useState, useEffect } from 'react';
import { useLocalDB } from './useLocalDB';

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
      const allProducts = (await getAll('products')) || [];
      setProducts(allProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
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

      await addItem('products', newProduct);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError('Failed to add product');
      console.error('Error adding product:', err);
      return null;
    }
  };

  //update product
  const updateProduct = async (
    id: string,
    updates: Partial<CreateProductInput>
  ): Promise<Product | null> => {
    try {
      const product = products.find((p) => p.id === id);
      if (!product) {
        setError('Product not found');
        return null;
      }

      const updatedProduct: Product = {
        ...product,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await updateItem('products', id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
      return updatedProduct;
    } catch (err) {
      setError('Failed to update product');
      console.error('Error updating product:', err);
      return null;
    }
  };

  // Delete product
  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      await deleteItem('products', id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
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

  // Search products
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