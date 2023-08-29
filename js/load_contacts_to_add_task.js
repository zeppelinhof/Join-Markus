let users = [];
let contactsInTask = [];
let subtasks = [];


// #region Load Users from Backend
async function initUsers() {
    includeHTML();
    loadUsers();
}

async function loadUsers() {
    users = JSON.parse(await getItem('users'));
    fillAssignedTo();
}

async function register_user() {
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
    location.reload();
}

function fillAssignedTo() {
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        document.getElementById('selectAssignedTo').innerHTML += showDropdown(i, user);
        fillUsername(i, user);
        // takeColor();
    }
}

function showDropdown(i, user) {
    return /*html*/`
    <li class="list-group-item">            
        <div class="list-item-display-flex" onclick="contactToTaskClickName(${i}, '${user}')">
            <div class="list-item-display-flex-icon-name">
                <div id="contactCircle${i}" class="contactCircle"></div>
                <div id="option${i}"></div>
            </div>
            <input class="form-check-input me-1 checkbox-padding checkbox-modified d-none" type="checkbox" id="flexCheckDefault${i}" value="">            
            <img id="check_filled${i}" src="assets/img/Check_button_filled.svg" class="d-none">
            <img id="check_empty${i}" src="assets/img/Check_button_empty.svg" class="">
        </div>
    </li>                  
`
}

function fillUsername(i, user) {
    document.getElementById(`option${i}`).innerHTML += user;
    initialsInCircle_List(i, user);
}

// Create Circles in list
function initialsInCircle_List(i, contact) {
    document.getElementById(`contactCircle${i}`).innerHTML = getInitials(contact);
}

// #endregion Load Users from Backend

// #region Load Users to Dropdown
function contactToTaskClickName(i, user) {
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked) {
        add_d_none(`check_filled${i}`);
        remove_d_none(`check_empty${i}`);
        document.getElementById(`flexCheckDefault${i}`).checked = false;
        deleteContact(user);
    }
    else {
        // Create Circles of selected users below list
        remove_d_none(`check_filled${i}`);
        add_d_none(`check_empty${i}`);
        contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
        drawContactCirclesBelow();

        document.getElementById(`flexCheckDefault${i}`).checked = true;
    }
}

// #endregion Load Users to Dropdown

function contactToTaskClickCheckbox(i, user) {
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked) {
        contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
        drawContactCirclesBelow();
    }
    else {
        deleteContact(user);
    }
}

function drawContactCirclesBelow() {
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    for (let i = 0; i < contactsInTask.length; i++) {
        const user = contactsInTask[i];
        document.getElementById('selected-contacts-circles-below').innerHTML += /*html*/`
            <div class="contactCircle" id ="contactCircleBelow${i}"></div>       
        `
        document.getElementById(`contactCircleBelow${i}`).innerHTML = getInitials(user);
    }
}

function getInitials(contact) {
    initials = contact.charAt(0);
    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}

function deleteContact(contact) {
    for (let i = 0; i < contactsInTask.length; i++) {
        const currentContact = contactsInTask[i];

        if (contact === currentContact) {
            contactsInTask.splice(i, 1);
        }
    }
    drawContactCirclesBelow();
}

function takeColor(){
    let colorArray = [
        "#1c6b02",
        "#6b0266",
        "#FF3D00",
        "#03cffc",
        "#6b1202",
        "#0390fc",
        "#023e6b",
        "#3a6b02",
        "#fc4103",
        "#6b3e02",
        "#FFA800",
        "#2d03fc",
        "#f003fc",
        "#961212",
        "#3c1296",
        "#128e96",
        "#707a59"
    ];
    for (let i = 0; i < colorArray.length; i++) {
        // const color = colorArray[i];
        // document.getElementById(`contactCircle${i}`).classList += /*css*/`
        //     background-color: ${colorArray[i]}
        // `            
    }
}