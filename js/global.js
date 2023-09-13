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


let alphabet = [
    { 'number': 0, 'letter': 'a' },
    { 'number': 1, 'letter': 'b' },
    { 'number': 2, 'letter': 'c' },
    { 'number': 3, 'letter': 'd' },
    { 'number': 4, 'letter': 'e' },
    { 'number': 5, 'letter': 'f' },
    { 'number': 6, 'letter': 'g' },
    { 'number': 7, 'letter': 'h' },
    { 'number': 8, 'letter': 'i' },
    { 'number': 9, 'letter': 'j' },
    { 'number': 10, 'letter': 'k' },
    { 'number': 11, 'letter': 'l' },
    { 'number': 12, 'letter': 'm' },
    { 'number': 13, 'letter': 'n' },
    { 'number': 14, 'letter': 'o' },
    { 'number': 15, 'letter': 'p' },
    { 'number': 16, 'letter': 'q' },
    { 'number': 17, 'letter': 'r' },
    { 'number': 18, 'letter': 's' },
    { 'number': 19, 'letter': 't' },
    { 'number': 20, 'letter': 'u' },
    { 'number': 21, 'letter': 'v' },
    { 'number': 22, 'letter': 'w' },
    { 'number': 23, 'letter': 'x' },
    { 'number': 24, 'letter': 'y' },
    { 'number': 25, 'letter': 'z' },
];

let sidebarNavElements = [
    'summary',
    'add_task',
    'board',
    'contacts'
]


async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    let file;

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found.';
        };
    }
}


function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu');

    if (contextMenu.classList.contains('topbar-d-none')) {
        contextMenu.classList.remove('topbar-d-none')
    } else (
        contextMenu.classList.add('topbar-d-none')
    )
}


function queryUserName() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var userName = urlParams.get('name');
    return userName;
}


function userInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


async function initHelp() {
    await includeHTML();
    userInitials();
}


function getInitials(contact) {
    initials = contact.charAt(0);
    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}


function linkPage(pageName) {
    saveSidebarNavHighlights(pageName);

    window.location.href = pageName + ".html?name=" + encodeURIComponent(queryUserName());
}



/* ------------------------------------------------------------- */
/*      highlighted nav area sidebar permanently on clicke       */
/* ------------------------------------------------------------- */

function initSidebarNavHighlighted() {
    setTimeout((() => {
        loadSidebarNavHighlights()
    }), 325);
}

function setItemLocalStorage(key, value) {
    localStorage.setItem(key, value)
}

function getItemLocalStorage(key) {
    return localStorage.getItem(key);
}

function saveSidebarNavHighlights(pageName) {
    setItemLocalStorage('pageName', pageName);
    setItemLocalStorage('sidebar-t-highlighted', 'sidebar-t-highlighted')

    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        if (navElement == pageName) {
            setItemLocalStorage(`sidebar-icon-${navElement}-highlighted`, `sidebar-icon-${navElement}-highlighted`);
        }
    }
}

function loadSidebarNavHighlights() {
    let pageName = getItemLocalStorage('pageName');
    let sidebarClickedIcon = '';
    let sidebarClickedText = '';

    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        if (navElement == pageName) {
            sidebarClickedText = getItemLocalStorage('sidebar-t-highlighted');
            sidebarClickedIcon = getItemLocalStorage(`sidebar-icon-${navElement}-highlighted`);
        }
    }

    try {
        document.getElementById(`sidebar-${pageName}`).classList.add(`${sidebarClickedText}`);
        document.getElementById(`sidebar-${pageName}`).children[0].classList.add(`${sidebarClickedIcon}`);
    } catch (e) {
        return;
    }
}


function removeSibebarNavHighlights() {
    let pageName = getItemLocalStorage('pageName');

    document.getElementById(`sidebar-${pageName}`).classList.add('sidebar-t-highlighted');
    document.getElementById(`sidebar-${pageName}`).children[0].classList.add(`sidebar-icon-${pageName}-highlighted`);
}

/* ------------------------------------------------------------- */
/* ------------------------------------------------------------- */



async function initInfoPage() {
    await includeHTML();
    document.getElementById('sidebar-nav').style.display = "none";
    document.getElementById('topbar-nav').style.display = "none";
}


