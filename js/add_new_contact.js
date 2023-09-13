let currentContactIndex = 0;

/**
 * This function opens and close the 'add new -' and 'edit contact' overlay.
 * @param {string} id1 is the id in the template from the parent container.
 * @param {string} id2 is the id from the includet container in the mainpage.
 * @param {boolean} renderEdit call the renderfunction from 'edit contact' overlay.
 * @param {number} i is the index number from the array users and have a default value.
 */
function openAndCloseAddNewEditContact(id1, id2, renderEdit, i = 0) {
    let addNewContactInlcudeHTML = document.getElementById(id1);
    let addNewContact = document.getElementById(id2)

    if (addNewContactInlcudeHTML.classList.contains('contacts-d-none')) {
        addNewContact.classList.remove('add-new-contact-slideout-animation');
        addNewContact.classList.add('add-new-contact-slidein-animation');

        addNewContactInlcudeHTML.classList.remove('contacts-d-none');
    } else {
        addNewContact.classList.remove('add-new-contact-slidein-animation');
        addNewContact.classList.add('add-new-contact-slideout-animation');

        setTimeout(() => {
            addNewContactInlcudeHTML.classList.add('contacts-d-none');
        }, 450);
    }

    if (renderEdit) {
        renderEditContact(i);
    };
}


/**
 * This function rendert the contact information on 'edit contact' overlay.
 * @param {number} i is the index number from array users.
 */
function renderEditContact(i) {
    const editProfileIcon = document.getElementById('edit-contact-profile-icon');
    const inputEditName = document.getElementById('edit-name');
    const inputEditEmail = document.getElementById('edit-email');
    const inputEditPhone = document.getElementById('edit-phone');
    const colorStyle = returnContactColor(i);


    editProfileIcon.innerHTML = getInitials(users[i]['name']);
    editProfileIcon.style = `background-color: ${colorStyle}; margin-bottom: 48px;`;

    inputEditName.value = users[i]['name'];
    inputEditEmail.value = users[i]['email'];
    inputEditPhone.value = users[i]['phone'];

    currentContactIndex = i;
}


/**
 * This function added a new contact to the array users.
 * @param {number} i is the index number from array users.
 */
async function addNewContact() {
    loadingScreen();

    let inputName = document.getElementById('add-new-name').value;
    let inputEmail = document.getElementById('add-new-email').value;
    let inputPhone = document.getElementById('add-new-phone').value;


    users.push({
        name: inputName,
        email: inputEmail,
        password: '',
        phone: inputPhone
    });


    [users, currentContactIndex] = sortUsers();

    await setItem('users', JSON.stringify(users))

    await showNewContactOrInitUsers();
}


/**
 * This function opens and close the loadingscreen on the contacts side.
 * As long as the loading screen is open, no actions can be carried out on the page.
 */
async function loadingScreen() {
    try {
        let loadingScreen = document.getElementById('contacts-loading-sreen');
        loadingScreen.classList.remove('contacts-d-none');
        setTimeout(() => {
            loadingScreen.classList.add('contacts-d-none');
        }, 2000);
    } catch (e) {
        return;
    }
}


/* show new contact on contatcts.html or add_task.html */
async function showNewContactOrInitUsers() {
    try {
        showNewContact();
    } catch (e) {
        await loadUsers();
        openAndCloseAddNewEditContact('add-new-contact-include-HTML', 'add-new-contact');
        addNewContactClear();
    }
}


/* show the new contact in the contactdata screen */
function showNewContact() {
    renderContacts();
    openAndCloseAddNewEditContact('add-new-contact-include-HTML', 'add-new-contact');
    openContactData(currentContactIndex);

    let scrollPositionElement = document.getElementById(`contactCard-${currentContactIndex}`);
    scrollPositionElement.scrollIntoView({
        block: "end",
        behavior: "smooth"
    });

    addNewContactClear();
    addNewContactShowSlideBox('Contact succesfull created');
}


/* show a little box with status form added, changed or deleted contact */
function addNewContactShowSlideBox(text) {
    let slideBox = document.getElementById('contact-added-slideBox');
    let slideBoxText = document.getElementById('contact-slideBox-text');

    slideBoxText.innerHTML = text;

    slideBox.classList.remove('contacts-d-none');

    setTimeout((() => {
        slideBox.classList.add('contacts-d-none');
    }), 1500);

}


/* blanks the add new contact overlay */
function addNewContactClear() {
    document.getElementById('add-new-name').value = '';
    document.getElementById('add-new-email').value = '';
    document.getElementById('add-new-phone').value = '';
}


/* changed contact datas from current contact */
async function editContact() {
    loadingScreen();


    let inputName = document.getElementById('edit-name').value;
    let inputEmail = document.getElementById('edit-email').value;
    let inputPhone = document.getElementById('edit-phone').value;
    let currentColorStyle = returnContactColor(currentContactIndex);

    users[currentContactIndex]['name'] = inputName;
    users[currentContactIndex]['email'] = inputEmail;
    users[currentContactIndex]['phone'] = inputPhone;

    await setItem('users', JSON.stringify(users))

    renderContacts();
    renderContactData(currentContactIndex, currentColorStyle);

    openAndCloseAddNewEditContact('edit-contact-include-HTML', 'edit-contact');
    addNewContactShowSlideBox('Contact changed');
}


/* deleted the current contact */
async function deleteContact(i = currentContactIndex, openFalse = true) {
    loadingScreen();

    let windowSize = window.matchMedia('(max-width: 1050px)');
    users.splice(i, 1);

    await setItem('users', JSON.stringify(users));

    renderContacts();
    clearContactData();

    if (openFalse) {
        openAndCloseAddNewEditContact('edit-contact-include-HTML', 'edit-contact');
    }

    if (windowSize.matches) {
        closeContactData();
    }

    addNewContactShowSlideBox('Contact deleted');
}