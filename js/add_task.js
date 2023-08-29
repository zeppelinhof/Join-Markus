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

function pushToFront(obj) {
    document.getElementById(obj).classList.add('z-index-1');
}

function pushToBackground(obj) {
    document.getElementById(obj).classList.add('z-index-n1');
}

function setPrioStatusAsString(status) {
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
}

async function register_task() {
    tasks.push({
        title: title.value,
        description: description.value,
        selectAssignedTo: contactsInTask,
        date: date.value,
        prio: document.getElementById('prioStatusAsString').innerText,
        category: selectedCategory.innerText,
        subtasks: subtasks,
        column: 'to do',
    });

    await setItem('tasks', JSON.stringify(tasks));

    resetForm();
}

function resetForm() {
    // document.getElementById('mainForm').reset();
    title.value = '';
    description.value = '';
    contactsInTask = [];
    selectAssignedTo.value = '';
    date.value = '';
    subtasks = [];
    document.getElementById('selectedSubtasks').innerHTML = '';
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    document.getElementById('mainForm').classList.remove('was-validated');
}

// #endregion Data from Add Task to Backend

// #region select contact logic
let categoryClosed = false;
let subtaskNumber = 0;

function add_d_none(classname) {
    document.getElementById(classname).classList.add('d-none');
}

function remove_d_none(classname) {
    document.getElementById(classname).classList.remove('d-none');
}

function selectContactFieldInBackground() {
    add_d_none('selectContactField');
    if (document.getElementById('contentSearchContact').classList.contains('d-none')) {
        remove_d_none('contentSearchContact');
        remove_d_none('uparrow');
    }
}

function showContentCategory() {
    if (document.getElementById('contentCategory').classList.contains('d-none') && (categoryClosed == false)) {
        remove_d_none('contentCategory');
    }
    if (categoryClosed == false) {
        remove_d_none('uparrow_cat');
        add_d_none('downarrow_cat');
    }
    categoryClosed = false;
}

function closeContentCategory() {
    add_d_none('uparrow_cat');
    add_d_none('contentCategory');
    remove_d_none('downarrow_cat');
    categoryClosed = true;
}

function selectCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    selectedCategory.innerHTML = document.getElementById('category' + i).innerHTML;
}



function borderLightblue(id) {
    if (document.getElementById(id).classList.contains('borderLightblue')) {
        document.getElementById(id).remove('borderLightblue');
    }
    else {
        document.getElementById(classname).add('borderLightblue');
    }
}
// #endregiion select contact logic

// #region add Subtask
function addSubtask() {
    if (document.getElementById('subtaskInputfield').value) {
        subtaskInputfield = document.getElementById('subtaskInputfield').value;
        selectedSubtasks = document.getElementById('selectedSubtasks');
        selectedSubtasks.innerHTML += /*html*/`        
            <div class="oneSelectedSubtask" onmouseover="showEdit('pencil-bin${subtaskNumber}');" onmouseout="closeEdit('pencil-bin${subtaskNumber}')" id="oneSubtask${subtaskNumber}">                
                <div style="display: flex;">
                    •<div id="rawData${subtaskNumber}">
                        ${subtaskInputfield}
                    </div>  
                </div>                              
                <div class="pencil-bin d-none" id="pencil-bin${subtaskNumber}">
                    <img src="assets/img/Subtasks_pencil.svg">
                    <div class="pencil-bin-separator"></div>
                    <img src="assets/img/Subtasks_bin.svg" onclick=deleteSubtask(${subtaskNumber})>
                </div>    
            </div>  
    `
        document.getElementById('subtaskInputfield').value = '';
        subtaskNumber++;
        fillSubtaskArray();
    }
}

function showEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.remove('d-none');
    // remove_d_none('pencil-bin'+i);
}

function closeEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.add('d-none');
}

function deleteSubtask(x) {
    let oneSubtaskToDelete = document.getElementById(`oneSubtask${x}`);

    for (let i = 0; i < subtasks.length; i++) {
        const currentSubtask = subtasks[i];

        if (document.getElementById('rawData' + x).innerHTML === currentSubtask) {
            subtasks.splice(i, 1);
        }
    }

    oneSubtaskToDelete.innerHTML = '';

    fillSubtaskArray();
}

function fillSubtaskArray() {
    subtasks = [];
    for (let i = 0; i < 100; i++) {
        let element = document.getElementById('rawData' + i)

        if (element) {
            subtasks.push(element.innerText);
        }

    }

}
// #endregion add Subtask

//#region Validation
function custValidation() {
    let fieldIds = [
        'prioStatusAsString',
        'selectedCategory',
    ];

    let invalidMessageIds = [
        'prioInvalid',
        'categoryInvalid',
    ];

    title = document.getElementById('title');
    if (title.value == '') {
        title.classList.add('redBorder');
        document.getElementById('titleInvalid').innerHTML = 'This field is required.'
    }

    description = document.getElementById('description');
    if (description.value == '') {
        description.classList.add('redBorder');
        document.getElementById('descriptionInvalid').innerHTML = 'This field is required.'
    }

    assignedToInvalid = document.getElementById('selected-contacts-circles-below').innerText;
    if (selectAssignedTo == '') {
        selectAssignedTo.classList.add('redBorder');
        document.getElementById('assignedToInvalid').innerHTML = 'This field is required.'
    }

    prioStatusAsString = document.getElementById('prioStatusAsString');
    if (prioStatusAsString.value == '') {
        document.getElementById('all-buttons-prio').classList.add('redBorder');
        document.getElementById('dateInvalid').innerHTML = 'This field is required.'
    }

    category = document.getElementById('selectedCategory');
    if (category.innerText == 'Select task category') {
        document.getElementById('categoryId').classList.add('redBorder');
        document.getElementById('categoryInvalid').innerHTML = 'This field is required.'
    }

   

    if (subtasks.length == 0) {
        document.getElementById('subtaskInputfield').classList.add('redBorder');
        document.getElementById('subtaskInvalid').innerHTML = 'This field is required.'
    }

    if (document.getElementById('selected-contacts-circles-below').innerText == '') {
        document.getElementById('selectContactField').classList.add('redBorder');
        document.getElementById('assignedToInvalid').innerHTML = 'This field is required.'
    }
}
//#endregion Validation