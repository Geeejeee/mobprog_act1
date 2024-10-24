import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6IqplSEXxYVwpB7fAGq53nRvg8R1R4W0",
    authDomain: "mobprog-act1.firebaseapp.com",
    projectId: "mobprog-act1",
    storageBucket: "mobprog-act1.appspot.com",
    messagingSenderId: "658781417648",
    appId: "1:658781417648:web:61b7a7919db16a75d2cb75",
    measurementId: "G-40LEPE6QWV"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth=getAuth();
  export const db=getFirestore(app);
  export default app;