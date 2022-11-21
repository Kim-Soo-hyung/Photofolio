import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyByuinlKuQB37MZKxbhN_hMJyQoKiaXaP4",
    authDomain: "ex10-56fc6.firebaseapp.com",
    databaseURL: "https://ex10-56fc6-default-rtdb.firebaseio.com",
    projectId: "ex10-56fc6",
    storageBucket: "ex10-56fc6.appspot.com",
    messagingSenderId: "283485968001",
    appId: "1:283485968001:web:c0c1fa088aebc2ab595f80",
    measurementId: "G-15QN13GB10"
  };

const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);