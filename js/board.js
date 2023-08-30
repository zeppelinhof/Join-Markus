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
        const assigned = allTasks[q]['seselectAssignedTo'];

        loadAllTask(category, title, description, column, q, priority, date, priority, assigned);
    }
}
/*----------------------Checkt ob die Kontainer leer sind oder haben Inhalt----------------------*/
function checkEmptyContainer() {
    if (inProgressContainer.querySelector('.card')) {
        document.getElementById('noProgress').style.display = '';
        console.log('Karte ist nicht da');
    } else {
        document.getElementById('noProgress').style.display = 'none';
        console.log('Karte befindet sich im Container');
    } if (toDoContainer.querySelector('.card')) {
        document.getElementById('noTask').style.display = '';
    } else {
        document.getElementById('noTask').style.display = 'none';
    } if (feedbackContainer.querySelector('.card')) {
        document.getElementById('noFeedback').style.display = '';
    } else {
        document.getElementById('noFeedback').style.display = 'none';
    } if (doneContainer.querySelector('.card')) {
        document.getElementById('noDode').style.display = '';
    } else {
        document.getElementById('noDone').style.display = 'none';
    }
}

/*-------------------------------------------lädt den Inhalt der Gesamten Karte-------------------------------------------*/
function loadAllTask(category, title, description, column, q, priority, date, priority, assigned) {
    checkEmptyContainer();
    const priorityIMG = imagePriority(priority);

    const cardHTML = /*html*/ `
            <div id="cards" draggable="true" ondragstart="startDragging(${q})" onclick="openDetailCard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}')">
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
    const doneContainer = document.getElementById('doneContainer');
    const toDoContainer = document.getElementById('toDoContainer');

    inProgressContainer.innerHTML += '';
    feedBackContainer.innerHTML += '';
    doneContainer.innerHTML += '';
    toDoContainer.innerHTML += '';

    if (column === 'to do') {
        toDoContainer.innerHTML += cardHTML;
    } else if (column === 'inProgress') {
        inProgressContainer.innerHTML += cardHTML;
    } else if (column === 'done') {
        doneContainer.innerHTML += cardHTML;
    } else if (column === 'feedback') {
        feedBackContainer.innerHTML += cardHTML;
    }
}

function openDetailCard(q, title, description, category, priority, date, priorityIMG, assigned) {
    document.getElementById('detailCard').style.display = '';
    document.getElementById('taskContain').innerHTML = /*html*/ `${category}`;
    document.getElementById('taskOverlayHeadline').innerHTML = /*html*/ `${title}`;
    document.getElementById('descriptionContain').innerHTML = /*html*/ `${description}`;
    document.getElementById('taskOverlayNumber').innerHTML = /*html*/`${date}`;
    document.getElementById('medium').innerHTML = /*html*/`${priority}`;
    document.getElementById('prioMedia').innerHTML = /*html*/`<img class="prioMedia"src="${priorityIMG}">`;
    document.getElementById('frame204').innerHTML = loadAssigned(assigned);
}

function loadAssigned(assigned) {
    document.getElementById('frame204').innerHTML = '';
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

    loadAllTask();
}

/*------------------------------------------------Drag and Drop------------------------------------------------*/
function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(q) {
    currentDraggedElement = q;
    console.log(currentDraggedElement);
}

async function moveTo(column) {
    allTasks[currentDraggedElement]['column'] = column;
    await setItem('tasks', JSON.stringify(allTasks));
    console.log(allTasks);
}

async function performMoveAndRefresh(column) {
    await moveTo(column);
    assingAllTasks();
}

/*-----------------------------------Suchfunktion---------------------------------*/
