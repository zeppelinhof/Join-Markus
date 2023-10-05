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


let sidebarNavElements = [
    'summary',
    'add_task',
    'board',
    'contacts'
]


/**
 * This function loads all tasks from backend.
 */
async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
}


/**
 * This function includes HTML templates into a document.
 */
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


/**
 * This function toggles visibility of the menu on top right of the top-navigation bar.
 */
function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu');

    if (contextMenu.classList.contains('topbar-d-none')) {
        contextMenu.classList.remove('topbar-d-none')
    } else (
        contextMenu.classList.add('topbar-d-none')
    )
}


/**
 * This function returns the name of the user from URL parameters.
 * @returns 
 */
function queryUserName() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var userName = urlParams.get('name');
    return userName;
}


/**
 * This function sets the initials of the username to the top right icon of the top-navigation bar.
 */
function userInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


/**
 * This function initializes the "Help" page.
 */
async function initHelp() {
    await includeHTML();
    userInitials();
}


/**
 * This function return the first characters of the first and second string separated by space.
 * @param {*} contact defines the username.
 * @returns First characters of the username.
 */
function getInitials(contact) {
    initials = contact.charAt(0);
    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}


/**
 * This function refers to another page with URL encoded username.
 * @param {*} pageName defines the name of the page to be linked to.
 */
function linkPage(pageName) {
    saveSidebarNavHighlights(pageName);
    window.location.href = pageName + ".html?name=" + encodeURIComponent(queryUserName());
}


/**
 * This function highlighted the current pagename in the navarea on the sidebar that was clicked.
 * @param {*} pageName defines the name of the page to be linked to.
 */
function setSidebarNavActive(pageName) {
    removeSibebarNavActive();

    let sidebarClickedIcon = '';
    let sidebarClickedText = '';

    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        if (navElement == pageName) {
            sidebarClickedText = 'sidebar-t-highlighted';
            sidebarClickedIcon = `sidebar-icon-${navElement}-highlighted`;
        }
    }

    document.getElementById(`sidebar-${pageName}`).classList.add(`${sidebarClickedText}`);
    document.getElementById(`sidebar-${pageName}`).children[0].classList.add(`${sidebarClickedIcon}`);
}

/**
 * This function removed all highlightes in the navarea on sidebar.
 */
function removeSibebarNavActive() {
    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        try {
            document.getElementById(`sidebar-${navElement}`).classList.remove('sidebar-t-highlighted');
            document.getElementById(`sidebar-${navElement}`).children[0].classList.remove(`sidebar-icon-${navElement}-highlighted`);
        } catch {
            continue;
        }
    }
}


/**
 * This function is called on onload of pages privacypolicy and legalnotice.
 */
async function initInfoPage() {
    await includeHTML();
    document.getElementById('sidebar-nav').style.display = "none";
    document.getElementById('topbar-nav').style.display = "none";
}


/**
 * This function returns the color to set the background color of user icons.
 * @param {*} i defines the index of the color to be returned.
 * @returns color value
 */
function returnContactColor(i) {
    let result = i % contactColors.length
    return contactColors[result]['style'];
}


/**
 * This function returns the index of the color assigned to a user.
 * @param {*} name defines the name of the user.
 * @returns 
 */
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

/**
 * This function is being called upon logout. It deletes its saved email address from local storage.
 */
function logoutUser() {
    window.localStorage.clear();
}