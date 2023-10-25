import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXPXQflHdpHU8ottxPfFMfSAkWfDq4HfA",
  authDomain: "trailify-ea22b.firebaseapp.com",
  projectId: "trailify-ea22b",
  storageBucket: "trailify-ea22b.appspot.com",
  messagingSenderId: "471691105934",
  appId: "1:471691105934:web:1595d75cd7044d1b5d5bdf"
};

export const app = initializeApp(firebaseConfig);