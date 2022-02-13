import * as firebase from "firebase/app";
import "firebase/database";

let config = {
  apiKey: "AIzaSyD5mJIKcFHsv-8g3HZhvEp2goS1wiFp5gc",
  authDomain: "lombaz-admin-test.firebaseapp.com",
  databaseURL: "https://lombaz-admin-test-default-rtdb.firebaseio.com",
  projectId: "lombaz-admin-test",
  storageBucket: "lombaz-admin-test.appspot.com",
  messagingSenderId: "125862465508",
  appId: "1:125862465508:web:bdbfce1f7365adbf5b01f1"
};

firebase.initializeApp(config);

export default firebase.database();
