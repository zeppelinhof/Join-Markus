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
    { 'number': 26, 'letter': 'ä' },
    { 'number': 27, 'letter': 'ö' },
    { 'number': 28, 'letter': 'ü' },
    { 'number': 29, 'letter': '.' },
];

/**
 * This function sorts "users" array by alphabetical order of usernames.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added contact/contacts in alphabetUsers.
 */
function sortUsers() {
    let alphabetUsers = [];
    let lastAddedContactIndex = 0;
    let outOfFunctionFirstLoop = false;

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        let userNameWithoutSpace = returnNameWithoutSpaces(userName);

        let alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[0].toLowerCase());

        if (alphabetUsers.length == 0) {
            alphabetUsers.push(returnUserJSON(i));
        } else {
            [alphabetUsers, lastAddedContactIndex] = compareUsersWithAlphabetUsersFirstLoop(i, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser);
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}


/**
 * This fuction loops through the array alphabetUsers.
 * @param {integer} i is the index number from array users.
 * @param {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @param {integer} lastAddedContactIndex is the index number from the current added contact/contacts in alphabetUsers.
 * @param {boolean} outOfFunctionFirstLoop is the exit to leave the loop in the function compareUsersWithAlphabetUsersFirstLoop.
 * @param {string} userNameWithoutSpace is the current user/contact without space from array users.
 * @param {char} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 */
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


/**
 * This function loops throuhg the string alphabetUserNameWithoutSpace,
 * and compare the letters with those from the current user from the user array.
 * @param {integer} i is the index number from array users.
 * @param {integer} k  is the index number from array alphabetUsers.
 * @param {(object|array)} alphabetUsers is the status from all current sortet users/contacts. 
 * @param {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @param {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 * @param {string} userNameWithoutSpace is the current user/contact without space from array users.
 * @param {char} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @param {string} alphabetUserNameWithoutSpace is the current user/contact without space from array alphabetUsers.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @returns {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 */
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


/**
 * This function checks whether where a user/contact needs to be classified.
 * @param {*} i is the index number from array users.
 * @param {*} k is the index number from array alphabetUsers.
 * @param {*} l is the index number from the letter in alphabetUserNameWithouSpace.
 * @param {*} alphabetUsers is the status from all current sortet users/contacts.
 * @param {*} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @param {*} outOfFunctionFirstLoop is the exit to leave the looper in function compareUsersWithAlphabetUsersFirstLoop.
 * @param {*} outOfFunctionSecondLoop is the exit to leave the looper in function compareUsersWithAlphabetUsersSecondLoop.
 * @param {*} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @param {*} alphabetLetterCurrentAlphabetUser is the current letter from the current user/contact from array alphabetUsers.
 * @param {*} alphabetUserNameWithoutSpace is the current user/contact without space from array alphabetUsers.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @returns {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 * @returns {boolean} outOfFunctionSecondLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersSecondLoop.
 */

function addContactToAlphabetUsers() {    
    
    if (arguments[7]['number'] > arguments[8]['number']) {
        if (arguments[1] == arguments[3].length - 1) {
            arguments[3].splice(arguments[1] + 1, 0, returnUserJSON(arguments[0]));
            arguments[5] = true;
        }

        arguments[6] = true;

        arguments[4] = arguments[1] + 1;
    } else if (arguments[7]['number'] < arguments[8]['number']) {
        arguments[3].splice(arguments[1], 0, returnUserJSON(arguments[0]));
        arguments[4] = arguments[1];
        arguments[5] = true;
        arguments[6] = true;
    }
    else if (arguments[2] == arguments[9].length - 1) {
        arguments[3].splice(arguments[1] + 1, 0, returnUserJSON(arguments[0]));
        arguments[4] = arguments[1] + 1;
        arguments[5] = true;
        arguments[6] = true;
    }

    return [arguments[3], arguments[4], arguments[5], arguments[6]];
}

/**
 * This function returns a registered users data as an JSON object.
 * @param {integer} i is the index number from array users.
 * @returns {object} JSON object.
 */
function returnUserJSON(i) {
    return {
        name: users[i]['name'],
        email: users[i]['email'],
        password: users[i]['password'],
        phone: users[i]['phone']
    };
}

/**
 * This function splitet the input name and returns this name withouht space.
 * @param {string} name the name from the current user/contact
 * @returns {string} nameWithoutSpace is the input name without space.
 */
function returnNameWithoutSpaces(name) {
    let splitName = name.split(' ');
    let nameWithoutSpaces = '';

    for (let m = 0; m < splitName.length; m++) {
        nameWithoutSpaces += splitName[m];
    }

    return nameWithoutSpaces;
}