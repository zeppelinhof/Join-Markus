async function initSummary() {
    await loadTasks();
    renderSummary();
    userInitials();
}


function renderSummary() {
    document.getElementById('variablePanel1').innerHTML = allTasks.length;
    document.getElementById('variablePanel2').innerHTML = tasksOfCategory('in progress');
    document.getElementById('variablePanel3').innerHTML = tasksOfCategory('awaiting feedback');
    document.getElementById('variablePanel4').innerHTML = urgentTasks();
    document.getElementById('deadlineDate').innerHTML = upcomingDeadline();
    document.getElementById('variablePanel5').innerHTML = tasksOfCategory('to do');
    document.getElementById('variablePanel6').innerHTML = tasksOfCategory('done');
    document.getElementById('greetingName').innerHTML = queryUserName();
}


function tasksOfCategory(category) {
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i]['column'];
        if (element === category) {
            count += 1;
        }
    }
    return count;
}


function urgentTasks() {
    let count = 0;
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i]['prio'];
        if (element === 'urgent') {
            count += 1;
        }
    }
    return count;
}


function upcomingDeadline() {
    let deadline;
    const currentDate = new Date();
    const taskDates = allTasks.map(task => new Date(task['date']));
    const futureDates = taskDates.filter(taskDate => taskDate > currentDate);

    if (futureDates.length > 0) {
        futureDates.sort((a, b) => a - b);
        deadline = futureDates[0].toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } else {
        deadline = null;
    }
    return deadline;
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


//Funktion aus load_contacts_to_add_task.js kopiert
function getInitials(contact) {
    initials = contact.charAt(0);
    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}