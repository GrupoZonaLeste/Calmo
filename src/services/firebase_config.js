
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCYKpzOWbUbpQ7JDouOGVsspY_9JT9c3AE",
  authDomain: "calmoapp.firebaseapp.com",
  projectId: "calmoapp",
  storageBucket: "calmoapp.firebasestorage.app",
  messagingSenderId: "148422495751",
  appId: "1:148422495751:web:24619ed171946cbd65e4a2",
  measurementId: "G-NDG0S80YXK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };