function openAndCloseAddNewEditContact(id1, id2, i=0, colorStyle='rgb(0,0,0)') {
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

    renderEditContact(i, colorStyle);
}


function renderEditContact(i, colorStyle) {
    let editProfileIcon = document.getElementById('edit-contact-profile-icon');
    let inputEditName = document.getElementById('edit-name');
    let inputEditEmail = document.getElementById('edit-email');
    let inputEditPhone = document.getElementById('edit-phone');

    editProfileIcon.innerHTML = findFirstLetters(users[i]['name']);
    editProfileIcon.style = `background-color: ${colorStyle}; margin-bottom: 48px;`;

    inputEditName.value = users[i]['name'];
    inputEditEmail.value = users[i]['email'];
    inputEditPhone.value = users[i]['phone'];
}


function addNewContact() {
    console.log('New contact added!');
}


function editContact() {
    console.log('Contact edited!');
}