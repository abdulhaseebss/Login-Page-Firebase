import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


const form = document.querySelector('#form')
const logOut = document.querySelector('#logOut')
const title = document.querySelector('#title')
const description = document.querySelector('#discription')
const div = document.querySelector('#main-div')

div.style.display = "none"


getDataFromFirestore()

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        // console.log(uid);
    } else {
        window.location = 'index.html'
    }
});


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    // console.log(title.value);
    // console.log(description.value);

    div.style.display = "block"
    try {
        // console.log(title.value);
        // console.log(description.value);
        const docRef = await addDoc(collection(db, "posts"), {
            title: title.value,
            description: description.value,
            uid: auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
        getDataFromFirestore()
    } catch (e) {
        console.error("Error adding document: ", e);
    };

})
const arr = []
async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        arr.push(doc.data());
    });
    console.log(arr);
    arr.map((item) => {
        div.innerHTML += `
        <div>
        <div>
            <p><span class="h4">Title = </span>${item.title}</p>
            <p><span class="h4">Description = </span>${item.description}</p>
        </div><br/><br/>
    </div>`
    // render(item)
    })
}

logOut.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout successfully');
        window.location = 'login.html'
    }).catch((error) => {
        console.log(error);
    });
})

// function render(item) {
//     div.innerHTML = "";

//     for (let i = 0; i < arr.length; i++) {
//     //   const item = arr;
//       div.innerHTML += `
//         <div>
//         <div>
//             <p><span class="h4">Title = </span>${item.title}</p>
//             <p><span class="h4">Description = </span>${item.description}</p>
//         </div><br/><br/>
//     </div>`
//     }
//   }
