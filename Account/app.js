import { app, auth, signInWithEmailAndPassword } from "../Firebase.js";
// console.log('app' , app)
// console.log('auth' , auth)
// console.log('createUserWithEmailAndPassword' , createUserWithEmailAndPassword)

const email = document.getElementById('loginEmail');
const password = document.getElementById('loginPassword');

const login = async (e) => {
    e.preventDefault();
    try {
        if (!email.value || !password.value) {
            alert('One or more form elements are missing.');
            return;
        }
        else if (email.value && password.value) {
            const storage = localStorage.getItem('uid')
            if (storage) {
                alert('You are already login')
                window.location.replace('../index.html')
                return
            }
            const user = await signInWithEmailAndPassword(auth, email.value, password.value)
            if (user) {
                if (!storage) {
                    localStorage.setItem('uid', user.user.uid)
                    alert('Login successfully')
                    window.location.replace('../index.html')
                }
            }
            else {
                console.log('something went wrong')
            }
        }
        else {
            console.log('something went wrong')
        }
    } catch (error) {
        console.log('error', error.message)
        alert(error.code)
    }
    console.log('signup button click')
    // console.log('email', email.value)
    // console.log('password', password.value)
    // console.log('confirmPassword', confirmPassword.value)
    // console.log('dob', dob.value)

}

window.login = login