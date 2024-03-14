importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

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
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message ", payload);
  
    // Check the payload content and handle accordingly
    if (payload.data && payload.data.customKey === 'someValue') {
      const notificationTitle = "Title";
      const notificationOptions = {
        body: "Hello",
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    }
  });