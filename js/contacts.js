let existLetterHeadline = '';


async function initContacts() {
    await loadUsers();
    renderContacts();
    await includeHTML();
    userInitials();
}


/* rendert all contacts from users[] as contactlist */
function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    let colorNumberIndex = 0;

    for (let i = 0; i < users.length; i++) {
        const [name, email] = [users[i]['name'], users[i]['email']];
        const firstLetter = users[i]['name'].charAt(0);
        const colorStyle = returnContactColor(i);

        addLetterHeadline(firstLetter, contactsList);

        let firstLetters = getInitials(name);
        contactsList.innerHTML += getContactCardHTML(i, colorStyle, firstLetters, name, email)

        colorNumberIndex++;
        colorNumberIndex >= contactColors.length ? colorNumberIndex = 0 : null;
    }
}


/* added the letter category for contacts A, B, C etc. */
function addLetterHeadline(firstLetter, contactsList) {
    if (existLetterHeadline.toLocaleLowerCase() != firstLetter.toLocaleLowerCase() || existLetterHeadline == '') {
        contactsList.innerHTML += getLetterHeadlineHTML(firstLetter.toUpperCase());
        existLetterHeadline = firstLetter;
    }
}


/* open the datas from clicked contact from the contactlist */
function openContactData(i) {
    let contactCard = document.getElementById(`contactCard-${i}`);
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');
    let windowSize = window.matchMedia('(max-width: 1350px)');

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


/* close the the clicked contactdatas */
function closeContactData() {
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');

    conatacts.classList.remove('contact-data-d-none');
    contactData.classList.add('contact-data-d-none');

    closeAllContactClicks();
}


/* render the screen 'contactdata' with the datas from clicked contact */
function renderContactData(i) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';


    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const firstLetters = getInitials(name);
    const colorStyle = returnContactColor(i);

    setTimeout(() => {
        content.innerHTML = getContactDataHTML(i, colorStyle, firstLetters, name, email, phone)
        content.classList.add('contact-slide-animation')
    }, 50);
}


/* blanks the contactdatas */
function clearContactData() {
    let content = document.getElementById('contact-data-content');

    content.innerHTML = '';
    content.classList.remove('contact-slide-animation');
}


/* ensures that only one contact is marked as clicked */
function closeAllContactClicks() {
    clearContactData();

    let allClicks = document.querySelectorAll('div.contact-card-click');

    for (let i = 0; i < allClicks.length; i++) {
        let currentClick = allClicks[i];

        currentClick.classList.remove('contact-card-click');
    }
}


/* open the context menu in the responsive view for edit and delete contact */
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


/* excludes a child container from the parent container's onclick method */
function notToClose(event) {
    event.stopPropagation();
}


/* ----------- */
/* media query */
/* ----------- */

/* switch between contactlist and contactdata if media matches */
window.addEventListener('resize', () => {
    let contacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');
    let contactDataContent = document.getElementById('contact-data-content');
    let windowSize = window.matchMedia('(max-width: 1350px)');

    if (contactDataContent.childNodes.length == 1) {
        contactDataContent.innerHTML = '';
    }

    if (windowSize.matches && contactDataContent.innerHTML > '') {
        contacts.classList.add('contact-data-d-none');
        contactData.classList.remove('contact-data-d-none');
    } else {
        contacts.classList.remove('contact-data-d-none');
        contactData.classList.add('contact-data-d-none');
    }
});