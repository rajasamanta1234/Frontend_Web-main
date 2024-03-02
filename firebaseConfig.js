// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxfv6qUajFyV1_EyAJ69L5tZulKLdorCM",
  authDomain: "lightforth-ec021.firebaseapp.com",
  projectId: "lightforth-ec021",
  storageBucket: "lightforth-ec021.appspot.com",
  messagingSenderId: "966244259012",
  appId: "1:966244259012:web:a28983f523e4e4554f2591",
  measurementId: "G-H2GQP5BHY3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

const provider = new FacebookAuthProvider();
const provider2 = new GoogleAuthProvider();

provider2.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider, provider2 };
