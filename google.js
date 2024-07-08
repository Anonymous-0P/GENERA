import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyAy5MThDv5t45mORr7-ov_syHWBeESXL7A",
  authDomain: "genera-77862.firebaseapp.com",
  projectId: "genera-77862",
  storageBucket: "genera-77862.appspot.com",
  messagingSenderId: "83083443419",
  appId: "1:83083443419:web:a13db31d83509c0bd620fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("google-login-btn");


googleLogin.addEventListener("click", function () {

  signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "../logged.html";

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
    });

})