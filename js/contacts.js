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


/* 
* colors from components
* form left to right
* and
* top to buttom
*/
let contactColors = [
    {
        'number': 1,
        'name': 'orange_1',
        'style': 'rgb(255,122,0)'
    },
    {
        'number': 2,
        'name': 'pink_1',
        'style': 'rgb(255,94,179)'
    },
    {
        'number': 3,
        'name': 'blue_purple',
        'style': 'rgb(110,81,255)'
    },
    {
        'number': 4,
        'name': 'purple',
        'style': 'rgb(147,39,255)'
    },
    {
        'number': 5,
        'name': 'turquoise',
        'style': 'rgb(1,190,232)'
    },
    {
        'number': 6,
        'name': 'seagreen',
        'style': 'rgb(31,215,193)'
    },
    {
        'number': 7,
        'name': 'orange_red',
        'style': 'rgb(255,116,94)'
    },
    {
        'number': 8,
        'name': 'orange_2',
        'style': 'rgb(255,163,94)'
    },
    {
        'number': 9,
        'name': 'pink_2',
        'style': 'rgb(252,113,255)'
    },
    {
        'number': 10,
        'name': 'yellow_1',
        'style': 'rgb(252,199,1)'
    },
    {
        'number': 11,
        'name': 'blue',
        'style': 'rgb(0,56,255)'
    },
    {
        'number': 12,
        'name': 'yellow_2',
        'style': 'rgb(255,230,43)'
    },
    {
        'number': 13,
        'name': 'red',
        'style': 'rgb(255,70,70)'
    },
    {
        'number': 14,
        'name': 'ocher',
        'style': 'rgb(255,187,43)'
    }
]

let existLetterHeadline = '';


function initContacts() {
    renderContacts();
    includeHTML();
}


function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    let colorNumberIndex = 0;

    for (let i = 0; i < contacts.length; i++) {
        const [name, email] = [contacts[i]['name'], contacts[i]['email']];
        const firstLetter = contacts[i]['name'].charAt(0);
        const colorStyle = contactColors[colorNumberIndex]['style'];

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
        letters += splitName[i].charAt(0).toUpperCase();
    }

    return letters;
}


function openContactData(i, colorStyle) {
    let contactCard = document.getElementById(`contactCard-${i}`);

    if (contactCard.classList.contains('contact-card-click')) {
        contactCard.classList.remove('contact-card-click');
        clearContactData();
    } else {
        closeAllContactClicks();
        contactCard.classList.add('contact-card-click');
        renderContactData(i, colorStyle);
    }
}


function renderContactData(i, colorStyle) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';


    const name = contacts[i]['name'];
    const email = contacts[i]['email'];
    const phone = contacts[i]['phone'];
    const firstLetters = findFirstLetters(name);

    setTimeout(() => {
        content.innerHTML = getContactDataHTML(colorStyle, firstLetters, name, email, phone)
        content.classList.add('contact-data-content-animation')
    }, 50);
}

function clearContactData() {
    let content = document.getElementById('contact-data-content');

    content.innerHTML = '';
    content.classList.remove('contact-data-content-animation');
}


function closeAllContactClicks() {
    clearContactData();

    let allClicks = document.querySelectorAll('div.contact-card-click');

    for (let i = 0; i < allClicks.length; i++) {
        let currentClick = allClicks[i];

        currentClick.classList.remove('contact-card-click');
    }
}


function openAddNewContact() {
    document.getElementById('add-new-contact').classList.remove('contacts-d-none');
}