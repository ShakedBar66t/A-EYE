import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDFkgMSls2azS_pzhdXb43e_wiCQuKnhik",
    authDomain: "a-eye-d33bd.firebaseapp.com",
    projectId: "a-eye-d33bd",
    storageBucket: "a-eye-d33bd.appspot.com",
    messagingSenderId: "200182436083",
    appId: "1:200182436083:web:6b3148af28e89356b42786",
    measurementId: "G-NHEX4GZSWQ"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const storage = getStorage()