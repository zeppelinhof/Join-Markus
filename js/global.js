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