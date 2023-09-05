/*-------------------------------------------Uebergreifende Variablen-------------------------------------------*/
let allTasks = [];
let currentDraggedElement;
let currentOpenCard;

// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH (mit Clemens)-----------
async function boardInit() {
    await includeHTML();
    //userInitials();
    await boardLoadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/
    loopAllTasks();

}



/*--------------------------funktion die das komplette tasks aus dem Backend ausließt--------------------------*/
async function boardLoadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
}

async function refreshData() {
    await loadTasks();
    await emptyContainer();
    loopAllTasks();
}


//------------------------------Funktion die alle Container nach einem Reloaud leert------------------------------
async function emptyContainer() {
    document.getElementById('toDoContainer').innerHTML = '';
    document.getElementById('feedbackContainer').innerHTML = '';
    document.getElementById('inProgressContainer').innerHTML = '';
    document.getElementById('DoneContainer').innerHTML = '';
    location.reload(loopAllTasks);
}
// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH ENDE -----------


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

/*----------------------------------------Lädt alle Karten mit Aufgaben----------------------------------------*/
function loopAllTasks() {
    for (let q = 0; q < allTasks.length; q++) {
        const category = allTasks[q]['category'];
        const description = allTasks[q]['description'];
        const priority = allTasks[q]['prio'];
        const title = allTasks[q]['title'];
        const column = allTasks[q]['column'];
        const date = allTasks[q]['date'];
        const assigned = allTasks[q]['selectAssignedTo'];

        loadAllTask(category, title, description, column, q, priority, date, assigned);
    }
}
/*----------------------Checkt ob die Kontainer leer sind oder Inhalt haben ----------------------*/
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

/*-------------------------------------------lädt den Inhalt der Gesamten Karte-------------------------------------------*/
function loadAllTask(category, title, description, column, q, priority, date, assigned) {
    const priorityIMG = imagePriority(priority);

    const cardHTML = /*html*/ `
            <div id="cards-${q}" class="cards" draggable="true" ondragstart="startDragging(${q})" onclick="openDetailCard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}')">
                <div class='frame119'>
                    <div class='labelsBoardCardlabel'>
                        <p id="cardLabel">${category}</p>
                    </div>
                    <div class='frame114'>
                        <div id='title'>${title}</div>
                        <div id="content">${description}</div>
                    </div>
                    <div id="progressBar">
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


    assingAllTasks(column, cardHTML, q);
}

//---------------------------------------------------------------darstellung der Prioimages---------------------------------------------------------------
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

//---------------------------------------------------Zuordnung der Karten in die jeweiligen Kontainer---------------------------------------------------
function assingAllTasks(column, cardHTML, q) {
    const inProgressContainer = document.getElementById('inProgressContainer');
    const feedBackContainer = document.getElementById('feedbackContainer');
    const DoneContainer = document.getElementById('DoneContainer');
    const toDoContainer = document.getElementById('toDoContainer');

    inProgressContainer.innerHTML += '';
    feedBackContainer.innerHTML += '';
    DoneContainer.innerHTML += '';
    toDoContainer.innerHTML += '';

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
    loadAllTaskNumber(q);
}

//----------------------------------------Darstellung der Initialien in die Karten im Hauptbild----------------------------------------
function loadInitials(q) {
    const user = allTasks[q]['selectAssignedTo'];
    const targetElementId = `frame1_${q}`;

    // Leeren Sie den Container, bevor neue Initialen hinzugefügt werden
    document.getElementById(targetElementId).innerHTML = '';

    for (let index = 0; index < user.length; index++) {
        const element = user[index];
        const UserInitials = getInitials(element);
        document.getElementById(targetElementId).innerHTML += /*html*/`
            <div class="profileBadge" id="initials${index}_${q}">${UserInitials}</div>`;

        document.getElementById(`initials${index}_${q}`).style.backgroundColor = returnContactColor(index);
    }
}

//------------------------------------------Funktion die Detailcard aufruft und die Namen zuweist------------------------------------------
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

//----------------------------------------------------ab hier werden die Subtasks geladen----------------------------------------------------
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

/*------------------------------------------------Drag and Drop------------------------------------------------*/
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

/*-----------------------------------Suchfunktion---------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
    // Füge den Event-Listener hinzu, sobald das DOM geladen ist
    document.getElementById('searchInput').addEventListener('input', searchTasks);
});

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); // Suchbegriff in Kleinbuchstaben umwandeln
    const cards = document.querySelectorAll('.cards');

    for (let q = 0; q < allTasks.length; q++) {
        const title = allTasks[q]['title'].toLowerCase(); // Titel in Kleinbuchstaben umwandeln
        const card = cards[q];

        if (title.includes(searchInput)) {
            card.style.display = 'block'; // Karte anzeigen, wenn der Titel den Suchbegriff enthält
        } else {
            card.style.display = 'none'; // Karte ausblenden, wenn der Titel den Suchbegriff nicht enthält
        }
        console.log(`Title: ${title}, Search Input: ${searchInput}, Display: ${card.style.display}`);
    }
}

//--------------------------------------Löschfunktion der Karte--------------------------------------
async function deleteCard() {
    document.getElementById('detailCard').style.display = 'none';
    await deleteItem('tasks', currentOpenCard);
    location.reload();
}

//----------------------------------------------------Darstellung der Aufgaben auf der kleinen Karte----------------------------------------------------
function loadAllTaskNumber(q) {
    let subtaskState = allTasks[q]['subtaskstate'];
    let completedTasks = subtaskState.filter(status => status === 'true').length;
    let unfinishedTasks = subtaskState.length;
    document.getElementById(`allTasksNumber_${q}`).textContent = unfinishedTasks; // Anzahl der erledigten Aufgaben
    document.getElementById(`TasksNumber_${q}`).textContent = completedTasks; // Anzeige der erledigten Aufgaben
    // Übergeben Sie die Anzahl der erledigten Aufgaben an die Fortschrittsleistenaktualisierung
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