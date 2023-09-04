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

let alphabet = [
    { 'number': 1, 'letter': 'a' },
    { 'number': 2, 'letter': 'b' },
    { 'number': 3, 'letter': 'c' },
    { 'number': 4, 'letter': 'd' },
    { 'number': 5, 'letter': 'e' },
    { 'number': 6, 'letter': 'f' },
    { 'number': 7, 'letter': 'g' },
    { 'number': 8, 'letter': 'h' },
    { 'number': 9, 'letter': 'i' },
    { 'number': 10, 'letter': 'j' },
    { 'number': 11, 'letter': 'k' },
    { 'number': 12, 'letter': 'l' },
    { 'number': 13, 'letter': 'm' },
    { 'number': 14, 'letter': 'n' },
    { 'number': 15, 'letter': 'o' },
    { 'number': 16, 'letter': 'p' },
    { 'number': 17, 'letter': 'q' },
    { 'number': 18, 'letter': 'r' },
    { 'number': 19, 'letter': 's' },
    { 'number': 20, 'letter': 't' },
    { 'number': 21, 'letter': 'u' },
    { 'number': 22, 'letter': 'v' },
    { 'number': 23, 'letter': 'w' },
    { 'number': 24, 'letter': 'x' },
    { 'number': 25, 'letter': 'y' },
    { 'number': 26, 'letter': 'z' },
];


//used by topbar_template.html
function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu');

    if (contextMenu.classList.contains('topbar-d-none')) {
        contextMenu.classList.remove('topbar-d-none')
    } else (
        contextMenu.classList.add('topbar-d-none')
    )
}


//used by all main pages
function queryUserName() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var userName = urlParams.get('name');
    return userName;
}

//used by all main pages
function userInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


//used by all main pages
function getInitials(contact) {
    initials = contact.charAt(0);
    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}


//used by sidebar buttons to link to other pages
function linkPage(pageName) {
    window.location.href = pageName + ".html?name=" + encodeURIComponent(queryUserName());
}


//used by Legal Notice and Privacy Policy
async function initInfoPage() {
    await includeHTML();
    document.getElementById('sidebar-nav').style.display = "none";
    document.getElementById('topbar-nav').style.display = "none";
}


//return the color to the contact index
function returnContactColor(i) {
    let result = i % contactColors.length

    return contactColors[result]['style'];
}


//sortet users by alphabet
function sortUsers() {
    let alphabetUsers = [];
    let lastAddedContactIndex = 0; 

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        const userNameList = userName.split(' ');
        let userNameWithoutSpace = '';

        for (let m = 0; m < userNameList.length; m++) {
            userNameWithoutSpace += userNameList[m];
        }

        let alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[0].toLowerCase());

        if (alphabetUsers.length == 0) {
            alphabetUsers.push({
                name: users[i]['name'],
                email: users[i]['email'],
                password: users[i]['password'],
                phone: users[i]['phone']
            });
        } else {
            loop1:
            for (let k = 0; k < alphabetUsers.length; k++) {
                const alphabetUsersName = alphabetUsers[k]['name'];
                const alphabetUserNameList = alphabetUsersName.split(' ');
                let alphabetUserNameWithoutSpace = '';

                for (let m = 0; m < alphabetUserNameList.length; m++) {
                    alphabetUserNameWithoutSpace += alphabetUserNameList[m];
                }

                for (let l = 0; l < alphabetUserNameWithoutSpace.length; l++) {
                    const alphabetUserNamerCurrentLetter = alphabetUserNameWithoutSpace[l].toLowerCase();
                    const alphabetLetterCurrentAlphabetUser = alphabet.find(element => element['letter'] == alphabetUserNamerCurrentLetter);

                    if (alphabetLetterCurrentUser['number'] > alphabetLetterCurrentAlphabetUser['number'] && k < alphabetUsers.length - 1 && l < 1) {
                        break;
                    }
                    else if (alphabetLetterCurrentUser['number'] > alphabetLetterCurrentAlphabetUser['number']) {
                        alphabetUsers.splice(k + 1, 0, {
                            name: users[i]['name'],
                            email: users[i]['email'],
                            password: users[i]['password'],
                            phone: users[i]['phone']
                        });

                        lastAddedContactIndex = k + 1;

                        break loop1;
                    } else if (alphabetLetterCurrentUser['number'] < alphabetLetterCurrentAlphabetUser['number']) {
                        alphabetUsers.splice(k, 0, {
                            name: users[i]['name'],
                            email: users[i]['email'],
                            password: users[i]['password'],
                            phone: users[i]['phone']
                        });

                        lastAddedContactIndex = k;

                        break loop1;
                    }
                    else {
                        alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[l + 1].toLowerCase());
                    }
                }
            }
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}