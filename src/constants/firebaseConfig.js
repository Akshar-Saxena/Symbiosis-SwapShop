import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_KEY,
    authDomain: "page-flip-trade.firebaseapp.com",
    projectId: "page-flip-trade",
    storageBucket: "page-flip-trade.appspot.com",
    messagingSenderId: "965590400240",
    appId: "1:965590400240:web:d3864019ec2442e44e5635",
    measurementId: "G-VZPQLTE068",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);

export { db, store };
