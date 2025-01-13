import { signOut, auth, db, doc, deleteDoc, collection, addDoc, getDocs, getDoc, updateDoc } from './Firebase.js'
const dropdownDiv = document.querySelector('#dropdown-div');
const dropdownDivLogout = document.querySelector('#dropdown-div-logout');
// const pvtBlogs = document.querySelector('#pvtBlogs');
let parentDiv = document.querySelector('#parentDiv');
const uid = localStorage.getItem('uid');
(function checkAuth() {
    // const loadingScreen = document.getElementById('loadingScreen');
    // const app = document.getElementById('app');

    if (!uid) {
        dropdownDivLogout.style.display = 'none'
        dropdownDiv.style.display = 'block'
        // pvtBlogs.style.display = 'none'
        console.log('You are not logged in. Redirecting to login page...');
        // alert('You are not logged in. Redirecting to login page...');
        // window.location.href = "../index.html";
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

const getUsers = async () => {
    const querySnapshot = await getDoc(doc(db, "usersData", uid));
    parentDiv.innerHTML = ''
    // querySnapshot.forEach((doc) => {
    if (!uid) {
        dropdownDivLogout.style.display = 'none'
        dropdownDiv.style.display = 'block'
        console.log('You are not logged in. Redirecting to login page...');
    } else {
        dropdownDivLogout.style.display = 'block'
        dropdownDiv.style.display = 'none'
        // console.log('doc' , doc.data().fullName)

        const userData = querySnapshot.data();
        console.log('doc', userData.fullName)

        parentDiv.innerHTML += `
                           <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Full Name:</label>
                    <div class="col-sm-9 d-flex justify-content-between">
                        <span class="form-control-plaintext">${userData.fullName}</span>
                        <a onclick="fullNameEdit('${uid}')" href="#" class="ml-2 text-primary"><i class="fas fa-edit"></i></a>
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Email:</label>
                    <div class="col-sm-9 d-flex justify-content-between">
                        <span class="form-control-plaintext">${userData.email}</span>
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">Date of Birth:</label>
                    <div class="col-sm-9 d-flex justify-content-between">
                        <span class="form-control-plaintext">${userData.dob}</span>
                        <a onclick="dobEdit('${uid}')" href="#" class="ml-2 text-primary"><i class="fas fa-edit"></i></a>
                    </div>
                </div>
            `

    }
    // })
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
        }else{
            console.log('No change in the name');
        }

    } catch (error) {
        console.log('error', error)
    }
}
// const emailEdit = (email) => {
//     console.log('email', email)
// }
const dobEdit =async (uid) => {
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
        }else{
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