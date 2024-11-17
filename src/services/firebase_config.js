import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries
// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYKpzOWbUbpQ7JDouOGVsspY_9JT9c3AE",
  authDomain: "calmoapp.firebaseapp.com",
  projectId: "calmoapp",
  storageBucket: "calmoapp.firebasestorage.app",
  messagingSenderId: "148422495751",
  appId: "1:148422495751:web:24619ed171946cbd65e4a2",
  measurementId: "G-NDG0S80YXK"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa o Firestore
export { auth, db };
