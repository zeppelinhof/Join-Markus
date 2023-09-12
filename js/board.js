/*-------------------------------------------global variables-------------------------------------------*/
let allTasks = [];
let currentDraggedElement;
let currentOpenCard;
// ------------------------------------function loaded in the body ----------------------------------------
async function includeInit() {
    await includeHTML();
    boardInit();
}

async function boardInit() {
    userInitials();
    await boardLoadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/
    await loadUsers();
    loopAllTasks();
    await loadTasks();
}

async function renderInit() {
    userInitials();
    await boardLoadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/
    await loadUsers();
    loopAllTasks();
    await loadTasks();
}
/*--------------------------function that exits the complete tasks from the backend--------------------------*/
async function boardLoadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
}

async function refreshData() {
    await boardLoadTasks();
    await emptyContainer();
    renderInit();
}
//------------------------------function that empties all containers after a reloaud------------------------------
async function emptyContainer() {
    document.getElementById('toDoContainer').innerHTML = '';
    document.getElementById('feedbackContainer').innerHTML = '';
    document.getElementById('inProgressContainer').innerHTML = '';
    document.getElementById('DoneContainer').innerHTML = '';
    return loopAllTasks();
}
/*-------------------------------------------Open and Close function-------------------------------------------*/
function closeDetailCard() {
    document.getElementById('detailCard').style.display = 'none';
    saveDetailCardData();
    refreshData();
}

async function saveDetailCardData() {
    const q = currentOpenCard;
    const newCheckboxStates = getSubtasksCheckboxState();
    newItem = {
        title: allTasks[q]['title'],
        description: allTasks[q]['description'],
        selectAssignedTo: allTasks[q]['selectAssignedTo'],
        date: allTasks[q]['date'],
        prio: allTasks[q]['prio'],
        category: allTasks[q]['category'],
        column: allTasks[q]['column'],
        subtasks: allTasks[q]['subtasks'],
        subtaskstate: getSubtasksCheckboxState()
    };
    updateItem('tasks', currentOpenCard, newItem);
}

function getSubtasksCheckboxState() {
    const subtask = allTasks[currentOpenCard]['subtasks'];
    const newStates = [];
    for (let i = 0; i < subtask.length; i++) {
        newStates[i] = document.getElementById('subtask' + i).checked;
    }
    const stringArray = newStates.map(value => String(value));
    return (stringArray);
}
/*----------------------------------------loads all cards with tasks----------------------------------------*/
function loopAllTasks() {
    document.getElementById('toDoContainer').innerHTML = '';
    document.getElementById('feedbackContainer').innerHTML = '';
    document.getElementById('inProgressContainer').innerHTML = '';
    document.getElementById('DoneContainer').innerHTML = '';
    let search = document.getElementById('searchInput').value;
    let windowSize = window.matchMedia('(max-width: 1202px)');
    if (windowSize.matches) {
        search = document.getElementById('searchInputMobile').value;
    }
    loopTasks(search);
}

function loopTasks(search) {
    for (let q = 0; q < allTasks.length; q++) {
        const category = allTasks[q]['category'];
        const description = allTasks[q]['description'];
        const priority = allTasks[q]['prio'];
        const title = allTasks[q]['title'];
        const column = allTasks[q]['column'];
        const date = allTasks[q]['date'];
        const assigned = allTasks[q]['selectAssignedTo'];

        if (title.toLowerCase().includes(search.toLowerCase())) {
            loadAllTask(category, title, description, column, q, priority, date, assigned);
        }
    }
}
/*----------------------Checks if the containers are empty or have contents----------------------*/
function checkEmptyContainer() {
    clearNoTasToDO();
    clearNoTaskProgress();
    clearNoTaskFeedback();
    clearNoTaskDone();
}

function clearNoTaskProgress() {
    const inProgressContainer = document.getElementById('inProgressContainer');

    if (inProgressContainer.querySelector('.cards')) {
        document.getElementById('noProgress').style.display = 'none';
    } else {
        document.getElementById('noProgress').style.display = '';
    }
}

function clearNoTasToDO() {
    const toDoContainer = document.getElementById('toDoContainer');

    if (toDoContainer.querySelector('.cards')) {
        document.getElementById('noTask').style.display = 'none';
    } else {
        document.getElementById('noTask').style.display = '';
    }
}

