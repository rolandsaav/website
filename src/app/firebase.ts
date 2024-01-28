// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBDc_RFGChWqiOKiCCpfGkNgl-1yOxqL0s",
	authDomain: "blogarticles-c6b5d.firebaseapp.com",
	projectId: "blogarticles-c6b5d",
	storageBucket: "blogarticles-c6b5d.appspot.com",
	messagingSenderId: "604937431508",
	appId: "1:604937431508:web:6d98a7278974ceabca8e41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
