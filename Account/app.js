import { supabaseClient } from "../Supabase.js";
console.log('supabase', supabaseClient)

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
            const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token')
            const storageUid = localStorage.getItem('uid')
            if (storage && storageUid) {
                alert('You are already login')
                window.location.replace('../index.html')
                return
            }
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            })

            console.log('user', data)
            console.log('user id', data.user.id)
            console.log('error', error)
            const uid = data.user.id
            if (data) {
                    localStorage.setItem('uid', uid)
                    alert('Login successfully')
                    window.location.replace('../index.html')
            }
            else {
                console.log('something went wrong')
            }
        }
        else {
            console.log('something went wrong')
        }
    } catch (error) {
        console.log('error', error)
    }
    console.log('signup button click')
}

window.login = login