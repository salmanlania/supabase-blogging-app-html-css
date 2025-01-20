import { signOut, auth, db, doc, deleteDoc, collection, addDoc, getDocs, getDoc, updateDoc } from './Firebase.js'

import { supabaseClient } from "../Supabase.js";
console.log('supabase', supabaseClient)

const dropdownDiv = document.querySelector('#dropdown-div');
const dropdownDivLogout = document.querySelector('#dropdown-div-logout');
// const pvtBlogs = document.querySelector('#pvtBlogs');
let parentDiv = document.querySelector('#parentDiv');
const uid = localStorage.getItem('uid');
const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token');
(function checkAuth() {
    // const loadingScreen = document.getElementById('loadingScreen');
    // const app = document.getElementById('app');
    const uid = localStorage.getItem('uid');
    const storage = localStorage.getItem('sb-voeeetuomtolemoykfnz-auth-token');

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
// const fetchLoggedInUserData = async () => {
//     try {
//         // Get the currently logged-in user's information
//         const { data: authData, error: authError } = await supabaseClient.auth.getUser();

//         if (authError) {
//             console.error('Error fetching user information:', authError.message);
//             return null;
//         }

//         console.log('authData', authData)

//     } catch (err) {
//         console.error('Unexpected error:', err.message);
//         return null;
//     }
// };

// // Example usage
// fetchLoggedInUserData();

const getUsers = async () => {
    const querySnapshot = await getDoc(doc(db, "usersData", uid));
    parentDiv.innerHTML = ''
    // try {
    //     // Get the currently logged-in user's information
    //     const { data: authData, error: authError } = await supabaseClient.auth.getUser();

    //     if (authError) {
    //         console.error('Error fetching user information:', authError.message);
    //         return null;
    //     }else if(authData){
    //         console.log('authData', authData)
    //         if (!uid || !storage) {
    //             dropdownDivLogout.style.display = 'none'
    //             dropdownDiv.style.display = 'block'
    //             console.log('You are not logged in. Redirecting to login page...');
    //             alert('You are not logged in. Redirecting to login page...');
    //         } else {
    //             dropdownDivLogout.style.display = 'block'
    //             dropdownDiv.style.display = 'none'
    //             // console.log('doc' , doc.data().fullName)
        
    //             // const userData = querySnapshot.data();
    //             const userData = authData.user
    //             console.log('doc', userData)
        
    //             parentDiv.innerHTML += `
    //                                <div class="row mb-3">
    //                         <label class="col-sm-3 col-form-label">Full Name:</label>
    //                         <div class="col-sm-9 d-flex justify-content-between">
    //                             <span class="form-control-plaintext">${userData.fullName}</span>
    //                             <a onclick="fullNameEdit('${uid}')" href="#" class="ml-2 text-primary"><i class="fas fa-edit"></i></a>
    //                         </div>
    //                     </div>
    //                     <div class="row mb-3">
    //                         <label class="col-sm-3 col-form-label">Email:</label>
    //                         <div class="col-sm-9 d-flex justify-content-between">
    //                             <span class="form-control-plaintext">${userData.email}</span>
    //                         </div>
    //                     </div>
    //                     <div class="row mb-3">
    //                         <label class="col-sm-3 col-form-label">Date of Birth:</label>
    //                         <div class="col-sm-9 d-flex justify-content-between">
    //                             <span class="form-control-plaintext">${userData.dob}</span>
    //                             <a onclick="dobEdit('${uid}')" href="#" class="ml-2 text-primary"><i class="fas fa-edit"></i></a>
    //                         </div>
    //                     </div>
    //                 `
        
    //         }
    //     }

    //     return

    // } catch (err) {
    //     console.error('Unexpected error:', err.message);
    //     return null;
    // }
    // querySnapshot.forEach((doc) => {

    // })

    try {
        // Get the currently logged-in user's information
        const { data: authData, error: authError } = await supabaseClient.auth.getUser();
    
        if (authError || !authData) {
            console.error('Error fetching user information or user is not authenticated:', authError?.message);
            alert('You are not logged in. Redirecting to login page...');
            window.location.href = "../index.html"; // Redirect to login page
            return;
        }
    
        const userId = authData.user.id; // This is the logged-in user's unique identifier (UUID)
        console.log('userId data' , authData)
        console.log('userId' , userId)
    
        // Fetch data from your database table for the logged-in user
        const { data: userData, error: userError } = await supabaseClient
            .from('users') // Replace 'YourTableName' with your database table name
            .select('*') // Replace '*' with specific columns if necessary
            .eq('uid', userId) // Assuming 'user_id' is the foreign key in your database table
            // .single(); // Fetch a single row
            .maybeSingle();
    
        if (userError) {
            console.error('Error fetching user data from database:', userError.message);
            return;
        }
    
        console.log('User data from database:', userData);
    } catch (err) {
        console.error('Unexpected error:', err.message);
    }
    
}

const fullNameEdit = async (uid) => {
    console.log('fullName', uid)
    try {
        const getUserData = await getDoc(doc(db, "usersData", uid))
        if (!getUserData.exists()) {
            console.log('User not found!');
            return;
        }
        const currentFullName = getUserData.data().fullName;
        console.log('Current full name:', currentFullName);

        const newFullName = prompt('Enter Your New Name', currentFullName)
        console.log('newFullName', newFullName)

        if (newFullName && newFullName !== currentFullName) {
            await updateDoc(doc(db, "usersData", uid), {
                fullName: newFullName
            })
            alert("Full Name updated successfully!");
            getUsers();
        } else {
            console.log('No change in the name');
        }

    } catch (error) {
        console.log('error', error)
    }
}
// const emailEdit = (email) => {
//     console.log('email', email)
// }
const dobEdit = async (uid) => {
    console.log('dob', uid)
    console.log('fullName', uid)
    try {
        const getUserData = await getDoc(doc(db, "usersData", uid))
        if (!getUserData.exists()) {
            console.log('User not found!');
            return;
        }
        const currentFullName = getUserData.data().dob;
        console.log('Current full name:', currentFullName);

        const newFullName = prompt('Enter Your New Name', currentFullName)
        console.log('newFullName', newFullName)

        if (newFullName && newFullName !== currentFullName) {
            await updateDoc(doc(db, "usersData", uid), {
                dob: newFullName
            })
            alert("Date Of Birth updated successfully!");
            getUsers();
        } else {
            console.log('No change in the name');
        }

    } catch (error) {
        console.log('error', error)
    }
}

window.getUsers = getUsers
window.fullNameEdit = fullNameEdit
// window.emailEdit = emailEdit
window.dobEdit = dobEdit