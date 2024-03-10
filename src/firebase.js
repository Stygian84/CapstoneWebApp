import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyB4JN0YnRF_lK-VzZGuApX6v6cgPtZgnpg",
  authDomain: "capstonenotification-bdce8.firebaseapp.com",
  projectId: "capstonenotification-bdce8",
  storageBucket: "capstonenotification-bdce8.appspot.com",
  messagingSenderId: "11484582279",
  appId: "1:11484582279:web:ebc3b220780505d7c48322",
  measurementId: "G-76LBTFJV0M",
};

initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const gettoken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: "BM9wWE0nKdE-Olhy8ZFwrEnUjP4jr0puqACCp-5z_f4kcPDN5Y0yLtQyO2upF5alxlsjOyWa6AX5sdqP3GZ-DlU" })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log("No registration token available. Request permission to generate one.");
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
