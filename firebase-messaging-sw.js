importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyCtqy89josnfLzZiqtma0qsnJGNMPtF_Yo",
  authDomain: "fir-notification-783aa.firebaseapp.com",
  databaseURL: "https://fir-notification-783aa.firebaseio.com",
  projectId: "fir-notification-783aa",
  storageBucket: "fir-notification-783aa.appspot.com",
  messagingSenderId: "58246963133",
  appId: "1:58246963133:web:51f118e847ae1f9014fcd4",
  measurementId: "G-CR6QCVXKC6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then(function (registration) {
      console.log("Service Worker Registered");
      messaging.useServiceWorker(registration);
    });
}
messaging.onBackgroundMessage(function (payload) {
  const broadcast = new BroadcastChannel('messaging-sw');
  broadcast.postMessage(payload);
});
