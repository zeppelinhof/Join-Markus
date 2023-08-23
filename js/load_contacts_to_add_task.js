let users = [];
let contactsInTask = [];

// #region Load Users from Backend
async function initUsers() {
    loadUsers();
}

async function loadUsers() {
    users = JSON.parse(await getItem('users'));
    fillAssignedTo();
}

async function load_contacts() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value,
    });

    await setItem('users', JSON.stringify(users));

    fillAssignedTo();
    resetForm();
}

function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}

function fillAssignedTo() {
    for (let i = 0; i < users.length; i++) {    
        let user = users[i].email;
        document.getElementById('selectAssignedTo').innerHTML += /*html*/`
        <li onclick="contactToTask(${i}, ${user})" class="list-group-item">            
            <div class="list-item-display-flex">
                <div class="list-item-display-flex-icon-name">
                    <div id="contactCirle${i}" class="contactCirle"></div>
                    <div id="option${i}"></div>
                </div>
                <input class="form-check-input me-1 checkbox-padding" type="checkbox" value="" id="flexCheckDefault${i}">
            </div>
        </li>                  
    `        
        document.getElementById(`option${i}`).innerHTML += user;
        document.getElementById(`contactCirle${i}`).innerHTML += user.charAt(0);
        document.getElementById(`contactCirle${i}`).innerHTML += user.charAt(1);
    }
}

// #endregion Load Users from Backend

// #region Load Users to Dropdown
function contactToTask(i, contact){
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked == true) {
        document.getElementById(`flexCheckDefault${i}`).checked = false;
        deleteContact(contact);
    }
    else{
        contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
        document.getElementById(`flexCheckDefault${i}`).checked = true;
    }   
}

function deleteContact(contact){
    for (let i = 0; i < contactsInTask.length; i++) {
        const currentContact = contactsInTask[i];

        if (contact === currentContact) {
            contactsInTask.splice(i,1);
        }
    }
}
// #endregion Load Users to Dropdown