// This file is to initialise connection to firebase/storage + retrieve n store devices' token for notification purposes
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB4JN0YnRF_lK-VzZGuApX6v6cgPtZgnpg",
  authDomain: "capstonenotification-bdce8.firebaseapp.com",
  projectId: "capstonenotification-bdce8",
  storageBucket: "capstonenotification-bdce8.appspot.com",
  messagingSenderId: "11484582279",
  appId: "1:11484582279:web:ebc3b220780505d7c48322",
  measurementId: "G-76LBTFJV0M",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const auth = getAuth(firebaseApp);

// Function to sign in anonymously and get the token and UID
let tokenRetrieved = false;

export const gettoken = (setUID, setTokenFound, setTokenValue) => {
  if (tokenRetrieved) {
    console.log("Token already retrieved.");
    return;
  }

  const auth = getAuth(firebaseApp);
  signInAnonymously(auth)
    .then((userCredential) => {
      const user = userCredential.user;
      setUID(user.uid);
      return getToken(messaging, {
        vapidKey: "BM9wWE0nKdE-Olhy8ZFwrEnUjP4jr0puqACCp-5z_f4kcPDN5Y0yLtQyO2upF5alxlsjOyWa6AX5sdqP3GZ-DlU",
      });
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Current token for client: ", currentToken);
        setTokenFound(true);
        setTokenValue(currentToken);
        tokenRetrieved = true;
      } else {
        console.log("No registration token available. Request permission to generate one.");
        setTokenFound(false);
      }
    })
    .catch((error) => {
      console.error("Error during anonymous sign-in and token retrieval:", error);
    });
};

export { firebaseApp, firestore,storage };
