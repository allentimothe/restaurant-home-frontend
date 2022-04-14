// import the firebase core module
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
// import the auth package from firebase
const firebaseConfig = {
  apiKey: "AIzaSyCbNGcCRnEPbSj5_2g1oenM4cQZdXXPLqY",
  authDomain: "clockin-a185b.firebaseapp.com",
  projectId: "clockin-a185b",
  storageBucket: "clockin-a185b.appspot.com",
  messagingSenderId: "259827367675",
  appId: "1:259827367675:web:bbf10eb961a9de5c75fa5e"
};
// initialize the firebase app
initializeApp(firebaseConfig);

// set up a firebase provider
const provider = new GoogleAuthProvider();
// configure the firebase provider
const auth = getAuth();
// set up auth actions i.e. login, logout etc
function login() {
  signInWithPopup(auth, provider)
}

function logout() {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}
// export our actions

export {
  auth,
  login,
  logout,
}