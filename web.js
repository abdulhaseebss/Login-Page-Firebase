import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const enjoy = document.querySelector('#enjoy')
const form = document.querySelector('#form')
const logOut = document.querySelector('#logOut')

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        window.location = 'index.html'
    }
});


form.addEventListener('click', (e) => {
    e.preventDefault()
})

logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'index.html'
    }).catch((error) => {
        console.log(error);
    });
})




enjoy.addEventListener('click', () => {
    enjoy.className = 'animate__animated animate__rubberBand'
})


