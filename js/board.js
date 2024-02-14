/**
 * here allTasks are stored from the array tasks
 */
let allTasks = [];
/**
 * variable used in Drag and Drop
 */
let currentDraggedElement;
/**
 * this variable is used to store the status for the subtasks
 */
let currentOpenCard;
/**
 * function loaded in the body
 */
async function includeInit() {
    await includeHTML();
    boardInit();
}

async function boardInit() {
    userInitials();
    await boardLoadTasks();
    await loadUsers();
    loopAllTasks();
    await loadTasks();
}

async function renderInit() {
    userInitials();
    await boardLoadTasks();
    await loadUsers();
    loopAllTasks();
    await loadTasks();
}
/**
 * function that exits the complete tasks from the backend
 */
async function boardLoadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
}

async function returnBoardLoadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
    return allTasks;
}

async function refreshData() {
    await boardLoadTasks();
    await emptyContainer();
    renderInit();
}
/**
 * function that empries all containers after a reloaud
 * @returns reloads the loopAllTasks card
 */
async function emptyContainer() {
    document.getElementById('toDoContainer').innerHTML = '';
    document.getElementById('feedbackContainer').innerHTML = '';
    document.getElementById('inProgressContainer').innerHTML = '';
    document.getElementById('DoneContainer').innerHTML = '';
    return loopAllTasks();
}
/**
 * Open and Close function detailCard
 */
async function closeDetailCard() {
    await saveDetailCardData();
    document.getElementById('detailCard').style.display = 'none';
    await refreshData();
    showButton();
    visibleAssigned();
    closeContactBoard();
    switchClasses(true);
}


/**
 * 
 */
async function saveDetailCardData() {
    const q = currentOpenCard;
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
    await updateItem('tasks', currentOpenCard, newItem);
}

/**
 * 
 * @returns as string if checkbox is checked or not
 */
function getSubtasksCheckboxState() {
    const subtask = allTasks[currentOpenCard]['subtasks'];
    const newStates = [];
    for (let i = 0; i < subtask.length; i++) {
        checkboxElement = document.getElementById('subtask' + i);
        if (checkboxElement) {
            newStates[i] = checkboxElement.checked;
        } else {
            newStates[i] = false;
        }
    }
    const stringArray = newStates.map(value => String(value));
    return (stringArray);
}

/**
 * loads all cards with tasks
 */
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
    let q = 0;
    for (q = 0; q < allTasks.length; q++) {
        const category = allTasks[q]['category'];
        const description = allTasks[q]['description'];
        const priority = allTasks[q]['prio'];
        const title = allTasks[q]['title'];
        const column = allTasks[q]['column'];
        const date = allTasks[q]['date'];
        const assigned = allTasks[q]['selectAssignedTo'];

        if (containsWord(title, description, search)) {
            loadAllTask(category, title, description, column, q, priority, date, assigned);
        } else {
            checkEmptyContainer();
        }
    }
    addDefaultTasks(q, search);
}

function addDefaultTasks(q, search) {
    let columns = ['to do', 'inProgress', 'feedback', 'done',]
    for (let r = 0; r < 4; r++) {
        const category = 'User Story';
        const description = 'tbd';
        const priority = 'low';
        const title = 'unvis';
        const column = columns[r];
        const date = '2023-01-01';
        const assigned = ['Jaleesa Unrau'];

        if (containsWord(title, description, search)) {
            loadAllTaskDefault(category, title, description, column, r, priority, date, assigned);
        } else {
            checkEmptyContainer();
        }
    }
}

function containsWord(title, description, search) {
    return title.toLowerCase().includes(search.toLowerCase()) || description.toLowerCase().includes(search.toLowerCase());
}
/**
 * check if there are any cards in the container, if yes then the container should be hidden with the content 'no Tasks
 */
function clearNoTask(containerId, messageElementId) {
    const container = document.getElementById(containerId);
    const messageElement = document.getElementById(messageElementId);

    if (container.querySelector('.cards')) {
        messageElement.style.display = 'none';
    } else {
        messageElement.style.display = '';
    }
}

function checkEmptyContainer() {
    clearNoTask('toDoContainer', 'noTask');
    clearNoTask('inProgressContainer', 'noProgress');
    clearNoTask('feedbackContainer', 'noFeedback');
    clearNoTask('DoneContainer', 'noDone');
}

/**
 * loads the content of the whole map
 * all parameters are passed from loopAllTasks
 * 
 */
