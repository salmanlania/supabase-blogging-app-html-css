import { signOut, auth, db, doc, deleteDoc, collection, addDoc, getDocs, getDoc, updateDoc } from './Firebase.js'
const dropdownDiv = document.querySelector('#dropdown-div');
const dropdownDivLogout = document.querySelector('#dropdown-div-logout');
const pvtBlogs = document.querySelector('#pvtBlogs');
let privacySelect = document.querySelector('#notePrivacy');

import { supabaseClient } from "../Supabase.js";
console.log('supabase', supabaseClient)

const uid = localStorage.getItem('uid');
const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token');
(function checkAuth() {

    const uid = localStorage.getItem('uid');
    const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token')

    if (!uid || !storage) {
        dropdownDivLogout.style.display = 'none'
        dropdownDiv.style.display = 'block'
        pvtBlogs.style.display = 'none'
        console.log('You are not logged in. Redirecting to login page...');

    } else {
        dropdownDivLogout.style.display = 'block'
        dropdownDiv.style.display = 'none'
        pvtBlogs.style.display = 'block'

        console.log('User is logged in');
    }
})();

const logoutHandler = async (e) => {
    e.preventDefault();
    try {
        // const logout = await signOut(auth)
        // const logout = await signOut(auth)
        const { error } = await supabaseClient.auth.signOut()
        console.log('logout error', error)

        alert('Logout Succesfull')
        dropdownDivLogout.style.display = 'none'
        pvtBlogs.style.display = 'none'
        dropdownDiv.style.display = 'block'
        localStorage.removeItem('uid')
        localStorage.removeItem('storage')

    } catch (error) {
        console.log('error', error.message)
        alert(error.code)
    }
}

const inputNote = document.querySelector('#inputNote')

const inputClick = () => {
    if (!uid && !storage) {
        alert('Please login first')
        window.location.replace('./Account/index.html')
        return
    }
}

const addNote = async (e) => {
    e.preventDefault();
    try {
        if (!inputNote.value) {
            alert('Please Enter to add in todo')
            return
        }
        else if (inputNote) {
            const note = inputNote.value.trim()
            const notePrivacy = privacySelect.value;
            const createdAt = new Date();

            const todoObj = {
                note_content: note,
                privacy: notePrivacy,
                created_at: createdAt,
                uid: localStorage.getItem('uid')
            }
            console.log('note', todoObj)
            const { data, error } = await supabaseClient
                .from('BlogsData')
                .insert(todoObj)
                .select()

            if (data) {
                console.log('todo', data)
                inputNote.value = ""
                privacySelect.value = "public"
                getNotes()
                return alert('added succesfully')
            } else if (error) {
                console.log('error', error)
                getNotes()
                return
            }
        }
    } catch (error) {
        console.log('error', error)
    }
}

const getNotes = async () => {
    let posts = document.querySelector('#parent')
    posts.innerHTML = '';
    const { data, error } = await supabaseClient
        .from('BlogsData')
        .select()
    console.log('data', data)
    console.log('error', error)

    data.forEach((doc) => {
        console.log('data privacy', doc)
        const privacyCheck = doc.privacy;
        const id = doc.id
        console.log('id', id)
        console.log('privacyCheck', privacyCheck)
        if (!uid && privacyCheck === 'public') {
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
        else if (uid) {
            if (privacyCheck === 'public' || (privacyCheck === 'private' && doc.uid === localStorage.getItem('uid'))) {

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

window.deleteBtn = deleteBtn
window.edit = edit
window.getNotes = getNotes
window.logoutHandler = logoutHandler
window.addNote = addNote
window.inputClick = inputClick