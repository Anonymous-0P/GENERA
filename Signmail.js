import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAy5MThDv5t45mORr7-ov_syHWBeESXL7A",
    authDomain: "genera-77862.firebaseapp.com",
    projectId: "genera-77862",
    storageBucket: "genera-77862.appspot.com",
    messagingSenderId: "83083443419",
    appId: "1:83083443419:web:a13db31d83509c0bd620fe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signUp = document.getElementById('signUp');

signUp.addEventListener('click', function (event) {
    event.preventDefault();

    const FullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Creating Account....");
            console.log(user);
            window.location.href = "../logged.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
});
