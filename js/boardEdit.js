/**
 * function to delete the card
 */
async function deleteCard() {
    document.getElementById('detailCard').style.display = 'none';
    await deleteItem('tasks', currentOpenCard);
    renderInit();
}
/**
 * function to check if subtask is present if no then hide the container
 * @param {*} q parameter q is passed as card number
 */
function subTaskCard(q) {
    const subtaskBoard = allTasks[q]['subtasks'];

    if (subtaskBoard.length <= 0) {
        document.getElementById(`progressBar_${q}`).style.display = 'none';
    } else {
        loadAllTaskNumber(q);
    }
}
/**
 * here the number of subtasks are loaded
 * @param {*} q parameter q is passed as card number
 */
function loadAllTaskNumber(q) {
    let subtaskState = allTasks[q]['subtaskstate'];
    let completedTasks = subtaskState.filter(status => status === 'true').length;
    let unfinishedTasks = subtaskState.length;
    document.getElementById(`allTasksNumber_${q}`).textContent = unfinishedTasks; // Anzahl der unerledigten Aufgaben
    document.getElementById(`TasksNumber_${q}`).textContent = completedTasks; // Anzeige der erledigten Aufgaben

    updateProgressBar(q, completedTasks);
}

function updateProgressBar(q) {
    const subtaskState = allTasks[q]['subtaskstate'];
    const completedTasks = subtaskState.filter(status => status === 'true').length;
    const totalTasks = subtaskState.length;

    const progressBar = document.getElementById(`bar_${q}`);
    const percent = (completedTasks / totalTasks) * 100;

    progressBar.style.width = `${percent}%`;
}

async function addFeedback(columnStatus) {
    fillAssignedTo();
    boardStatus = columnStatus
    openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')
}
/**
 * 
 * @param {*} q parameter of the map
 * @param {*} title Title parameters 
 * @param {*} description comment parameter
 * @param {*} date date parameter
 * @param {*} priority priority parameter
 */
function editButton(q, title, description, date, priority, assigned) {
    document.getElementById('editContacts').innerHTML = /*html*/ `
        <div onclick="addEdit('${q}', '${title}', '${description}', '${date}', '${priority}', '${assigned}')" class="editButton">
            <div class="editContain" id="editContain">
                <img src="assets/img/edit.svg"  class="editIcon">
            </div>
            <p class="editText">Edit</p>
        </div>
    `;
}

function addEdit(q, title, description, date, priority, assigned) {
    fillAssignedToBoard(q, assigned);
    //contact(q, assigned);
    loadUsers();
    hideAssigned(q);
    saveEditButton(q);
    hideButton();
    loadSubtasks(q);
    valueContain(title, description, date);
    editPrioBoard(priority);
    editSubtasks(q);
    showDeleteIcons(q);
}

function valueContain(title, description, date) {
    document.getElementById('taskOverlayHeadline').innerHTML = /*html*/ `
    <input class="inputBoard1" id='inputTitleBoard' value='${title}'>`;

    document.getElementById('descriptionContain').innerHTML =/*html*/`
    <input class="inputBoard1" id = "inputDescriptionContain" value = '${description}'>`;

    document.getElementById('taskOverlayNumber').innerHTML =/*html*/`
    <input class="inputBoard1" type="date" name="inputBoard" id="inputBoardDate" value='${date}' onmouseover="setDateOfTodayForDatepickerCard('inputBoard');">`;
}

function editSubtasks(q) {
    document.getElementById('subtaskContain').innerHTML += /*html*/ `
        <input class="inputBoard1" type="text" id="inputSubtasks" value=''>`;

    if (tasks[q].subtaskstate) {
        for (let i = 0; i < tasks[q].subtasks.length; i++) {
            if (tasks[q].subtaskstate[i] === 'true') {
                document.getElementById(`subtask${i}`).checked = true;
            }
        }
    }
}

function editPrioBoard(priority) {
    const priorities = ["urgent", "medium", "low"];
    const dropdown = document.getElementById('medium');
    dropdown.innerHTML = `
        <select class="inputBoard1" id="inputPrio">
            ${priorities.map(p => `<option>${p}</option>`).join('')}
        </select>`;
    const inputPrio = document.getElementById('inputPrio');
    inputPrio.value = priority;
}

function saveEditButton(q) {
    document.getElementById('saveContacts').innerHTML = /*html*/ `
        <button class="saveButton" onclick="saveEdit(${q})">Save</button>
    `;
}
/**
 * function to save the changes
 */
async function saveEdit(q) {
    const newTitle = document.getElementById('inputTitleBoard').value;
    const newDescription = document.getElementById('inputDescriptionContain').value;
    const newDate = document.getElementById('inputBoardDate').value;
    const newPriority = document.getElementById('inputPrio').value;
    const newSubtasksInput = document.getElementById('inputSubtasks');

    low(q, newSubtasksInput);
    await pushTasks(q, newTitle, newDescription, newDate, newPriority);
    await refreshData();
    closeDetailCard();
}

