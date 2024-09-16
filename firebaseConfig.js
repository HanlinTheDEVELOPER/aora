import * as SecureStore from "expo-secure-store";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBjr4xY_E0-gi_L7HIOyQTCRLmHA2Kwrik",
	authDomain: "aora-cf441.firebaseapp.com",
	projectId: "aora-cf441",
	storageBucket: "aora-cf441.appspot.com",
	messagingSenderId: "545270648921",
	appId: "1:545270648921:web:9bee6c8e644b45f5f26148",
	measurementId: "G-RG2VYEZX84",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(SecureStore),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
