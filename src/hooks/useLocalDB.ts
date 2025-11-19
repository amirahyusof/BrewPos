// src/hooks/useLocalDB.ts (FIXED)
import { openDB } from 'idb';

const DB_NAME = 'brewpos';
const DB_VERSION = 1;
const PRODUCT_STORE = 'products'; // Changed from 'local_products' to match useProducts
const TXN_STORE = 'transactions'; // Changed from 'local_transactions' to match

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
        db.createObjectStore(PRODUCT_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(TXN_STORE)) {
        db.createObjectStore(TXN_STORE, { keyPath: 'id' });
      }
    },
  });
}

export const useLocalDB = () => {
  // Add new item to store
  const addItem = async (store: string, item: any) => {
    try {
      const db = await initDB();
      await db.put(store, item);
      return item;
    } catch (err) {
      console.error(`Error adding item to ${store}:`, err);
      throw err;
    }
  };

  // Get all items from store
  const getAll = async (store: string) => {
    try {
      const db = await initDB();
      const items = await db.getAll(store);
      return items;
    } catch (err) {
      console.error(`Error getting all items from ${store}:`, err);
      throw err;
    }
  };

  // Get single item by key
  const getItem = async (store: string, key: string) => {
    try {
      const db = await initDB();
      const item = await db.get(store, key);
      return item;
    } catch (err) {
      console.error(`Error getting item from ${store}:`, err);
      throw err;
    }
  };

  // Update existing item (takes store and full updated item)
  const updateItem = async (store: string, key: string, updatedItem: any) => {
    try {
      const db = await initDB();
      // Put with the full item (has the key in it)
      await db.put(store, updatedItem);
      return updatedItem;
    } catch (err) {
      console.error(`Error updating item in ${store}:`, err);
      throw err;
    }
  };

  // Delete item by key
  const deleteItem = async (store: string, key: string) => {
    try {
      const db = await initDB();
      await db.delete(store, key);
      return true;
    } catch (err) {
      console.error(`Error deleting item from ${store}:`, err);
      throw err;
    }
  };

  // Clear entire store
  const clearStore = async (store: string) => {
    try {
      const db = await initDB();
      await db.clear(store);
      return true;
    } catch (err) {
      console.error(`Error clearing ${store}:`, err);
      throw err;
    }
  };

  return {
    addItem,
    getAll,
    getItem,
    updateItem,
    deleteItem,
    clearStore,
  };
};