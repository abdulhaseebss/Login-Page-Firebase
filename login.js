import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { auth } from './config.js';


const form = document.querySelector('#form')
const email = document.querySelector('#username')
const password = document.querySelector('#password')
const signUp = document.querySelector('#signUp')
const googleBtn = document.querySelector('#googleBtn')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(email.value);
    console.log(password.value);
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((res) => {
            // Signed in 
            const user = res.user;
            console.log(user);
            window.location = 'web.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                title: 'Something went wrong!',
            })
        });
})

signUp.addEventListener('click', () => {
    window.location = 'index.html'
})

googleBtn.addEventListener('click', () => {
    console.log("hello World");
})