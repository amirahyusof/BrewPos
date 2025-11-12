import { openDB } from 'idb';


const DB_NAME = 'brewpos';
const DB_VERSION = 1;
const PRODUCT_STORE = 'local_products';
const TXN_STORE = 'local_transactions';


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
const addItem = async (store: string, item: any) => {
const db = await initDB();
await db.put(store, item);
};


const getAll = async (store: string) => {
const db = await initDB();
return await db.getAll(store);
};


const clearStore = async (store: string) => {
const db = await initDB();
await db.clear(store);
};


return { addItem, getAll, clearStore };
};