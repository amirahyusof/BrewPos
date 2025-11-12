// src/lib/idb.ts
import { openDB } from 'idb'


export const DB_NAME = 'brewpos-db'
export const DB_VERSION = 1


export const initDB = async () => {
return openDB(DB_NAME, DB_VERSION, {
upgrade(db) {
if (!db.objectStoreNames.contains('products')) {
db.createObjectStore('products', { keyPath: 'id' })
}
if (!db.objectStoreNames.contains('transactions')) {
db.createObjectStore('transactions', { keyPath: 'id' })
}
if (!db.objectStoreNames.contains('settings')) {
db.createObjectStore('settings', { keyPath: 'key' })
}
}
})
}


export const getAll = async (storeName: string) => {
const db = await initDB()
return db.getAll(storeName)
}


export const put = async (storeName: string, value: any) => {
const db = await initDB()
return db.put(storeName, value)
}


export const get = async (storeName: string, key: string) => {
const db = await initDB()
return db.get(storeName, key)
}


export const del= async (storeName: string, key: string) => {
const db = await initDB()
return db.delete(storeName, key)
}