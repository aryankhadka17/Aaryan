
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQLmxBpG3ms2n4iMq58gAEBtBQIoPSVBM",
  authDomain: "hamroramjham-82455.firebaseapp.com",
  projectId: "hamroramjham-82455",
  storageBucket: "hamroramjham-82455.appspot.com",
  messagingSenderId: "589578043065",
  appId: "1:589578043065:web:e00f16cd844d7272b6e568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseDb = getFirestore(app);
export const fireStorage = getStorage(app);

export default firebaseDb;
