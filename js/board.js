/*Uebergreifende Variablen*/
let allTasks = [];

// ------------ORIGINALER CODE-------------------------------------------
// /*funktion die für den Body alle notwendigen Funktionen aufruft*/
// /*function that calls all necessary functions for the body*/
// function init() {
//     loadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/

// }

// /*funktion die das komplette tasks aus dem Backend ausließt*/
// async function loadTasks() {
//     allTasks = JSON.parse(await getItem('tasks'));
//     loopAllTasks();
// }

// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH (mit Clemens)-----------
async function init() {
    await loadTasks();/*funktion die das komplette tasks aus dem Backend ausließt*/
    loopAllTasks();
}

/*funktion die das komplette tasks aus dem Backend ausließt*/
async function loadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
}
// ---------VERÄNDERTER CODE NACH UNSEREM GESPRÄCH ENDE -----------


/*Open and Close function*/
function closeDetailContain() {
    document.getElementById('').style.display = 'none';
    document.getElementById('').style.display = '';
}

/*Lädt alle Karten mit Aufgaben*/
function loopAllTasks() {
    for (let q = 0; q < allTasks.length; q++) {
        const category = allTasks[q]['category'];
        const description = allTasks[q]['description'];
        const priority = allTasks[q]['prio'];
        const title = allTasks[q]['title'];
        const column = allTasks[q]['column'];

        loadAllTask(category, description, title, column, q, priority);
    }
}

function checkEmptyContainer() {
    if (toDoContainer, inProgressContainer, feedbackContainer, doneContainer === 0) {
        document.getElementById('noTask').style.display = '';
    } else {
        document.getElementById('noTask').style.display = 'none';
    }
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

function loadAllTask(category, title, description, column, q, priority) {
    checkEmptyContainer();

    const priorityIMG = imagePriority(priority);

    const cardHTML = /*html*/ `
            <div id="cards" onclick="detailCard(${q})">
                <div class='frame119'>
                    <div class='labelsBoardCardlabel'>
                        <p id="cardLabel">${category}</p>
                    </div>
                    <div class='frame114'>
                        <div id='title'>${description}</div>
                        <div id="content">${title}</div>
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

function assingAllTasks(column, cardHTML) {
    const toDoContainer = document.getElementById('toDoContainer');
    const inProgressContainer = document.getElementById('inProgressContainer');
    const feedBackContainer = document.getElementById('feedbackContainer');
    const doneContainer = document.getElementById('doneContainer');

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

function openDetailCard(){

}