function returnContactColor(i) {
    let result = i % contactColors.length

    return contactColors[result]['style'];
}


function returnContactColorByName(name) {
    let index = 0;

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        if (userName == name) {
            index = i;
            break;
        }
    }

    return returnContactColor(index);
}


function sortUsers() {
    let alphabetUsers = [];
    let lastAddedContactIndex = 0;
    let outOfFunctionFirstLoop = false;

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        let userNameWithoutSpace = returnNameWithoutSpaces(userName);

        let alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[0].toLowerCase());

        if (alphabetUsers.length == 0) {
            alphabetUsers.push(retrunUserJSON(i));
        } else {
            [alphabetUsers, lastAddedContactIndex] = compareUsersWithAlphabetUsersFirstLoop(i, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser);
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}


function compareUsersWithAlphabetUsersFirstLoop(i, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser) {
    for (let k = 0; k < alphabetUsers.length; k++) {
        const alphabetUsersName = alphabetUsers[k]['name'];
        let alphabetUserNameWithoutSpace = returnNameWithoutSpaces(alphabetUsersName);

        [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop] = compareUsersWithAlphabetUsersSecondLoop(i, k, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser, alphabetUserNameWithoutSpace);

        if (outOfFunctionFirstLoop) {
            outOfFunctionFirstLoop = false;
            break;
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}


function compareUsersWithAlphabetUsersSecondLoop(i, k, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser, alphabetUserNameWithoutSpace) {
    let outOfFunctionSecondLoop = false;

    for (let l = 0; l < alphabetUserNameWithoutSpace.length; l++) {
        const alphabetUserNamerCurrentLetter = alphabetUserNameWithoutSpace[l].toLowerCase();
        const alphabetLetterCurrentAlphabetUser = alphabet.find(element => element['letter'] == alphabetUserNamerCurrentLetter);

        if (alphabetLetterCurrentUser['number'] > alphabetLetterCurrentAlphabetUser['number'] && k < alphabetUsers.length - 1 && l < 1) {
            break;
        }

        [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop] = addContactToAlphabetUsers(i, k, l, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop, alphabetLetterCurrentUser, alphabetLetterCurrentAlphabetUser, alphabetUserNameWithoutSpace);

        if (outOfFunctionSecondLoop) {
            outOfFunctionSecondLoop = false;
            break;
        } else {
            alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[l + 1].toLowerCase());
        }
    }

    return [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop];
}


function addContactToAlphabetUsers(i, k, l, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop, alphabetLetterCurrentUser, alphabetLetterCurrentAlphabetUser, alphabetUserNameWithoutSpace) {
    if (alphabetLetterCurrentUser['number'] > alphabetLetterCurrentAlphabetUser['number']) {
        if (k == alphabetUsers.length - 1) {
            alphabetUsers.splice(k + 1, 0, retrunUserJSON(i));
            outOfFunctionFirstLoop = true;
        }

        outOfFunctionSecondLoop = true;

        lastAddedContactIndex = k + 1;
    } else if (alphabetLetterCurrentUser['number'] < alphabetLetterCurrentAlphabetUser['number']) {
        alphabetUsers.splice(k, 0, retrunUserJSON(i));
        lastAddedContactIndex = k;
        outOfFunctionFirstLoop = true;
        outOfFunctionSecondLoop = true;
    }
    else if (l == alphabetUserNameWithoutSpace.length - 1) {
        alphabetUsers.splice(k + 1, 0, retrunUserJSON(i));
        lastAddedContactIndex = k + 1;
        outOfFunctionFirstLoop = true;
        outOfFunctionSecondLoop = true;
    }

    return [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop];
}


function retrunUserJSON(i) {
    return {
        name: users[i]['name'],
        email: users[i]['email'],
        password: users[i]['password'],
        phone: users[i]['phone']
    };
}


function returnNameWithoutSpaces(name) {
    let splitName = name.split(' ');
    let nameWithoutSpaces = '';

    for (let m = 0; m < splitName.length; m++) {
        nameWithoutSpaces += splitName[m];
    }

    return nameWithoutSpaces;
}


function logoutUser() {
    localStorage.removeItem('email');
}