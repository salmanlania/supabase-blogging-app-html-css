import { signOut, auth, db, doc, setDoc } from '../Firebase.js'
(function checkAuth() {
    const loadingScreen = document.getElementById('loadingScreen');
    const app = document.getElementById('app');
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        setTimeout(() => {
            alert('You are not logged in. Redirecting to login page...');
            window.location.replace('../index.html');
        }, 100);
    } else {
        loadingScreen.style.display = 'none';
        app.style.display = 'block';
        console.log('User is logged in');
    }
})();

const logoutHandler = async (e) => {
    e.preventDefault();
    try {
        const logout = await signOut(auth)
        alert('Logout Succesfull')
        if (logout) {
            localStorage.removeItem('authToken')
            window.location.replace('../index.html')
        }
        else if (!logout) {
            localStorage.removeItem('authToken')
            window.location.replace('../index.html')
        }
        // console.log('signOut' , signOut)
    } catch (error) {
        console.log('error', error.message)
        alert(error.code)
    }
}

const inputNote = document.querySelector('#inputNote')

const addNote = async (e) => {
    e.preventDefault();
    try {
        if (!inputNote.value) {
            alert('Please Enter to add in todo')
            return
        }
        else if (inputNote) {
            const note = inputNote.value.trim()
            console.log('note', note)
            const todo = await setDoc(doc(db, "todosData", "todo"), {
                note
            })
            console.log('todo', todo)
            // alert('added succesfully')
        }
    } catch (error) {

    }
}

window.logoutHandler = logoutHandler
window.addNote = addNote