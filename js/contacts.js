let contacts = [
    {
        'name': 'Anton Mayer',
        'email': 'anton@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Anja Schulz',
        'email': 'schulz@hotmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Benedikt Ziegler',
        'email': 'benedikt@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Clemens H.',
        'email': 'clem@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'David Eisenberg',
        'email': 'davidberg@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Eva Fischer',
        'email': 'eva@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Emmanuel Mauer',
        'email': 'emmanuelma@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Juri Sajzew',
        'email': 'js@gmail.com',
        'phone': '0170 333333'
    },
    {
        'name': 'Markus',
        'email': 'mark@gmail.com',
        'phone': '0170 333333'
    }
];


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

    if (contactCard.classList.contains('contact-card-click')) {
        contactCard.classList.remove('contact-card-click');
        clearContactData();
    } else {
        closeAllContactClicks();
        contactCard.classList.add('contact-card-click');
        renderContactData(i);
    }
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