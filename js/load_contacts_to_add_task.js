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
        name: _name.value,
        email: email.value,
        password: password.value,
        phone: phone.value
    });
    // Save local array 'users' in global backend array 'users' via post
    await setItem('users', JSON.stringify(users));

    fillAssignedTo();
    resetForm();
}

function resetForm() {
    _name.value = '';
    email.value = '';
    password.value = '';
    phone.value = '';
    users = [];
    registerBtn.disabled = false;
    location.reload();
}

function fillAssignedTo() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        document.getElementById('selectAssignedTo').innerHTML += /*html*/`
        <li class="list-group-item">            
            <div class="list-item-display-flex">
                <div class="list-item-display-flex-icon-name" onclick="contactToTaskClickName(${i}, '${user}')">
                    <div id="contactCirle${i}" class="contactCirle"></div>
                    <div id="option${i}"></div>
                </div>
                <input class="form-check-input me-1 checkbox-padding" type="checkbox" onclick="contactToTaskClickCheckbox(${i}, '${user}')" id="flexCheckDefault${i}" value="">
            </div>
        </li>                  
    `
        document.getElementById(`option${i}`).innerHTML += user;
        initialsInCirle(i, user);
    }
}
// Create Circles in list
function initialsInCirle(i, user) {
    document.getElementById(`contactCirle${i}`).innerHTML += user.charAt(0);
    if (user.match(' ')) {
        document.getElementById(`contactCirle${i}`).innerHTML += user.charAt(user.match(' ').index + 1);
    }
}

// #endregion Load Users from Backend

// #region Load Users to Dropdown
function contactToTaskClickName(i, user) {
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked == true) {
        document.getElementById(`flexCheckDefault${i}`).checked = false;
        deleteContact(user);
    }
    else {
        // Create Circles of selected users below list
        contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
        document.getElementById('selected-contacts-circles-below').innerHTML += /*html*/`
            <div class="contactCirle" id ="contactCircleBelow${i}"></div>       
        `
        document.getElementById(`contactCircleBelow${i}`).innerHTML += user.charAt(0);
        if (user.match(' ')) {
            document.getElementById(`contactCircleBelow${i}`).innerHTML += user.charAt(user.match(' ').index + 1);
        }
        
        document.getElementById(`flexCheckDefault${i}`).checked = true;
    }
}

function contactToTaskClickCheckbox(i, contact) {
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked == true) {
        contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
    }
    else {
        deleteContact(contact);
    }
}

function deleteContact(contact) {
    for (let i = 0; i < contactsInTask.length; i++) {
        const currentContact = contactsInTask[i];

        if (contact === currentContact) {
            contactsInTask.splice(i, 1);
        }
    }
}
// #endregion Load Users to Dropdown