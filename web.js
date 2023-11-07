import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


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
    div.innerHTML = ''
    // console.log(title.value);
    // console.log(description.value);

    div.style.display = "block"
    try {
        // console.log(title.value);
        // console.log(description.value);
        const docRef = await addDoc(collection(db, "posts"), {
            title: title.value,
            description: description.value,
            postDate: Timestamp.fromDate(new Date()),
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
    arr.length = 0;
    const q = query(collection(db, "posts"), orderBy('postDate', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), docId: doc.id });
    });
    console.log(arr);
    arr.map((item) => {
        div.innerHTML += `
        <div>
        <div>
            <p><span class="h4">Title = </span>${item.title}</p>
            <p><span class="h4">Description = </span>${item.description}</p>
            <div class = "btn-div"><button type="button" id="delete" class="del-btn">Delete</button>
            <button type="button" id="update" class="edit-btn">Edit</button></div>
        </div><br/><br/><hr/>
    </div>`
    // render(item)

    const del = document.querySelectorAll('#delete');
    const upd = document.querySelectorAll('#update');

    del.forEach((btn , index) => {
        btn.addEventListener('click', () => {
            console.log('delete called' , arr[index]);
        })
    })
    upd.forEach((btn , index) => {
        btn.addEventListener('click', () => {
            console.log('update called' , arr[index]);
        })
    })
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
