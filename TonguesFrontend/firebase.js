// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXP75YCFvXSFsHebJlKHvnz5mszS11TM4",
  authDomain: "tongues-9e5e5.firebaseapp.com",
  projectId: "tongues-9e5e5",
  storageBucket: "tongues-9e5e5.appspot.com",
  messagingSenderId: "949342787380",
  appId: "1:949342787380:web:bba8ac4907e8b842ae7761",
  measurementId: "G-FF8BX9RNV2"
};
// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
