let currentContactIndex = 0;
let currentColorStyle = '';

function openAndCloseAddNewEditContact(id1, id2, i = 0, colorStyle = 'rgb(0,0,0)') {
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

/*     renderEditContact(i, colorStyle); */
}


function addNewContact() {
    console.log('New contact added!');
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

    currentContactIndex = i;
    currentColorStyle = colorStyle;
}


async function editContact() {
    let inputEditName = document.getElementById('edit-name').value;
    let inputEditEmail = document.getElementById('edit-email').value;
    let inputEditPhone = document.getElementById('edit-phone').value;
    let btnSave = document.getElementById('edit-contact-btn-save');
    let btnTextSave = document.getElementById('edit-contact-btn-text-save');

    users[currentContactIndex]['name'] = inputEditName;
    users[currentContactIndex]['email'] = inputEditEmail;
    users[currentContactIndex]['phone'] = inputEditPhone;

    await setItem('users', JSON.stringify(users))

    renderContacts();
    renderContactData(currentContactIndex, currentColorStyle);

    btnSave.disabled = true;
    btnTextSave.innerHTML = 'Done';

    setTimeout(() => {
        btnSave.disabled = false;
        btnTextSave.innerHTML = 'Save';
    }, 1500);
}