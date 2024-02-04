import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.SECRET_KEY,
    authDomain: "symbiosis-swapshop.firebaseapp.com",
    projectId: "symbiosis-swapshop",
    storageBucket: "symbiosis-swapshop.appspot.com",
    messagingSenderId: "418001845210",
    appId: "1:418001845210:web:af8bac3ef91a859ec41ee3",
    measurementId: "G-GDDEHTXMXK",
};

const app = initializeApp(firebaseConfig);
const store = getStorage(app);

export { store };
