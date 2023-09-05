async function initSummary() {
    await includeHTML();
    await loadTasks();
    renderSummary();
    userInitials();
    mobileGreetings();
}


function renderSummary() {
    document.getElementById('variablePanel1').innerHTML = allTasks.length;
    document.getElementById('variablePanel2').innerHTML = tasksOfCategory('inProgress');
    document.getElementById('variablePanel3').innerHTML = tasksOfCategory('feedback');
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


function mobileGreetings() {
    const username = queryUserName();
    
    document.getElementById('greetingMobileMessage').innerHTML = `Welcome,`;
    document.getElementById('greetingMobileName').innerHTML = username;

}
     