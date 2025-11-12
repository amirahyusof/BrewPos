// src/hooks/useOfflineSync.ts
import { useEffect, useRef } from 'react'
import { getAll, put, del } from '../lib/idb'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'


export const useOfflineSync = (userId?: string) => {
const syncing = useRef(false)


useEffect(() => {
const sync = async () => {
if (!navigator.onLine) return
if (!userId) return
if (syncing.current) return
syncing.current = true


try {
const unsynced = await getAll('transactions')
for (const tx of unsynced) {
if (tx.synced) continue
// push to Firestore
await addDoc(collection(db, 'transactions'), {
...tx,
userId,
createdAt: serverTimestamp()
})
// mark locally as synced (or delete)
await put('transactions', { ...tx, synced: true })
}
} catch (err) {
console.error('Sync error', err)
} finally {
syncing.current = false
}
}


window.addEventListener('online', sync)
// initial try
sync()


return () => window.removeEventListener('online', sync)
}, [userId])
}