function clearNoTaskFeedback() {
    const feedbackContainer = document.getElementById('feedbackContainer');

    if (feedbackContainer.querySelector('.cards')) {
        document.getElementById('noFeedback').style.display = 'none';
    } else {
        document.getElementById('noFeedback').style.display = '';
    }
}

function clearNoTaskDone() {
    const DoneContainer = document.getElementById('DoneContainer');

    if (DoneContainer.querySelector('.cards')) {
        document.getElementById('noDone').style.display = 'none';
    } else {
        document.getElementById('noDone').style.display = '';
    }
}
/*-------------------------------------------Loads the content of the whole map-------------------------------------------*/
function loadAllTask(category, title, description, column, q, priority, date, assigned) {
    const priorityIMG = imagePriority(priority);

    const cardHTML = /*html*/ `
            <div id="cards-${q}" class="cards" draggable="true" ondragstart="startDragging(${q})" onclick="openDetailCard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}')">
                <div class='frame119'>
                    <div class='labelsBoardCardlabel' id="BoardCardLabel_${q}">
                        <p id="cardLabel">${category}</p>
                    </div>
                    <div class='frame114'>
                        <div id='boardTitle'>${title}</div>
                        <div id="content">${description}</div>
                    </div>
                    <div id="progressBar_${q}" class="prgBar">
                        <div id="progress-container">
                            <div id="bar_${q}" class="bar"></div>
                        </div>
                        <div class="progressAdvanced">
                            <div class="Subtasks">
                                <div id="sumOfTasks">
                                    <b id="TasksNumber_${q}"></b>/
                                    <b id="allTasksNumber_${q}"></b>
                                </div>    
                                <p style="margin-bottom:0;">Subtasks</p>
                            </div>
                        </div>
                    </div>
                    <div id='frame139'>
                        <div id='frame217'>
                            <div id="frame1_${q}" class="frame1"></div>
                        </div>
                        <div id='prioritySymbols'>
                            <div class="prioBaja">
                                <img class="capa2" src="${priorityIMG}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    assingAllTasks(column, cardHTML, q, category);
}
//----------------------------------------------------------Darstellung der Farben für cardLabel----------------------------------------------------------
function loadColorLabel(category, q) {
    if (category === 'Technical Task') {
        document.getElementById(`BoardCardLabel_${q}`).classList.add('technicalTask');
    }
    if (category === 'User Story') {
        document.getElementById(`BoardCardLabel_${q}`).classList.add('userStory');
    }
}
//---------------------------------------------------------------display of the PrioImages---------------------------------------------------------------
function imagePriority(priority) {
    let priorityIMG = '';

    if (priority === 'urgent') {
        priorityIMG = 'assets/img/Capa_2.svg';
    } else if (priority === 'medium') {
        priorityIMG = 'assets/img/Prio_media.svg';
    } else if (priority === 'low') {
        priorityIMG = 'assets/img/Capa_1.svg';
    }
    return priorityIMG;
}
//---------------------------------------------------assigns the maps to the respective containers according to their status---------------------------------------------------
function assingAllTasks(column, cardHTML, q, category) {
    const inProgressContainer = document.getElementById('inProgressContainer');
    const feedBackContainer = document.getElementById('feedbackContainer');
    const DoneContainer = document.getElementById('DoneContainer');
    const toDoContainer = document.getElementById('toDoContainer');

    if (column === 'to do') {
        toDoContainer.innerHTML += cardHTML;
    } else if (column === 'inProgress') {
        inProgressContainer.innerHTML += cardHTML;
    } else if (column === 'done') {
        DoneContainer.innerHTML += cardHTML;
    } else if (column === 'feedback') {
        feedBackContainer.innerHTML += cardHTML;
    }

    checkEmptyContainer();
    loadInitials(q);
    loadColorLabel(category, q);
    subTaskCard(q);
}
//----------------------------------------displaying the initials in the cards in the main image----------------------------------------
function loadInitials(q) {
    const user = allTasks[q]['selectAssignedTo'];
    const targetElementId = `frame1_${q}`;

    document.getElementById(targetElementId).innerHTML = '';

    for (let index = 0; index < user.length; index++) {
        const element = user[index];
        const UserInitials = getInitials(element);
        document.getElementById(targetElementId).innerHTML += /*html*/`
            <div class="profileBadge" id="initials${index}_${q}">${UserInitials}</div>`;

        document.getElementById(`initials${index}_${q}`).style.backgroundColor = returnContactColorByName(element);
    }
}
//------------------------------------------function that calls Detailcard and assigns the names to it------------------------------------------
function openDetailCard(q, title, description, category, priority, date, priorityIMG, assigned) {
    loadAssigned(q);
    loadSubtasks(q);
    document.getElementById('detailCard').style.display = '';
    document.getElementById('taskContain').innerHTML = /*html*/ `${category}`;
    document.getElementById('taskOverlayHeadline').innerHTML = /*html*/ `${title}`;
    document.getElementById('descriptionContain').innerHTML = /*html*/ `${description}`;
    document.getElementById('taskOverlayNumber').innerHTML = /*html*/`${date}`;
    document.getElementById('medium').innerHTML = /*html*/`${priority}`;
    document.getElementById('prioMedia').innerHTML = /*html*/`<img class="prioMedia"src="${priorityIMG}">`;
    currentOpenCard = q;
}

function loadAssigned(q) {
    document.getElementById('frame204').innerHTML = '';

    const nameUser = allTasks[q]['selectAssignedTo'];
    for (let n = 0; n < nameUser.length; n++) {
        const assigned = nameUser[n];
        const userInitials = getInitials(assigned);
        document.getElementById('frame204').innerHTML += /*html*/`
        <div class="contactContain">
            <div class="frame191">
                <div class="profileBadge" id="profileBadge${n}">${userInitials}</div>
                <p id="userName6">${assigned}</p>
            </div>
        </div>`;
        document.getElementById('profileBadge' + n).style.backgroundColor = returnContactColor(n);
    }
}
//----------------------------------------------------from here the subtasks are loaded----------------------------------------------------
function loadSubtasks(q) {
    document.getElementById('subtaskContain').innerHTML = '';
    const subtask = allTasks[q]['subtasks'];
    for (let p = 0; p < subtask.length; p++) {
        const subtasks = subtask[p];
        document.getElementById('subtaskContain').innerHTML += /*html*/`
            <label class="custom-checkbox">
                <input type="checkbox" id="subtask${p}" onclick="updateSubTaskCheckBoxState(this.id)">
                <span class="checkbox-icon"></span>
                ${subtasks}
            </label><br>
        `;
    }
    setCheckBoxState(q);
}

function setCheckBoxState(q) {
    const subTaskState = allTasks[q]['subtaskstate'];
    for (let i = 0; i < subTaskState.length; i++) {
        subTaskState[i] = subTaskState[i] === 'true';
        const state = subTaskState[i];
        const subtaskid = 'subtask' + i;
        document.getElementById(subtaskid).checked = state;
    }
}

function updateSubTaskCheckBoxState(element) {
    const afterSubstring = element.slice("subtask".length);
    const currentState = allTasks[currentOpenCard]['subtaskstate'][afterSubstring];
    allTasks[currentOpenCard]['subtaskstate'][afterSubstring] = currentState === 'true' ? 'false' : 'true';
}
/**Drag and Drop*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, column) {
    ev.preventDefault();
    moveTo(column, currentDraggedElement);
}
function startDragging(q) {
    currentDraggedElement = q;
}

async function moveTo(column, q) {
    const cardHTML = document.getElementById(`cards-${q}`);
    if (cardHTML) {
        cardHTML.remove(); // Entferne das Element aus dem alten Container

        allTasks[q]['column'] = column;
        await setItem('tasks', JSON.stringify(allTasks));
        assingAllTasks(column, cardHTML.outerHTML, q); // Hier wird q übergeben
    }
}
/*-----------------------------------SearchFunction---------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // Füge den Event-Listener hinzu, sobald das DOM geladen ist
    document.getElementById('searchInput').addEventListener('input', loopAllTasks);
});
//--------------------------------------Delete function of the card-------------------------------------
async function deleteCard() {
    document.getElementById('detailCard').style.display = 'none';
    await deleteItem('tasks', currentOpenCard);
    renderInit();
}
//---------------------------------------------------Display of the tasks on the small card----------------------------------------------------
function subTaskCard(q) {
    const subtaskBoard = allTasks[q]['subtasks'];

    if (subtaskBoard.length <= 0) {
        document.getElementById(`progressBar_${q}`).style.display = 'none';
    } else {
        loadAllTaskNumber(q);
    }
}

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
//--------------------------------------------Add addTask via + button--------------------------------------------

async function addFeedback(columnStatus) {
    boardStatus = columnStatus
    openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')
}