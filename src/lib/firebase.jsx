import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "chat-app-c3793.firebaseapp.com",
    projectId: "chat-app-c3793",
    storageBucket: "chat-app-c3793.appspot.com",
    messagingSenderId: "570069198227",
    appId: "1:570069198227:web:c8b3245c3496b506d2b466"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
