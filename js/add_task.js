let tasks = [];
let boardStatus = 'to do';

async function initAddTask() {
    await includeHTML();
    await loadUsers();
    await loadTasks();
    userInitials();
}

async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
}

// #region Coloring Buttons Urgent, Medium, Low / Set status of Prio for transfer to Board
function colorRed() {
    let btn = document.getElementById('btn_urgent');
    if (btn.classList.length > 1) {
        whiteBackgroundRedArrow(btn);
        setPrioStatusAsString('');
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
        setPrioStatusAsString('');
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
        setPrioStatusAsString('');
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


async function register_task() {
    tasks.push({
        title: cleanInputString(title.value),
        description: cleanInputString(description.value),
        selectAssignedTo: contactsInTask,
        date: date.value,
        prio: document.getElementById('prioStatusAsString').innerText,
        category: selectedCategory.innerText,
        subtasks: subtasks,
        column: boardStatus,
        subtaskstate: subtaskstate() 
    });
    await setItem('tasks', JSON.stringify(tasks));
    resetForm2();
}

function subtaskstate() {
    let subtaskstate = [];
    for (let i = 0; i < subtasks.length; i++) {
        subtaskstate[i] = 'false';
    }
    return subtaskstate;
}

function cleanInputString(input) {
    const pattern = /[<>&"'/\\]/g;
    const sanitizedInput = input.replace(pattern, '');
    const trimmedInput = sanitizedInput.trim();
    return trimmedInput;
}

function resetForm2() {
    title.value = '';
    description.value = '';
    contactsInTask = [];
    selectAssignedTo.value = '';
    date.value = '';
    subtasks = [];
    document.getElementById('selectedSubtasks').innerHTML = '';
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    location.reload();
}

// #endregion Data from Add Task to Backend

// #region select contact logic
let categoryClosed = false;
let subtaskNumber = 0;

function add_d_none(classname) {
    if (!document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.add('d-none');
    }
}

function remove_d_none(classname) {
    if (document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.remove('d-none');
    }
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
                <div style="display: flex; width: 100%">
                    •<div id="rawData${subtaskNumber}">
                        ${subtaskInputfield}
                    </div>
                    <input class="inputChangeSubtask d-none" id="rawDataChange${subtaskNumber}" type="text" value="${subtaskInputfield}">
                </div>                              
                <div class="pencil-bin d-none" id="pencil-bin${subtaskNumber}">
                    <img src="assets/img/Subtasks_pencil.svg" id="pencil${subtaskNumber}"
                        onclick="remove_d_none('rawDataChange${subtaskNumber}'); add_d_none('rawData${subtaskNumber}'); add_d_none('pencil${subtaskNumber}'); remove_d_none('submit${subtaskNumber}');">
                    <div class="pencil-bin-separator"></div>
                    <img src="assets/img/Subtasks_bin.svg" onclick=deleteSubtask(${subtaskNumber})>
                    <img src="assets/img/check_black.svg" class="d-none" id="submit${subtaskNumber}" 
                        onclick="saveSubtaskChanges('rawDataChange${subtaskNumber}', 'rawData${subtaskNumber}', '${subtaskNumber}'); 
                        add_d_none('rawDataChange${subtaskNumber}'); remove_d_none('rawData${subtaskNumber}'); 
                        remove_d_none('pencil${subtaskNumber}'); add_d_none('submit${subtaskNumber}')">                                        
                </div>    
            </div>  
    `
        document.getElementById('subtaskInputfield').value = '';
        subtaskNumber++;
        fillSubtaskArray();
    }
}

function saveSubtaskChanges(changedValue, goal, subtaskNumber) {
    document.getElementById(goal).value = document.getElementById(changedValue).value;
    fillSubtaskArrayAsValue();
    document.getElementById(`rawData${subtaskNumber}`).innerHTML = /*html*/`
        ${document.getElementById(changedValue).value}
    `
    
}

function fillSubtaskArray() {
    subtasks = [];
    for (let i = 0; i < 100; i++) {
        let element = document.getElementById('rawData' + i)

        if (element) {
            subtasks.push(element.innerText);  // hier als innerText
        }

    }
}

function fillSubtaskArrayAsValue() {
    subtasks = [];
    for (let i = 0; i < 100; i++) {
        let element = document.getElementById('rawData' + i)

        if (element) {
            subtasks.push(element.value);  // hier als value
        }

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

function changeWhiteBackground(classname){
    let surface = document.getElementById(classname).classList
    if(surface.contains('white-background')){
        surface.remove('white-background');
    }
    else{
        surface.add('white-background');
    }
}

// #endregion add Subtask

//#region Validation


function custValidation() {

    let valid = true;
    //unsetValidationMessages();

    title = document.getElementById('title');
    if (title.value == '') {
        setRedBorder('title');
        remove_d_none('titleInvalid');
        valid = false;
    }

    description = document.getElementById('description');
    if (description.value == '') {
        setRedBorder('description');
        remove_d_none('descriptionInvalid');
        valid = false;
    }

    assignedToInvalid = document.getElementById('selected-contacts-circles-below');
    if (selectAssignedTo.innerText == '') {
        setRedBorder(assignedToInvalid);
        remove_d_none('selected-contacts-circles-below');
        valid = false;
    }

    date = document.getElementById('date');
    if (date.value == '') {
        setRedBorder('date');
        remove_d_none('dateInvalid');
        valid = false;
    }

    prioStatusAsString = document.getElementById('prioStatusAsString');
    if (prioStatusAsString.innerText == '') {
        setRedBorder('all-buttons-prio');
        remove_d_none('prioInvalid');
        valid = false;
    }

    if (document.getElementById('selected-contacts-circles-below').innerText == '') {
        setRedBorder('selectContactField');
        remove_d_none('assignedToInvalid');
        valid = false;
    }

    category = document.getElementById('selectedCategory');
    if (category.innerText == 'Select task category') {
        setRedBorder('categoryId');
        remove_d_none('categoryInvalid');
        valid = false;
    }

    if (valid) {
        register_task();
    }
}

function unsetRedBorder(classname) {
    classList = document.getElementById(classname).classList;

    if (classList.contains('redBorder')) {
        classList.remove('redBorder');
    }
}

function setRedBorder(classname) {
    // unsetBlueBorder(classname);
    classList = document.getElementById(classname).classList;

    if (!classList.contains('redBorder')) {
        classList.add('redBorder');
    }
}

//#endregion Validation