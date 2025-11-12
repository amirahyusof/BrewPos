// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
apiKey: "REPLACE_ME",
authDomain: "REPLACE_ME",
projectId: "REPLACE_ME",
storageBucket: "REPLACE_ME",
messagingSenderId: "REPLACE_ME",
appId: "REPLACE_ME"
}


const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)