import { getMessaging, getToken } from "firebase/messaging";
// Import the required Firebase libraries
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");
importScripts("/__/firebase/init.js");

// Initialize Firebase with your project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4JN0YnRF_lK-VzZGuApX6v6cgPtZgnpg",
  authDomain: "capstonenotification-bdce8.firebaseapp.com",
  projectId: "capstonenotification-bdce8",
  storageBucket: "capstonenotification-bdce8.appspot.com",
  messagingSenderId: "11484582279",
  appId: "1:11484582279:web:ebc3b220780505d7c48322",
  measurementId: "G-76LBTFJV0M",
};

firebase.initializeApp(firebaseConfig);

const messaging = getMessaging();
getToken(messaging, {
  vapidKey: "BM9wWE0nKdE-Olhy8ZFwrEnUjP4jr0puqACCp-5z_f4kcPDN5Y0yLtQyO2upF5alxlsjOyWa6AX5sdqP3GZ-DlU",
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
