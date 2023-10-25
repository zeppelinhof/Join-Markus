let contactsInTask = [];
let subtasks = [];
let maxVisibleCirclesBelow = 4;

// #region Load Users from Backend
async function initUsers() {
    includeHTML();
    loadUsers();
    fillAssignedTo();
}

/**
 * push auser data to array users
 */
async function register_user() {
    users.push({
        name: _name.value,
        email: email.value,
        password: password.value,
        phone: phone.value
    });
    await setItem('users', JSON.stringify(users));

    fillAssignedTo();
    resetForm();
}

/**
 * reset the users data and reload page
 */
function resetForm() {
    _name.value = '';
    email.value = '';
    password.value = '';
    phone.value = '';
    users = [];
    location.reload();
}

/**
 * go through all users registered in backend
 */
async function fillAssignedTo() {
    document.getElementById('selectAssignedTo').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        document.getElementById('selectAssignedTo').innerHTML += showDropdown(i, user);
        fillUsername(i, user);
    }
}

/**
 * add a list list element for user in unsorted list (dropdown)
 * 
 * @param {number} i -index of user in list
 * @param {string} user 
 * @returns 
 */
function showDropdown(i, user) {
    const colorStyle = returnContactColor(i);
    return /*html*/`
    <li class="list-group-item">            
        <div class="list-item-display-flex" onclick="contactToTaskClickName(${i}, '${user}')">
            <div class="list-item-display-flex-icon-name">
                <div id="contactCircle${i}" class="contactCircle" style="background-color: ${colorStyle}"></div>
                <div id="option${i}"></div>
            </div>
            <input class="form-check-input me-1 checkbox-padding checkbox-modified d-none" type="checkbox" id="flexCheckDefault${i}" value="">            
            <img id="check_filled${i}" src="assets/img/Check_button_filled.svg" class="d-none">
            <img id="check_empty${i}" src="assets/img/Check_button_empty.svg" class="">
        </div>
    </li>                  
`
}

/**
 * write name and find initials
 * 
 * @param {number} i -
 * @param {string} user - username
 */
function fillUsername(i, user) {
    document.getElementById(`option${i}`).innerHTML += user;
    initialsInCircle_List(i, user);
}

/**
 * call initials function
 * 
 * @param {*} i 
 * @param {*} contact - same as user
 */
function initialsInCircle_List(i, contact) {
    document.getElementById(`contactCircle${i}`).innerHTML = getInitials(contact);
}

// #endregion Load Users from Backend

// #region Load Users to Dropdown
function contactToTaskClickName(i, user) {
    let checkbox = document.getElementById(`flexCheckDefault${i}`);
    if (checkbox.checked) {
        removeListUser(i, user);
    }
    else {
        addListUser(i);
    }
}

/**
 * Uncheck name in the list, remove by deleteContactTask()
 * 
 * @param {number} i - index of user in list
 * @param {string} user -to remove
 */
function removeListUser(i, user) {
    add_d_none(`check_filled${i}`);
    remove_d_none(`check_empty${i}`);
    document.getElementById(`flexCheckDefault${i}`).checked = false;
    deleteContactTask(user);
}

/**
 * Check name in the list, save in array and draw colored circle
 * 
 * @param {number} i - index of user in list
 */
function addListUser(i) {
    remove_d_none(`check_filled${i}`);
    add_d_none(`check_empty${i}`);
    contactsInTask.push(document.getElementById(`option${i}`).innerHTML);
    drawContactCirclesBelow();
    document.getElementById(`flexCheckDefault${i}`).checked = true;
}

// #endregion Load Users to Dropdown

/**
 * If a user is selcted draw a colred circle below
 */
function drawContactCirclesBelow() {
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    let lastCircleDrawed = false;
    for (let i = 0; i < contactsInTask.length; i++) {
        if (i < maxVisibleCirclesBelow) {
            drawNewCircle(i);
        } else {
            onlySummedUpCircle(i, lastCircleDrawed);
            lastCircleDrawed = true;
        }
    }
}

/**
 * 
 * see similar function in boardEdit.js
 */
function drawNewCircle(i) {    
    const colorStyle = returnContactColor(i);
    const user = contactsInTask[i];
    document.getElementById('selected-contacts-circles-below').innerHTML += /*html*/`
        <div class="contactCircle" id ="contactCircleBelow${i}" style="background-color: ${colorStyle}"></div>       
    `
    document.getElementById(`contactCircleBelow${i}`).innerHTML = getInitials(user);
}

/**
 * 
 * see similar function in boardEdit.js
 */
function onlySummedUpCircle(i, lastCircleDrawed) {    
    if (!lastCircleDrawed) {        
        firstSummedUpCircle(i);
    } else {
        furtherSummedUpCircle(i);
    }
}

/**
 * 
 * see similar function in boardEdit.js
 */
function firstSummedUpCircle(i) {    
    const colorStyle = returnContactColor(maxVisibleCirclesBelow);
    document.getElementById('selected-contacts-circles-below').innerHTML += /*html*/`
    <div class="contactCircle" id ="contactCircleBelow${maxVisibleCirclesBelow}" style="background-color: ${colorStyle}">+${i + 1 - maxVisibleCirclesBelow}</div>       
    `
}

/**
 * 
 * see similar function in boardEdit.js
 */
function furtherSummedUpCircle(i){
    document.getElementById(`contactCircleBelow${maxVisibleCirclesBelow}`).innerHTML = '+' + (i + 1 - maxVisibleCirclesBelow);
}

/**
 * 
 * @param {obj} contact - contact by clicking name in Assigned To list
 */
function deleteContactTask(contact) {
    for (let i = 0; i < contactsInTask.length; i++) {
        const currentContact = contactsInTask[i];

        if (contact === currentContact) {
            contactsInTask.splice(i, 1);
        }
    }
    drawContactCirclesBelow();
}