function loadAllTask(category, title, description, column, q, priority, date, assigned) {
    const priorityIMG = imagePriority(priority);
    const cardHTML = /*html*/ `
            <div id="cards-${q}" class="cards" draggable="true" ondragstart="startDragging(${q})" onclick="openDetailCardBoard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}', '${column}')">
                <div class="notesDetail" id="notesDetail_${q}" style="display:none"></div>
            <div class='frame119'>
                    <div class='labelsBoardCardlabel' id="BoardCardLabel_${q}">
                        <p id="cardLabel">${category}</p>
                    </div>
                    <div class='frame114'>
                        <div id='boardTitle'>${shortenString(title, 40)}</div>
                        <div id="content">${description}</div>
                    </div>
                    <div id="progressBar_${q}" class="prgBar">
                        <div id="progress-container">
                            <div id="bar_${q}" class="bar"></div>
                        </div>
                        <div class="progressAdvanced">
                            <div class="Subtasks">
                                <div id="sumOfTasks">
                                    <b id="TasksNumber_${q}"></b>/<b id="allTasksNumber_${q}"></b>
                                </div>    
                                <p class="boardSubtask">Subtasks</p>
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

function loadAllTaskDefault(category, title, description, column, q, priority, date, assigned) {
    const priorityIMG = imagePriority(priority);
    const cardHTML = /*html*/ `
            <div id="cards-${q}" class="cards" style="color: lightgray" draggable="true" ondragstart="startDragging(${q})" onclick="openDetailCardBoard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}', '${column}')">
                Add element here
            </div>`;

    assingAllTasks(column, cardHTML, q, category);
}
/**
 * function to load the respective colors for the heading  
 */
function loadColorLabel(category, q) {
    if (category === 'Technical Task') {
        document.getElementById(`BoardCardLabel_${q}`).classList.add('technicalTask');
    }
    if (category === 'User Story') {
        document.getElementById(`BoardCardLabel_${q}`).classList.add('userStory');
    }
}

/**
 * images for priority urgent, low, medium
 * @param {string} priority 
 * @returns image for priority
 */
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
/**
 * in the function the respective containers for the cards are filled
 * @param {*} column in the parameter Column the status of the respective card is stored
 * @param {*} cardHTML with the parameter cardHTML the content of the cardHTML is transferred
 * @param {*} q parameter q is passed as card number
 */
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
/**
 * load the initials
 * @param {*} q - is passed as card number
 */
function loadInitials(q) {
    const user = allTasks[q]['selectAssignedTo'];
    const targetElementId = `frame1_${q}`;

    document.getElementById(targetElementId).innerHTML = '';

    let lastCircleDrawed = false;

    for (let index = 0; index < user.length; index++) {
        const element = user[index];
        const UserInitials = getInitials(element);
        if (index < maxVisibleCirclesBelow) {
            drawNewCircle_Board(index, targetElementId, UserInitials, q, element);
        } else {
            onlySummedUpCircle_Board(index, q, targetElementId, lastCircleDrawed);
            lastCircleDrawed = true;
        }
    }
}

/**
 * 
 * @param {number} index -  number of user in task
 * @param {string} targetElementId - field for colored circles
 * @param {string} UserInitials 
 * @param {number} q - add task card number
 * @param {string} element - rgb for color
 */
function drawNewCircle_Board(index, targetElementId, UserInitials, q, element) {
    document.getElementById(targetElementId).innerHTML += /*html*/`
            <div class="profileBadge" id="initials${index}_${q}">${UserInitials}</div>`;

    document.getElementById(`initials${index}_${q}`).style.backgroundColor = returnContactColorByName(element);
}

/**
 * print all further circles in one by add +1
 * @param {number} index 
 * @param {number} q 
 * @param {boolean} targetElementId - where to save 
 * @param {boolean} lastCircleDrawed - is last circle drawed?
 */
function onlySummedUpCircle_Board(index, q, targetElementId, lastCircleDrawed) {
    if (!lastCircleDrawed) {
        firstSummedUpCircle_Board(index, q, targetElementId);
    } else {
        furtherSummedUpCircle_Board(index, q);
    }
}

/**
 * logic for the first summed up circle
 */
function firstSummedUpCircle_Board(index, q, targetElementId) {
    document.getElementById(targetElementId).innerHTML += /*html*/`
    <div class="profileBadge" id="initials${maxVisibleCirclesBelow}_${q}">+${index + 1 - maxVisibleCirclesBelow}</div>
    `
}

/**
 * print all further summed up circles in one circle
 */
function furtherSummedUpCircle_Board(index, q) {
    document.getElementById(`initials${maxVisibleCirclesBelow}_${q}`).innerHTML = '+' + (index + 1 - maxVisibleCirclesBelow);
}

function openDetailCardBoard(q, title, description, category, priority, date, priorityIMG, assigned, column) {
    let windowSizeDetailCard = window.matchMedia('(max-width: 400px)');

    if (windowSizeDetailCard.matches) {
        openDetailCardMobile(q, title, description, category, priority, date, priorityIMG, assigned, column);
    } else {
        openDetailCard(q, title, description, category, priority, date, priorityIMG, assigned);
    }
}

//openDetailCard('${q}','${title}', '${description}', '${category}', '${priority}', '${date}', '${priorityIMG}','${assigned}')

/**
 * function to open the detailcard of the selected cards
 * @param {*} q parameter q is passed as card number
 * @param {*} title in the parameter title the title is passed
 * @param {*} description description of the task is passed in the description parameter
 * @param {*} category in the parameter category the category is passed
 * @param {*} priority in the parameter priority the priority is passed
 * @param {*} date in the parameter date the date is passed
 * @param {*} priorityIMG in the parameter priorityIMG the priorityIMG is passed
 * @param {*} assigned 
 */

/**
 * logic when user clicks on one of the detail cards in board view
 * @param {*} priorityIMG - image urgent, medium or low
 */
function openDetailCard(q, title, description, category, priority, date, priorityIMG, assigned) {
    document.getElementById('frame222').style.display = 'none';
    document.getElementById('frame204').style.display = 'block';
    loadColorLabelDetailCard(category);
    loadAssigned(q);
    loadSubtasks(q);
    document.getElementById('detailCard').style.display = '';
    document.getElementById('taskContain').innerHTML = /*html*/ `${category}`;
    document.getElementById('taskOverlayHeadline').innerHTML = /*html*/ `${shortenString(title, 40)}`;
    document.getElementById('descriptionContain').innerHTML = /*html*/ `${description}`;
    document.getElementById('taskOverlayNumber').innerHTML = /*html*/`${date}`;
    document.getElementById('medium').innerHTML = /*html*/`${priority}`;
    document.getElementById('prioMedia').innerHTML = /*html*/`<img class="prioMedia"src="${priorityIMG}">`;
    currentOpenCard = q;
    editButton(q, title, description, date, priority, assigned);
}

function loadColorLabelDetailCard(category) {
    if (category === 'Technical Task') {
        document.getElementById(`frame113`).classList.add('technicalTask');
    }
    if (category === 'User Story') {
        document.getElementById(`frame113`).classList.add('userStory');
    }
}
/**
 * here the names and initials are loaded
 * @param {*} q parameter q is passed as card number
 */
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
/**
 * function loads the subtask and adds the checkbox
 * @param {*} q parameter q is passed as card number
 */
function loadSubtasks(q) {
    document.getElementById('subtaskContain').innerHTML = '';
    const subtask = allTasks[q]['subtasks'];
    for (let p = 0; p < subtask.length; p++) {
        const subtasks = subtask[p];
        document.getElementById('subtaskContain').innerHTML += /*html*/`
            <label class="custom-checkbox">
                <div class="curser">
                    <input type="checkbox" id="subtask${p}" onclick="updateSubTaskCheckBoxState(this.id)">
                    <span class="checkbox-icon"></span>
                    ${subtasks}
                </div>
                <div class="curser">
                    <img src="assets/img/delete.svg" alt="" id="deleteButtonBoard${p}" onclick="deleteSubtask('${q}', '${p}', '${subtasks}')" style="display:none;">
                </div>
            </label>
        `;
    }
    setCheckBoxState(q);
}

/**
 * logic to check a subtask within a task
 * @param {number} q - number of card
 */
function setCheckBoxState(q) {
    const subTaskState = allTasks[q]['subtaskstate'];
    for (let i = 0; i < subTaskState.length; i++) {
        if (subTaskState[i] === 'true') {
            const subtaskid = 'subtask' + i;
            document.getElementById(subtaskid).checked = true;
        }
    }
}

/**
 * delete word "subtask" before the content of subtaskstate
 * @param {string} element 
 */
function updateSubTaskCheckBoxState(element) {
    const afterSubstring = element.slice("subtask".length);
    const currentState = allTasks[currentOpenCard]['subtaskstate'][afterSubstring];
    allTasks[currentOpenCard]['subtaskstate'][afterSubstring] = currentState === 'true' ? 'false' : 'true';
}
/**
 * Drag and Drop function
 */
function allowDrop(ev) {
    ev.preventDefault();

    markColumns();
}

function drop(ev, column) {
    ev.preventDefault();
    moveTo(column, currentDraggedElement);
    disMarkColumns();
}
function startDragging(q) {
    currentDraggedElement = q;
}

function markColumns() {
    document.getElementById('inProgressContainer').classList.add('back-color-marked-white');
    document.getElementById('DoneContainer').classList.add('back-color-marked-white');
    document.getElementById('toDoContainer').classList.add('back-color-marked-white');
    document.getElementById('feedbackContainer').classList.add('back-color-marked-white');

}

function disMarkColumns() {
    document.getElementById('inProgressContainer').classList.remove('back-color-marked-white');
    document.getElementById('DoneContainer').classList.remove('back-color-marked-white');
    document.getElementById('toDoContainer').classList.remove('back-color-marked-white');
    document.getElementById('feedbackContainer').classList.remove('back-color-marked-white');
}

/**
 * move one card to another column
 * @param {string} column - e.g. in progress
 * @param {*} q 
 */
async function moveTo(column, q) {
    const cardHTML = document.getElementById(`cards-${q}`);
    if (cardHTML) {
        cardHTML.remove();

        allTasks[q]['column'] = column;
        await setItem('tasks', JSON.stringify(allTasks));
        assingAllTasks(column, cardHTML.outerHTML, q);
        tasks[q].column = column;
        await setItem('tasks', JSON.stringify(tasks));
    }
    loopAllTasks();
}

/**
 * if a text is tong it is cutted after x chars
 * @param {string} text 
 * @param {number} countLetters - how many chars to show
 * @returns shorted text if it was too long
 */
function shortenString(text, countLetters) {
    if (text.length > 30) {
        return text.slice(0, countLetters) + '...';
    }
    return text;
}