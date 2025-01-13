import { app, auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../Firebase.js";
// console.log('app' , app)
// console.log('auth' , auth)
// console.log('createUserWithEmailAndPassword' , createUserWithEmailAndPassword)

const fullName = document.getElementById('signupFullName');
const email = document.getElementById('signupEmail');
const password = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('signupConfirmPassword');
const dob = document.getElementById('dob');
const signup = async (e) => {
    e.preventDefault();
    try {
        if (!email || !password || !confirmPassword || !dob) {
            console.log('One or more form elements are missing.');
            return;
        }
        else if (email.value && password.value && confirmPassword.value && dob.value) {
            if (password.value === confirmPassword.value) {
                console.log('password match =', true)
                const storage = localStorage.getItem('uid')
                if (storage) {
                    alert('You are already login')
                    window.location.replace('../index.html')
                    return
                }
                const user = await createUserWithEmailAndPassword(auth, email.value, password.value)
                console.log('user', user)
                if (user) {
                    await setDoc(doc(db, "usersData", user.user.uid), {
                        fullName: fullName.value,
                        email: email.value,
                        dob: dob.value
                    })
                    console.log('userData added successfull')

                    if (!storage) {
                        localStorage.setItem('uid', user.user.uid)
                        alert('account create successfully')
                        window.location.replace('../index.html')
                    }

                }
                else {
                    console.log('something went wrong')
                }
            }
            else if (!password.value === !confirmPassword.value) {
                console.log(`password didn't match =`, false)
                return
            }
        }
        else {
            console.log('something went wrong')
        }
    } catch (error) {
        console.log('error', error.message)
    }
    console.log('signup button click')
    // console.log('email', email.value)
    // console.log('password', password.value)
    // console.log('confirmPassword', confirmPassword.value)
    // console.log('dob', dob.value)

}

window.signup = signup