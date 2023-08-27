function openAndCloseAddNewContact() {
    let addNewContactInlcudeHTML = document.getElementById('add-new-contact-include-HTML');
    let addNewContact = document.getElementById('add-new-contact')

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
}

function addNewContact() {
    console.log('New contact added!')
}