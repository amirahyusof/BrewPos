// src/hooks/useLocalDB.ts (FIXED)
import { openDB } from 'idb';

const DB_NAME = 'brewpos';
const DB_VERSION = 2;
const PRODUCT_STORE = 'products'; 
const TXN_STORE = 'transactions'; 


// Initialize IndexedDB
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Products store
      if (!db.objectStoreNames.contains(PRODUCT_STORE)) {
        const productStore = db.createObjectStore(PRODUCT_STORE, { keyPath: 'id' });
        productStore.createIndex('category', 'category', { unique: false });
        productStore.createIndex('name', 'name', { unique: false });
        console.log('Created products store');
      }

      // Orders store
      if (!db.objectStoreNames.contains(TXN_STORE)) {
        const orderStore = db.createObjectStore(TXN_STORE, { keyPath: 'id' });
        orderStore.createIndex('createdAt', 'createdAt', { unique: false });
        orderStore.createIndex('status', 'status', { unique: false });
        console.log('Created orders store');
      }

      // Categories store - NEW
      if (!db.objectStoreNames.contains('categories')) {
        const categoryStore = db.createObjectStore('categories', { keyPath: 'id' });
        categoryStore.createIndex('name', 'name', { unique: true });
        categoryStore.createIndex('createdAt', 'createdAt', { unique: false });
        console.log('Created categories store');
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