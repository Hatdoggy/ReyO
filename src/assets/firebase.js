import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDma3ph80bv5MkTf_lg51M15jg1B3E0Rkg",

    authDomain: "fir-sample-43fdd.firebaseapp.com",

    databaseURL: "https://fir-sample-43fdd-default-rtdb.firebaseio.com",

    projectId: "fir-sample-43fdd",

    storageBucket: "fir-sample-43fdd.firebasestorage.app",

    messagingSenderId: "812898169336",

    appId: "1:812898169336:web:124c31e6a9327cea09e60d",

    measurementId: "G-Z3Z246QQEC"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;