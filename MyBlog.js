import { signOut, auth, db, doc, deleteDoc, collection, addDoc, getDocs, getDoc, updateDoc } from './Firebase.js'
const dropdownDiv = document.querySelector('#dropdown-div');
const dropdownDivLogout = document.querySelector('#dropdown-div-logout');
// const pvtBlogs = document.querySelector('#pvtBlogs');
let privacySelect = document.querySelector('#notePrivacy');

import { supabaseClient } from "../Supabase.js";
console.log('supabase', supabaseClient)

const uid = localStorage.getItem('uid');
const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token');

// console.log('uid' , uid)
// console.log('storage' , storage) 


(function checkAuth() {

    const uid = localStorage.getItem('uid');
    const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token')
    // const loadingScreen = document.getElementById('loadingScreen');
    // const app = document.getElementById('app');

    if (!uid || !storage) {
        dropdownDivLogout.style.display = 'none'
        dropdownDiv.style.display = 'block'
        // pvtBlogs.style.display = 'none'
        console.log('You are not logged in. Redirecting to login page...');
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = "../index.html";
        // setTimeout(() => {
        // }, 500);
    } else {
        dropdownDivLogout.style.display = 'block'
        dropdownDiv.style.display = 'none'
        // pvtBlogs.style.display = 'block'
        // loadingScreen.style.display = 'none';
        // app.style.display = 'block';
        console.log('User is logged in');
    }
})();

const getNotes = async () => {
    let posts = document.querySelector('#parent')
    posts.innerHTML = '';
    const { data, error } = await supabaseClient
        .from('BlogsData')
        .select()
    console.log('data', data)
    console.log('error', error)
    data.forEach((pv) => {
    });
    data.forEach((doc) => {
        console.log('data privacy', doc)
        // console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`);
        // console.log(`${doc.id} => ${(doc.data().note)}`);
        const privacyCheck = doc.privacy;
        const id = doc.id
        console.log('id', id)
        console.log('privacyCheck', privacyCheck)
        if (!uid || !storage && privacyCheck === 'public') {
            console.log(false)
            posts.innerHTML += `
                    <div class="alert alert-primary d-flex justify-content-between" role="alert">
                        <span>${doc.note_content}</span>
                        <div>
                            <i onclick="edit('${id}')" class="fa-solid btn fa-pen-to-square"></i>
                            <i onclick="deleteBtn('${id}')" class="fa-solid btn fa-trash"></i>
                        </div>
                    </div>
                    `
        }
        else if (uid && storage) {
            if (privacyCheck === 'public' || (privacyCheck === 'private' && doc.uid === localStorage.getItem('uid'))) {
                // if(doc.data().uid === localStorage.getItem('uid')){
                //     console.log('han hai' , privacyCheck)
                //     return 
                // }
                console.log(true)
                posts.innerHTML += `
                    <div class="alert alert-primary d-flex justify-content-between" role="alert">
                        <span>${doc.note_content}</span>
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

        const newNote = prompt('Enter new Note')

        const { data, error } = await supabaseClient
            .from('BlogsData')
            .update({ note_content: newNote })
            .eq('id', id)
            .select()

        if (data) {
            console.log('data', data)
            alert("Post updated successfully!");
            getNotes();
        } else if (error) {
            console.log('error', error)
            getNotes();
        }


    } catch (error) {
        console.log('error', error.code)
    }
}

const deleteBtn = async (del) => {
    console.log('del', del)
    try {
        // await deleteDoc(doc(db, "todosData", del))
        const { data, error } = await supabaseClient
            .from('BlogsData')
            .delete()
            .eq('id', del)
            .select()

        if (data) {
            console.log('data', data)
            alert("delete successfully")
            getNotes();
        } else if (error) {
            console.log('error', error)
            getNotes();
        }



    } catch (error) {
        console.log('error', error.code)
    }
}

const logoutHandler = async (e) => {
    e.preventDefault();
    // return console.log('logout')
    try {
        const { error } = await supabaseClient.auth.signOut()
        console.log('logout error', error)

        // if (logout) {
        alert('Logout Succesfull')
        dropdownDivLogout.style.display = 'none'
        // pvtBlogs.style.display = 'none'
        dropdownDiv.style.display = 'block'
        localStorage.removeItem('uid')
        localStorage.removeItem('storage')
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


window.deleteBtn = deleteBtn
window.edit = edit
window.getNotes = getNotes
window.logoutHandler = logoutHandler