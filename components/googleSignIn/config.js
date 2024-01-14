// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS8JZHuCRKDb8Ln7MV5_KdfqBIpuNdKfI",
  authDomain: "captsone-mit.firebaseapp.com",
  projectId: "captsone-mit",
  storageBucket: "captsone-mit.appspot.com",
  messagingSenderId: "399484321699",
  appId: "1:399484321699:web:747a720e62ec700f3fa416",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Utiliza getAuth para obtener el objeto auth

const provider = new GoogleAuthProvider();

export { auth, provider }; // Exporta getAuth como auth
