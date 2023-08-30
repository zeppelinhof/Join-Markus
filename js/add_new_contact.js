let currentContactIndex = 0;

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


function addNewContact() {
    console.log('New contact added!');
}


function renderEditContact(i) {
    const editProfileIcon = document.getElementById('edit-contact-profile-icon');
    const inputEditName = document.getElementById('edit-name');
    const inputEditEmail = document.getElementById('edit-email');
    const inputEditPhone = document.getElementById('edit-phone');
    const colorStyle = returnContactColor(i);


    editProfileIcon.innerHTML = findFirstLetters(users[i]['name']);
    editProfileIcon.style = `background-color: ${colorStyle}; margin-bottom: 48px;`;

    inputEditName.value = users[i]['name'];
    inputEditEmail.value = users[i]['email'];
    inputEditPhone.value = users[i]['phone'];

    currentContactIndex = i;
}


async function addNewContact() {
    let inputName = document.getElementById('add-new-name').value;
    let inputEmail = document.getElementById('add-new-email').value;
    let inputPhone = document.getElementById('add-new-phone').value;

    users.push({
        name: inputName,
        email: inputEmail,
        password: '',
        phone: inputPhone
    });

    await setItem('users', JSON.stringify(users))

    showNewContact();
}


function showNewContact() {
    renderContacts();
    openAndCloseAddNewEditContact('add-new-contact-include-HTML', 'add-new-contact');
    openContactData(users.length - 1);
    document.getElementById(`contactCard-${users.length - 1}`).scrollIntoView({
        behavior: 'smooth'
    });
    addNewContactClear();
    setTimeout(addNewContactShowSlideBox, 50);
}


function addNewContactShowSlideBox() {
    let slideBox = document.getElementById('contact-added-slideBox');

    slideBox.classList.remove('contacts-d-none');

    setTimeout((() => {
        slideBox.classList.add('contacts-d-none');
    }), 6000);
    
}


function addNewContactClear() {
    document.getElementById('add-new-name').value = '';
    document.getElementById('add-new-email').value = '';
    document.getElementById('add-new-phone').value = '';
}


async function editContact() {
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

    editContactChangeSaveButton();
}


function editContactChangeSaveButton() {
    let btnSave = document.getElementById('edit-contact-btn-save');
    let btnTextSave = document.getElementById('edit-contact-btn-text-save');

    btnSave.disabled = true;
    btnTextSave.innerHTML = 'Done';
    btnSave.style = `background-color: ${contactColors[5]['style']}`;

    setTimeout(() => {
        btnSave.disabled = false;
        btnTextSave.innerHTML = 'Save';
        btnSave.style = `background-color: rgb(42, 54, 71)`;
    }, 1000);
}


async function deleteContact(i, openFalse = true) {
    users.splice(i, 1);

    await setItem('users', JSON.stringify(users));

    renderContacts();
    clearContactData();

    if (openFalse) {
        openAndCloseAddNewEditContact('edit-contact-include-HTML', 'edit-contact');
    }
}