function low(q, newSubtasksInput) {
    const newSubtasks = newSubtasksInput.value
        .split('\n')
        .map(subtask => subtask.trim())
        .filter(subtask => subtask !== '');

    if (tasks[q].subtasks) {
        tasks[q].subtasks = tasks[q].subtasks.concat(newSubtasks);
    } else {
        tasks[q].subtasks = newSubtasks;
    }
}
/**
 * function to upload the changes to the backend
 */
async function pushTasks(q, newTitle, newDescription, newDate, newPriority) {
    tasks[q].title = newTitle;
    tasks[q].description = newDescription;
    tasks[q].date = newDate;
    tasks[q].prio = newPriority;
    await setItem('tasks', JSON.stringify(tasks));
}

function hideButton() {
    document.getElementById('editContacts').style.display = 'none';
    document.getElementById('prioMedia').style.display = 'none';
    document.getElementById('saveContacts').style.display = '';
}

function showButton() {
    document.getElementById('saveContacts').style.display = 'none';
    document.getElementById('prioMedia').style.display = '';
    document.getElementById('editContacts').style.display = '';
}
/**
 * delete function for the selected subtask
 */
async function deleteSubtask(q, p) {
    const subtasksArray = tasks[q]['subtasks'];
    const subtaskStateArray = tasks[q]['subtaskstate'];

    const subtaskIndex = p;

    if (subtaskIndex >= 0 && subtaskIndex < subtasksArray.length) {
        subtasksArray.splice(subtaskIndex, 1);
        subtaskStateArray.splice(subtaskIndex, 1);
        await setItem('tasks', JSON.stringify(tasks));
        await refreshData();
        closeDetailCard();
    }
}
/**
 * 
 * @param {*} q parameter of the map
 * here the delete icon is displayed
 */
function showDeleteIcons(q) {
    const subtask = allTasks[q]['subtasks'];

    for (let p = 0; p < subtask.length; p++) {
        const deleteButtonBoard = document.getElementById(`deleteButtonBoard${p}`);
        if (deleteButtonBoard) {
            deleteButtonBoard.style.display = 'block';
        }
    }
}

function hideAssigned(q) {
    document.getElementById('frame202').innerHTML = /*html*/`
        <div class="frameInput">
            <div>
                <input class="inputContactBoard" type="text" id="inputfieldBoard" placeholder="Select contacts to assign" oninput="filterUsersBoard()">
            </div>
            <div>
                <img src="./assets/img/arrow_drop_down.svg" alt="">
            </div>
        </div>
    `;
    document.getElementById('frame222').style.display = 'block';
    document.getElementById('frame204').style.display = 'none';
}

function visibleAssigned() {
    document.getElementById('frame214').style.display = '';
}

function fillAssignedToBoard(q, assigned) {
    document.getElementById('frame201').innerHTML = '';
    const assignedUsers = assigned.split(',');

    for (let u = 0; u < assignedUsers.length; u++) {
        const element = assignedUsers[u];
        addUsersToFrame(element);
    }
}

function addUsersToFrame(element) {
    for (let i = 0; i < users.length; i++) {
        const userBoard = users[i].name;
        const isAssigned = element === userBoard;
        addContactBoardElement(i, userBoard, isAssigned);
    }
}

function addContactBoardElement(i, userBoard, isAssigned) {
    document.getElementById('frame201').innerHTML += /*html*/ `
        <div  class="contactBoard" onclick="addContactBoard(${i})">
            <div>
                <span id='userNameBoard${i}'>${userBoard}</span> 
            </div>
            <img id='checkEmptyBoard${i}' src="assets/img/Check_button_empty.svg" alt="" style="display: ${isAssigned ? 'none' : 'block'}">
            <img id='checkFilledBoard${i}' src="assets/img/Check_button_filled.svg" alt="" style="display: ${isAssigned ? 'block' : 'none'}">
        </div>
    `;
}

function addContactBoard(index) {
    const checkEmptyElement = document.getElementById(`checkEmptyBoard${index}`);
    const checkFilledElement = document.getElementById(`checkFilledBoard${index}`);

    if (checkEmptyElement.style.display === 'none') {

        checkEmptyElement.style.display = 'block';
        checkFilledElement.style.display = 'none';
    } else {
        checkEmptyElement.style.display = 'none';
        checkFilledElement.style.display = 'block';
    }
}

function filterUsersBoard() {
    let search = document.getElementById('inputfieldBoard').value;
    for (let p = 0; p < users.length; p++) {
        const element = users[p];

        if (element.toLowerCase()) {
            
        }
        
    }
}
