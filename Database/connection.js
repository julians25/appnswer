import firebase from "firebase";

import 'firebase/database'
  // Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB2Ictv3cfWOAtpqT7YZv5vWf7zyN0-lh8",
    authDomain: "appnswer-ba06b.firebaseapp.com",
    projectId: "appnswer-ba06b",
    storageBucket: "appnswer-ba06b.appspot.com",
    messagingSenderId: "963859933714",
    appId: "1:963859933714:web:2924d3da6b89e3d81546cb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  var provider = new firebase.auth.GoogleAuthProvider();
  var storage = firebase.storage();

  export default{
      firebase,
      db,
      provider,
      storage
  }