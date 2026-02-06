import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCFS209wbluscjhLAZ9nb9YGXhbmX3Q_pg",
  authDomain: "invitacion-web-2dbce.firebaseapp.com",
  projectId: "invitacion-web-2dbce",
  storageBucket: "invitacion-web-2dbce.appspot.com",
  messagingSenderId: "338849220751",
  appId: "1:338849220751:web:815ea5240fa6d8c705c8fa"
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Inicializa Firestore
export const db = getFirestore(app)
