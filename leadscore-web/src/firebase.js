// client/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPcEe_tLLJ6yvgyXR-Fpsmu9Oz70riYRM",
  authDomain: "leadscore-web.firebaseapp.com",
  projectId: "leadscore-web",
  appId:"1:135519033873:web:b00a7f2c1d9d850f39efb0",
  // optional:
  // storageBucket, messagingSenderId, measurementId
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
