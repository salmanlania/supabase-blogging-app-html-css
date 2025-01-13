import { signOut, auth, db, doc, deleteDoc, collection, addDoc, getDocs, getDoc, updateDoc } from './Firebase.js'
const dropdownDiv = document.querySelector('#dropdown-div');
const dropdownDivLogout = document.querySelector('#dropdown-div-logout');
const pvtBlogs = document.querySelector('#pvtBlogs');
let privacySelect = document.querySelector('#notePrivacy');

const uid = localStorage.getItem('uid');
(function checkAuth() {
    // const loadingScreen = document.getElementById('loadingScreen');
    // const app = document.getElementById('app');

    if (!uid) {
        dropdownDivLogout.style.display = 'none'
        dropdownDiv.style.display = 'block'
        pvtBlogs.style.display = 'none'
        console.log('You are not logged in. Redirecting to login page...');
        // alert('You are not logged in. Redirecting to login page...');
        // window.location.href = "../index.html";
        // setTimeout(() => {
        // }, 500);
    } else {
        dropdownDivLogout.style.display = 'block'
        dropdownDiv.style.display = 'none'
        pvtBlogs.style.display = 'block'
        // loadingScreen.style.display = 'none';
        // app.style.display = 'block';
        console.log('User is logged in');
    }
})();

const logoutHandler = async (e) => {
    e.preventDefault();
    // return console.log('logout')
    try {
        const logout = await signOut(auth)
        console.log('logout', logout)

        // if (logout) {
        alert('Logout Succesfull')
        dropdownDivLogout.style.display = 'none'
        pvtBlogs.style.display = 'none'
        dropdownDiv.style.display = 'block'
        localStorage.removeItem('uid')
        // window.location.href = "../index.html"
        // window.location.href = "../index.html"
        // }
        // else if (!logout) {
        //     localStorage.removeItem('uid')
        //     // window.location.href = "../index.html"
        // }
        // console.log('signOut' , signOut)
    } catch (error) {
        console.log('error', error.message)
        alert(error.code)
    }
}

const inputNote = document.querySelector('#inputNote')

const inputClick = () => {
    if (!uid) {
        alert('Please login first')
        window.location.replace('./Account/index.html')
        return
    }
}

const addNote = async (e) => {
    e.preventDefault();
    // else {
    try {
        if (!inputNote.value) {
            alert('Please Enter to add in todo')
            return
        }
        else if (inputNote) {
            const note = inputNote.value.trim()
            const notePrivacy = privacySelect.value;
            const createdAt = new Date();
            console.log('note', note)
            const todo = await addDoc(collection(db, "todosData"), {
                note,
                notePrivacy,
                uid,
                createdAt: createdAt
            })
            console.log('todo', todo)
            alert('added succesfully')
            inputNote.value = ""
            privacySelect.value = "public"
            let posts = document.querySelector('#parent')
            posts.innerHTML = '';
            getNotes()
        }
    } catch (error) {
        console.log('error', error.code)
    }
    // }
}

const getNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "todosData"));
    let posts = document.querySelector('#parent')
    posts.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
        console.log(`${doc.id} => ${(doc.data().note)}`);
        const privacyCheck = doc.data().notePrivacy;
        const id = doc.id
        console.log('id', id)
        console.log('privacyCheck', privacyCheck)
        if (!uid && privacyCheck === 'public') {
            console.log(false)
            posts.innerHTML += `
                    <div class="alert alert-primary d-flex justify-content-between" role="alert">
                        <span>${doc.data().note}</span>
                        <div>
                            <i onclick="edit('${id}')" class="fa-solid btn fa-pen-to-square"></i>
                            <i onclick="deleteBtn('${id}')" class="fa-solid btn fa-trash"></i>
                        </div>
                    </div>
                    `
        }
        else if (uid) {
            if (privacyCheck === 'public' || (privacyCheck === 'private' && doc.data().uid === localStorage.getItem('uid'))) {
                // if(doc.data().uid === localStorage.getItem('uid')){
                //     console.log('han hai' , privacyCheck)
                //     return 
                // }
                console.log(true)
                posts.innerHTML += `
                    <div class="alert alert-primary d-flex justify-content-between" role="alert">
                        <span>${doc.data().note}</span>
                        <div>
                            <i onclick="edit('${id}')" class="fa-solid btn fa-pen-to-square"></i>
                            <i onclick="deleteBtn('${id}')" class="fa-solid btn fa-trash"></i>
                        </div>
                    </div>
                    `
            }
        }

        // return 
    });
}

const edit = async (id) => {
    console.log('edit', id)
    try {
        const getBlog = await getDoc(doc(db, "todosData", id))
        console.log('getBlog', getBlog.data().note)

        const newNote = prompt('Enter Your New Note', getBlog.data().note)
        console.log('newNote', newNote)

        await updateDoc(doc(db, "todosData", id), {
            note: newNote
        })
        alert("Post updated successfully!");
        getNotes();
    } catch (error) {
        console.log('error', error.code)
    }
}

const deleteBtn = async (del) => {
    console.log('del', del)
    try {
        await deleteDoc(doc(db, "todosData", del))
        getNotes();
        alert("delete successfully")

    } catch (error) {
        console.log('error', error.code)
    }
}

window.deleteBtn = deleteBtn
window.edit = edit
window.getNotes = getNotes
window.logoutHandler = logoutHandler
window.addNote = addNote
window.inputClick = inputClick