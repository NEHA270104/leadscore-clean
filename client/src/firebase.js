import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let db = null;
try{
  if(import.meta.env.VITE_FIREBASE_PROJECT_ID){
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
}catch(err){
  console.warn("Firebase init failed:", err);
}

export async function saveLeadToFirestore(lead){
  if(!db){ console.log("Firebase not configured — mock save:", lead); await new Promise(r=>setTimeout(r,300)); return { id: "mock-"+Date.now() }; }
  const col = collection(db, "leads");
  const ref = await addDoc(col, lead);
  return { id: ref.id };
}

export { db };
