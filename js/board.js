/*-------------------------------------------Uebergreifende Variablen-------------------------------------------*/
let allTasks = [];
let currentDraggedElement;

// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH (mit Clemens)-----------
async function init() {
    await includeHTML();
    //userInitials();
    await loadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/
    loopAllTasks();

}

/*--------------------------funktion die das komplette tasks aus dem Backend ausließt--------------------------*/
async function loadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
}
// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH ENDE -----------


/*-------------------------------------------Open and Close function-------------------------------------------*/
function closeDetailCard() {
    document.getElementById('detailCard').style.display = 'none';
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

        loadAllTask(category, title, description, column, q, priority, date, priority, assigned);
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
function loadAllTask(category, title, description, column, q, priority, date, priority, assigned) {
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
                    <div id='frame139'>
                        <div id='frame217'></div>
                        <div id='prioritySymbols'>
                            <div class="prioBaja">
                                <img class="capa2" src="${priorityIMG}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;


    assingAllTasks(column, cardHTML);
}

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

function assingAllTasks(column, cardHTML) {
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
}

function loadAssigned(q) {
    document.getElementById('frame204').innerHTML = '';

    const nameUser = allTasks[q]['selectAssignedTo'];

    for (let n = 0; n < nameUser.length; n++) {
        const assigned = nameUser[n];

        document.getElementById('frame204').innerHTML += /*html*/`
        <div class="contactContain">
            <div class="frame191">
                <div class="profileBadge">
                    <div class="group9">
                        <p class="initialien"></p>
                        <div class="ellipse5"></div>
                    </div>
                </div>
                <p id="userName6">${assigned}</p>
            </div>
        </div>`;

    }
}

//----------------------------------------------------ab hier werden die Subtasks geladen----------------------------------------------------
function loadSubtasks(q) {
    document.getElementById('subtaskContain').innerHTML = '';

    const subtask = allTasks[q]['subtasks'];
    const subTaskState = allTasks[q]['subtaskstate'];

    for (let p = 0; p < subtask.length; p++) {
        const subtasks = subtask[p];
        document.getElementById('subtaskContain').innerHTML += /*html*/`
            
            <label class="custom-checkbox">
                <input type="checkbox" id="subtask${p}">
                <span class="checkbox-icon"></span>
                ${subtasks}
            </label><br>
        `;
        const subtaskid = 'subtask' + p;
        const checkbox = document.getElementById(subtaskid);
        console.log(subTaskState[p]);
        checkbox.checked = subTaskState[p];
    }
}

/*------------------------------------------------Drag and Drop------------------------------------------------*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, column) {
    ev.preventDefault();
    moveTo(column);
}
function startDragging(q) {
    currentDraggedElement = q;
}


async function moveTo(column) {
    const cardHTML = document.getElementById(`cards-${currentDraggedElement}`);
    cardHTML.remove(); // Entferne das Element aus dem alten Container

    allTasks[currentDraggedElement]['column'] = column;
    await setItem('tasks', JSON.stringify(allTasks));
    assingAllTasks(column, cardHTML.outerHTML); // Füge das Element in den neuen Container ein
}

/*-----------------------------------Suchfunktion---------------------------------*/
function liveSearch() {
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', function () {
        const searchContain = searchInput.value.toLowerCase();

        for (let q = 0; q < allTasks.length; q++) {
            const title = allTasks[q]['title'].toLowerCase();
            if (title.includes(searchContain)) {
                const category = allTasks[q]['category'];
                const description = allTasks[q]['descriprion'];
                const column = allTasks[q]['column'];
                const priority = allTasks[q]['prio'];
                const date = allTasks[q]['date'];
                const assigned = allTasks[q]['selectAssignedTo'];
                loadAllTask(category, title, description, column, q, priority, date, priority, assigned)
            }
        }
        loopAllTasks();
    });
}

//--------------------------------------Löschfunktion der Karte--------------------------------------
function deleteCard() {
    alert('Zeige mir die Richtige Karte ${q}');
}
