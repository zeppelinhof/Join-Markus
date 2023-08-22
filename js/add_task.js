// #region Coloring Buttons Urgent, Medium, Low / Set status of Prio for transfer to Board

function colorRed() {
    let btn = document.getElementById('btn_urgent');
    if (btn.classList.length > 1) {
        whiteBackgroundRedArrow(btn);
    }
    else {
        btn.classList.add('button-red');
        pushToFront('arrowWhiteUrgent');
        pushToBackground('arrowRedUrgent');
        setPrioStatusAsString('urgent');
    }
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}
function colorOrange() {
    let btn = document.getElementById('btn_medium');
    if (btn.classList.length > 1) {
        whiteBackgroundOrangeArrow(btn);
    }
    else {
        btn.classList.add('button-orange');
        pushToFront('arrowWhiteMedium');
        pushToBackground('arrowOrangeMedium');
        setPrioStatusAsString('medium');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}
function colorGreen() {
    let btn = document.getElementById('btn_low');
    if (btn.classList.length > 1) {
        whiteBackgroundGreenArrow(btn);
    }
    else {
        btn.classList.add('button-green');
        pushToFront('arrowWhiteLow');
        pushToBackground('arrowGreenLow');
        setPrioStatusAsString('low');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
}

function whiteBackgroundRedArrow(btn) {
    btn.classList.remove('button-red');
    document.getElementById('arrowWhiteUrgent').classList.remove('z-index-1');
    document.getElementById('arrowRedUrgent').classList.remove('z-index-n1');
}

function whiteBackgroundOrangeArrow(btn) {
    btn.classList.remove('button-orange');
    document.getElementById('arrowWhiteMedium').classList.remove('z-index-1');
    document.getElementById('arrowOrangeMedium').classList.remove('z-index-n1');
}

function whiteBackgroundGreenArrow(btn) {
    btn.classList.remove('button-green');
    document.getElementById('arrowWhiteLow').classList.remove('z-index-1');
    document.getElementById('arrowGreenLow').classList.remove('z-index-n1');
}

function pushToFront(obj){
    document.getElementById(obj).classList.add('z-index-1');
}

function pushToBackground(obj){
    document.getElementById(obj).classList.add('z-index-n1');
}

function setPrioStatusAsString(status){
    document.getElementById('prioStatusAsString').innerHTML = status;
}

// #endregion region Coloring Buttons Urgent Medium Low

// #region Data from Add Task to Backend
let tasks = [];

async function initTasks() {
    loadTasks();
}

async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
    // fillAssignedTo();
}

async function register_task() {
    // registerBtn.disabled = true;
    tasks.push({
        title: title.value,
        description: description.value,
        selectAssignedTo: selectAssignedTo.value,
        date: date.value,
        prio: document.getElementById('prioStatusAsString').innerHTML,
        category: category.value
    });

    await setItem('tasks', JSON.stringify(tasks));

    // fillAssignedTo();
    resetForm();
}

function resetForm() {
    title.value = '';
    description.value = '';
    selectAssignedTo.value = '';
    date.value = '';
    // registerBtn.disabled = false;
}

function fillAssignedTo() {
    for (let i = 0; i < users.length; i++) {
        document.getElementById('selectAssignedTo').innerHTML += /*html*/`
        <option id="option${i}" value=""></option>
    `
        const user = users[i];
        document.getElementById(`option${i}`).innerHTML = user.email;
    }
    
}
// #endregion Data from Add Task to Backend