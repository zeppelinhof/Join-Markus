let existLetterHeadline = '';


async function initContacts() {
    await loadUsers();
    renderContacts();
    await includeHTML();
    userInitials();
}


function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    let colorNumberIndex = 0;

    for (let i = 0; i < users.length; i++) {
        const [name, email] = [users[i]['name'], users[i]['email']];
        const firstLetter = users[i]['name'].charAt(0);
        const colorStyle = returnContactColor(i);

        addLetterHeadline(firstLetter, contactsList);

        let firstLetters = findFirstLetters(name);
        contactsList.innerHTML += getContactCardHTML(i, colorStyle, firstLetters, name, email)

        colorNumberIndex++;
        colorNumberIndex >= contactColors.length ? colorNumberIndex = 0 : null;
    }
}


function addLetterHeadline(firstLetter, contactsList) {
    if (existLetterHeadline != firstLetter || existLetterHeadline == '') {
        contactsList.innerHTML += getLetterHeadlineHTML(firstLetter.toUpperCase());
        existLetterHeadline = firstLetter;
    }
}


function findFirstLetters(name) {
    let splitName = name.split(' ');
    let letters = '';

    for (let i = 0; i < splitName.length; i++) {

        if (typeof splitName[i].substring(0, 1) == 'string') {
            letters += splitName[i].charAt(0).toUpperCase();
        } else {
            letters += splitName[i].substring(0, 1);
        }
    }

    return letters;
}


function openContactData(i) {
    let contactCard = document.getElementById(`contactCard-${i}`);
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');
    let windowSize = window.matchMedia('(max-width: 1050px)');

    if (contactCard.classList.contains('contact-card-click')) {
        contactCard.classList.remove('contact-card-click');
        clearContactData();
    } else {
        if (windowSize.matches) {
            conatacts.classList.add('contact-data-d-none');
            contactData.classList.remove('contact-data-d-none');
        } else {
            closeAllContactClicks();
            contactCard.classList.add('contact-card-click');
        }
        renderContactData(i);
    }
}


function closeContactData() {
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');

    conatacts.classList.remove('contact-data-d-none');
    contactData.classList.add('contact-data-d-none');
}


function renderContactData(i) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';


    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const firstLetters = findFirstLetters(name);
    const colorStyle = returnContactColor(i);

    setTimeout(() => {
        content.innerHTML = getContactDataHTML(i, colorStyle, firstLetters, name, email, phone)
        content.classList.add('contact-slide-animation')
    }, 50);
}

function clearContactData() {
    let content = document.getElementById('contact-data-content');

    content.innerHTML = '';
    content.classList.remove('contact-slide-animation');
}


function closeAllContactClicks() {
    clearContactData();

    let allClicks = document.querySelectorAll('div.contact-card-click');

    for (let i = 0; i < allClicks.length; i++) {
        let currentClick = allClicks[i];

        currentClick.classList.remove('contact-card-click');
    }
}


function openEditContactPointMenu() {
    let editContactPointMenu = document.getElementById('contact-data-name-edit-del-area')

    editContactPointMenu.classList.remove('contact-data-name-edit-del-area-slideout-animation');
    editContactPointMenu.classList.add('contact-data-name-edit-del-area-slidein-animation');

    editContactPointMenu.classList.remove('contacts-point-menu-d-none');
}

function closeEditContactPointMenu() {
    let editContactPointMenu = document.getElementById('contact-data-name-edit-del-area')

    editContactPointMenu.classList.remove('contact-data-name-edit-del-area-slidein-animation');
    editContactPointMenu.classList.add('contact-data-name-edit-del-area-slideout-animation');

    setTimeout(() => {
        editContactPointMenu.classList.add('contacts-point-menu-d-none');
    }, 500);
}

function notToClose(event) {
    event.stopPropagation();
}