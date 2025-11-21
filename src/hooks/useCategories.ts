// src/hooks/useCategories.ts - NEW HOOK
import { useState, useEffect } from 'react';
import { useLocalDB } from './useLocalDB';
import { toast } from 'sonner';

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem, getAll, updateItem, deleteItem } = useLocalDB();

  // Load all categories from IndexedDB
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading categories from IndexedDB...');
      
      const allCategories = (await getAll('categories')) || [];
      console.log(`Loaded ${allCategories.length} categories from IndexedDB`);
      
      setCategories(allCategories);
    } catch (err) {
      const errorMsg = 'Failed to load categories';
      setError(errorMsg);
      console.error('Error loading categories:', err);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Add new category
  const addCategory = async (input: CreateCategoryInput): Promise<Category | null> => {
    try {
      // Check if category already exists (case-insensitive)
      const exists = categories.some(
        cat => cat.name.toLowerCase() === input.name.trim().toLowerCase()
      );

      if (exists) {
        toast.error('Category already exists');
        return null;
      }

      const newCategory: Category = {
        id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: input.name.trim(),
        description: input.description?.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log('Adding category to IndexedDB:', newCategory.name);
      await addItem('categories', newCategory);
      
      setCategories((prev) => [...prev, newCategory]);
      console.log('Category added successfully');
      toast.success(`Category "${newCategory.name}" added!`);
      return newCategory;
    } catch (err) {
      const errorMsg = 'Failed to add category';
      setError(errorMsg);
      console.error('Error adding category:', err);
      toast.error(errorMsg);
      return null;
    }
  };

  // Update category
  const updateCategory = async (
    id: string,
    updates: Partial<CreateCategoryInput>
  ): Promise<Category | null> => {
    try {
      const category = categories.find((c) => c.id === id);
      if (!category) {
        const errorMsg = 'Category not found';
        setError(errorMsg);
        toast.error(errorMsg);
        return null;
      }

      // Check if new name conflicts with existing
      if (updates.name) {
        const exists = categories.some(
          cat => cat.id !== id && cat.name.toLowerCase() === updates.name!.trim().toLowerCase()
        );
        if (exists) {
          toast.error('Category name already exists');
          return null;
        }
      }

      const updatedCategory: Category = {
        ...category,
        ...updates,
        name: updates.name?.trim() || category.name,
        updatedAt: new Date().toISOString(),
      };

      console.log('Updating category in IndexedDB:', updatedCategory.name);
      await updateItem('categories', id, updatedCategory);
      
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? updatedCategory : c))
      );
      console.log('Category updated successfully');
      toast.success(`Category updated to "${updatedCategory.name}"`);
      return updatedCategory;
    } catch (err) {
      const errorMsg = 'Failed to update category';
      setError(errorMsg);
      console.error('Error updating category:', err);
      toast.error(errorMsg);
      return null;
    }
  };

  // Delete category
  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      console.log('Deleting category from IndexedDB:', id);
      await deleteItem('categories', id);
      
      setCategories((prev) => prev.filter((c) => c.id !== id));
      console.log('Category deleted successfully');
      toast.success('Category deleted');
      return true;
    } catch (err) {
      const errorMsg = 'Failed to delete category';
      setError(errorMsg);
      console.error('Error deleting category:', err);
      toast.error(errorMsg);
      return false;
    }
  };

  // Get category by ID
  const getCategoryById = (id: string): Category | undefined => {
    return categories.find((c) => c.id === id);
  };

  // Get category by name
  const getCategoryByName = (name: string): Category | undefined => {
    return categories.find((c) => c.name.toLowerCase() === name.toLowerCase());
  };

  // Get all category names
  const getCategoryNames = (): string[] => {
    return categories.map(c => c.name).sort();
  };

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoryByName,
    getCategoryNames,
    reloadCategories: loadCategories,
    clearError: () => setError(null),
  };
}