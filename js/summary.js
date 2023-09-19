/**
 * This function initialize the summary page.
 */
async function initSummary() {
    await loadTasks();
    renderSummary();
    userInitials();
    mobileGreetings();
}

/**
 * This function renders all elements of summary page with dynamic data.
 */
function renderSummary() {
    document.getElementById('variablePanel1').innerHTML = tasks.length;
    document.getElementById('variablePanel2').innerHTML = tasksOfCategory('inProgress');
    document.getElementById('variablePanel3').innerHTML = tasksOfCategory('feedback');
    document.getElementById('variablePanel4').innerHTML = urgentTasks();
    document.getElementById('deadlineDate').innerHTML = upcomingDeadline();
    document.getElementById('variablePanel5').innerHTML = tasksOfCategory('to do');
    document.getElementById('variablePanel6').innerHTML = tasksOfCategory('done');
    document.getElementById('greetingName').innerHTML = queryUserName();
}

/**
 * This function returns the count of tasks inside a specific category.
 * @param {string} category f.e. 'to do'
 * @returns 
 */
function tasksOfCategory(category) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i]['column'];
        if (element === category) {
            count += 1;
        }
    }
    return count;
}

/**
 * This function returns the count of tasks with priority "urgent".
 * @returns 
 */
function urgentTasks() {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i]['prio'];
        if (element === 'urgent') {
            count += 1;
        }
    }
    return count;
}

/**
 * This function returns the most closest upcoming date of all task".
 */
function upcomingDeadline() {
    let deadline;
    const currentDate = new Date();
    const taskDates = tasks.map(task => new Date(task['date']));
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

/**
 * This function sets the Username into the Greeting animation.
 */
function mobileGreetings() {
    const username = queryUserName();
    
    document.getElementById('greetingMobileMessage').innerHTML = `Welcome,`;
    document.getElementById('greetingMobileName').innerHTML = username;

}
     