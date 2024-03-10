// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyB4JN0YnRF_lK-VzZGuApX6v6cgPtZgnpg",
//   authDomain: "capstonenotification-bdce8.firebaseapp.com",
//   projectId: "capstonenotification-bdce8",
//   storageBucket: "capstonenotification-bdce8.appspot.com",
//   messagingSenderId: "11484582279",
//   appId: "1:11484582279:web:ebc3b220780505d7c48322",
//   measurementId: "G-76LBTFJV0M",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });