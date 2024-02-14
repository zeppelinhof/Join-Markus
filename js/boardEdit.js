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

/**
 * view progress of fixed subtasks
 * @param {*} q - number of card
 */
function updateProgressBar(q) {
    const subtaskState = allTasks[q]['subtaskstate'];
    const completedTasks = subtaskState.filter(status => status === 'true').length;
    const totalTasks = subtaskState.length;

    const progressBar = document.getElementById(`bar_${q}`);
    const percent = (completedTasks / totalTasks) * 100;

    progressBar.style.width = `${percent}%`;
}

/**
 * call by set status "to do", "inProgress" or "feedback"
 * @param {string} columnStatus - see above
 */
async function addFeedback(columnStatus) {
    fillAssignedTo();
    boardStatus = columnStatus
    openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')
}
/**
 * 
 * @param {number} q - parameter of the map
 * @param {string} title - Title parameters 
 * @param {string} description - comment parameter
 * @param {date} - date parameter
 * @param {string} priority - priority parameter
 */
function editButton(q, title, description, date, priority, assigned) {
    document.getElementById('editContacts').innerHTML = /*html*/ `
        <div onclick="addEdit(${q}, '${title}', '${description}', '${date}', '${priority}', '${assigned}', true)" class="editButton">
            <div class="editContain" id="editContain">
                <img src="assets/img/edit.svg"  class="editIcon">
            </div>
            <p class="editText">Edit</p>
        </div>
    `;
}

/**
 * triggered when user clicks on Edit in task
 * @param {number} q - card number
 * @param {string} title 
 * @param {string} description 
 * @param {string} date 
 * @param {string} priority 
 * @param {string} assigned 
 */
function addEdit(q, title, description, date, priority, assigned) {
    hideAssigned(q, assigned);
    saveEditButton(q);
    hideButton();
    loadSubtasks(q);
    valueContain(title, description, date);
    editPrioBoard(priority);
    editSubtasks(q);
    showDeleteIcons(q);
    fillAssignedToBoard(q, assigned);
    openContactBoard();
    switchClasses(false, priority);
    loadInitials_Edit(q);
}

/**
 * turn on/off containers for special Edit view: prio buttons, category
 * @param {boolean} closeCard - is action to close or to open the card?
 * @param {string} priority - urgent, medium or low
 */
function switchClasses(closeCard, priority) {
    if (closeCard) {
        elementBehaviorWhenCardClose();
    } else {
        elementBehaviorWhenCardEdit();
    }
    const buttonIds = ['btn_urgent_board', 'btn_medium_board', 'btn_low_board'];
    if (buttonIds.every(id => getClassListLength(id) === 1)) {
        callCorrectColoredPrioButton(priority);
    }
}

/**
 * element hide, show or change when close the card
 */
function elementBehaviorWhenCardClose() {
    hideElement('all-buttons-prio_board'); // button view area
    clearColoredButtons();
    showElement('frame113'); // User Story blau
    removeClass('frame203', 'just-cont-flex-end'); // User Story blau + X
    removeClass('frame178', 'd-block');
    removeClass('dateContainer', 'd-block');
    showElement('prioTextImage'); // priority area in in Card (before Edit)
    hideElement('descriptionContainer');
    hideElement('titleLabel');
    hideElement('assignedToBelow_Edit'); // Circles below Assignet to in Edit
}

/**
 * element hide, show or change when edit the card
 */
function elementBehaviorWhenCardEdit() {
    showElement('all-buttons-prio_board'); // button view area
    clearColoredButtons();
    hideElement('frame113'); // User Story blau
    addClass('frame203', 'just-cont-flex-end'); // User Story blau + X
    addClass('frame178', 'd-block');
    addClass('dateContainer', 'd-block');
    showElement('descriptionContainer');
    showElement('titleLabel');
    showElement('assignedToBelow_Edit'); // Circles below Assignet to in Edit
}

function getClassListLength(id) {
    return document.getElementById(id).classList.length;
}

/**
 * set all buttons on uncolored so that 
 * last unsaved click is not shown next time
 */
function clearColoredButtons() {
    removeClass('btn_urgent_board', 'button-red');
    removeClass('btn_medium_board', 'button-orange');
    removeClass('btn_low_board', 'button-green');
}

/**
 * Color Button in depency of priority
 * @param {string} priority - red, orange or green
 */
function callCorrectColoredPrioButton(priority) {
    if (priority == 'urgent') {
        colorButton('btn_urgent_board', 'button-red', 'arrowWhiteUrgent_board', 'arrowRedUrgent_board', 'urgent', 'board');
    } else if (priority == 'medium') {
        colorButton('btn_medium_board', 'button-orange', 'arrowWhiteMedium_board', 'arrowOrangeMedium_board', 'medium', 'board');
    } else {
        colorButton('btn_low_board', 'button-green', 'arrowWhiteLow_board', 'arrowGreenLow_board', 'low', 'board');
    }
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
        <input class="inputBoard1" type="text" id="inputSubtasks" value='' placeholder="Enter and add it by clicking save">`;

    if (tasks[q].subtaskstate) {
        for (let i = 0; i < tasks[q].subtasks.length; i++) {
            if (tasks[q].subtaskstate[i] === 'true') {
                document.getElementById(`subtask${i}`).checked = true;
            }
        }
    }
}

/**
 * edit the priority in board
 * 
 * @param {string} priority -
 */
function editPrioBoard(priority) {
    const priorities = ["urgent", "medium", "low"];
    const dropdown = document.getElementById('medium');
    dropdown.innerHTML = `
        <select class="inputBoard1 d-none" id="inputPrio">
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
    switchClasses(true);
}

/**
 * take content of edited new input
 * @param {number} q - card number
 * @param {object} newSubtasksInput - input text
 */
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

/**
 * hide edit and prio button when edit is clicked. Clear save button.
 */
function hideButton() {
    document.getElementById('editContacts').style.display = 'none';
    document.getElementById('prioMedia').style.display = 'none';
    document.getElementById('saveContacts').style.display = '';
}

/**
 * clear edit and prio button and hide save button when edit is clicked
 */
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
/**
 * editing the assigned names
 * @param {parameters of the map} q 
 * @param {Name parameters} assigned 
 */

function hideAssigned(q, assigned) {
    document.getElementById('frame202').innerHTML = /*html*/`
        <div class="frameInput">
            <div>
                <input class="inputContactBoard" type="text" id="inputfieldBoard" placeholder="Select contacts to assign" oninput="fillAssignedToBoard('${q}', '${assigned}')">
            </div>
            <div>
                <img id="contactBoard4" src="assets/img/arrow_drop_up.svg" onclick="closeContactBoard()" style='display:none'>
                <img id="contactBoard3" src="./assets/img/arrow_drop_down.svg" onclick="openContactBoard()">
            </div>
        </div>
    `;
    document.getElementById('frame222').style.display = 'block';
    document.getElementById('frame204').style.display = 'none';
}

/**
 * container configs for open the conatct board
 */
function openContactBoard() {
    document.getElementById('contactBoard3').style.display = 'none';
    document.getElementById('contactBoard1').style.display = 'block';
    document.getElementById('contactBoard4').style.display = 'block';
}

/**
 * container configs to see assigned contacts
 */
function visibleAssigned() {
    document.getElementById('frame214').style.display = '';
}

/**
 * add assigned contacts to board
 * @param {number} q 
 * @param {*} assigned - no use
 */
function fillAssignedToBoard(q, assigned) {
    document.getElementById('frame201').innerHTML = '';
    const assignedUsers = assigned.split(',');

    addUsersToFrame(assignedUsers, q);
}
/**
 * search function and display of all names
 * @param {conversion to array} assignedUsers 
 * @param {parameter der Karte} q 
 */
function addUsersToFrame(assignedUsers, q) {
    let search = document.getElementById('inputfieldBoard').value;
    for (let i = 0; i < users.length; i++) {
        const userBoard = users[i].name;
        const isAssigned = assignedUsers.indexOf(userBoard);
        if (userBoard.toLowerCase().includes(search.toLowerCase())) {
            addContactBoardElement(i, userBoard, isAssigned, q);
        }
    }
}

/**
 * add contact to list of contacts
 * 
 * @param {number} i 
 * @param {string} userBoard 
 * @param {number} isAssigned 
 * @param {number} q 
 */
function addContactBoardElement(i, userBoard, isAssigned, q) {
    document.getElementById('frame201').innerHTML += /*html*/ `
        <div id="contactBoard${i}" class="contactBoard" onclick="addContactBoard(${i}, ${q})">
            <div style="display: flex;">
                <div class="profileBadge" id="circleBoard_Edit_${q}_${i}"></div>
                <span id='userNameBoard${i}'>${userBoard}</span> 
            </div>
            <img id='checkEmptyBoard${i}' src="assets/img/Check_button_empty.svg" alt="">
            <img id='checkFilledBoard${i}' src="assets/img/Check_button_filled.svg" alt="">
        </div>
    `;

    isAssignedBoard(i, q, userBoard, isAssigned);
}

/**
 * load the initials for Edit View
 * @param {*} q - is passed as card number
 */
function loadInitials_Edit(q) {

    for (let index = 0; index < users.length; index++) {
        const targetElementId = `circleBoard_Edit_${q}_${index}`;
        try {
            document.getElementById(targetElementId).innerHTML = '';
        } catch { return 0; }
        const element = document.getElementById(`userNameBoard${index}`).innerHTML;
        const UserInitials = getInitials(element);
        drawNewCircle_Board_Edit(index, targetElementId, UserInitials, q, element);
    }
    // Draw Below
    circle_BoardBelow_Edit(q);
}

/**
 * modification of circle drawing when searching users
 * 
 * @param {number} i - id of circle on card
 * @param {number} q - card number
 */
function loadInitials_Edit_Search(i, q) {
    const targetElementId = `circleBoard_Edit_${q}_${i}`;
    try {
        document.getElementById(targetElementId).innerHTML = '';
    } catch { return 0; }
    const element = document.getElementById(`userNameBoard${i}`).innerHTML;
    const UserInitials = getInitials(element);
    drawNewCircle_Board_Edit(i, targetElementId, UserInitials, q, element);
    // Draw Below
    circle_BoardBelow_Edit(q);
}

/**
 * draw circles of selcted users in this task
 * @param {number} q - card number
 */
function circle_BoardBelow_Edit(q) {
    let lastCircleDrawed = false;
    let circlesBelowArea_Edit = document.getElementById('assignedToBelow_Edit');
    circlesBelowArea_Edit.innerHTML = '';
    boardLoadTasks();
    drawCirclesForSelectedUsersBelow_Edit(q, circlesBelowArea_Edit, lastCircleDrawed);
}

/**
 * draw circles in dependency of count
 * 
 * @param {number} q - card number
 * @param {objj} circlesBelowArea_Edit - container for all circles below
 * @param {boolean} lastCircleDrawed - already 4 circles drawed?
 */
async function drawCirclesForSelectedUsersBelow_Edit(q, circlesBelowArea_Edit, lastCircleDrawed) {
    const user = (await returnBoardLoadTasks())[q]['selectAssignedTo'];

    for (let index = 0; index < user.length; index++) {
        const element = user[index];
        const UserInitials = getInitials(element);
        if (index < maxVisibleCirclesBelow) {
            drawNewCircle_BoardBelow_Edit(index, circlesBelowArea_Edit, UserInitials, q, element);
        } else {
            onlySummedUpCircleBelow_Board_Edit(index, q, circlesBelowArea_Edit, lastCircleDrawed);
            lastCircleDrawed = true;
        }
    }
}

/**
 * draw and get color for circle
 * @param {number} index -  number of user in task
 * @param {string} targetElementId - field for colored circle
 * @param {string} UserInitials 
 * @param {number} q - add task card number
 * @param {string} element - rgb for color
 */
function drawNewCircle_Board_Edit(index, targetElementId, UserInitials, q, element) {
    document.getElementById(targetElementId).innerHTML = /*html*/`
            <div class="profileBadge" id="initials${index}_${q}_Edit">${UserInitials}</div>`;

    document.getElementById(`initials${index}_${q}_Edit`).style.backgroundColor = returnContactColorByName(element);
}

/**
 * 
 * @param {number} index - user number
 * @param {object} circlesBelowArea_Edit - area below
 * @param {string} UserInitials 
 * @param {number} q - card number
 * @param {string} element - rgb for circle
 */
function drawNewCircle_BoardBelow_Edit(index, circlesBelowArea_Edit, UserInitials, q, element) {
    circlesBelowArea_Edit.innerHTML += /*html*/`
            <div class="profileBadge" id="initialsBelow${index}_${q}_Edit">${UserInitials}</div>`;

    document.getElementById(`initialsBelow${index}_${q}_Edit`).style.backgroundColor = returnContactColorByName(element);
}

/**
 * only the a summed up circle below is printed (e.g. +2)
 * @param {number} index 
 * @param {number} q 
 * @param {string} circlesBelowArea_Edit - container to print contact circle
 * @param {boolean} lastCircleDrawed 
 */
function onlySummedUpCircleBelow_Board_Edit(index, q, circlesBelowArea_Edit, lastCircleDrawed) {
    if (!lastCircleDrawed) {
        firstSummedUpCircleBelow_Board_Edit(index, q, circlesBelowArea_Edit);
    } else {
        furtherSummedUpCircleBelow_Board_edit(index, q);
    }
}

/**
 * logic for the first summed up circle below
 * @param {number} index 
 * @param {number} q 
 * @param {string} targetElementId - where to print the circle
 */
function firstSummedUpCircleBelow_Board_Edit(index, q, targetElementId) {
    targetElementId.innerHTML += /*html*/`
    <div class="profileBadge" id="initialsBelow${maxVisibleCirclesBelow}_${q}">+${index + 1 - maxVisibleCirclesBelow}</div>
    `
}

/**
 * logic for further summed up circle below
 * @param {number} index 
 * @param {number} q 
 */
function furtherSummedUpCircleBelow_Board_edit(index, q) {
    document.getElementById(`initialsBelow${maxVisibleCirclesBelow}_${q}`).innerHTML = '+' + (index + 1 - maxVisibleCirclesBelow);
}
// end

/**
 * logic to handle checked (assigned) users (checkbox)
 * @param {number} i 
 * @param {number} q 
 * @param {string} userBoard 
 * @param {boolean} isAssigned 
 */
function isAssignedBoard(i, q, userBoard, isAssigned) {
    if (isAssigned != -1) {
        document.getElementById(`checkFilledBoard${i}`).style.display = 'block';
        // document.getElementById(`contactBoard${i}`).style.backgroundColor = 'rgb(246,247,248)';
        document.getElementById(`checkEmptyBoard${i}`).style.display = 'none';
    } else {
        document.getElementById(`checkEmptyBoard${i}`).style.display = 'block';
        document.getElementById(`contactBoard${i}`).style.backgroundColor = '';
        document.getElementById(`checkFilledBoard${i}`).style.display = 'none';
    }
    document.getElementById(`circleBoard_Edit_${q}_${i}`).style.backgroundColor = returnContactColorByName(userBoard);
    document.getElementById(`circleBoard_Edit_${q}_${i}`).innerHTML = getInitials(userBoard);
}

/**
 * function to add or remove from the map
 * @param {number of the name} index 
 * @param {parameter der Karte} q 
 */
async function addContactBoard(index, q) {
    const checkEmptyElement = document.getElementById(`checkEmptyBoard${index}`);
    const checkFilledElement = document.getElementById(`checkFilledBoard${index}`);
    const userNameElement = document.getElementById(`userNameBoard${index}`);
    const userName = userNameElement.textContent;

    if (checkFilledElement.style.display === 'none') {
        checkEmptyElement.style.display = 'none';
        checkFilledElement.style.display = 'block';
        tasks[q].selectAssignedTo.push(userName);
    } else {
        checkEmptyElement.style.display = 'block';
        checkFilledElement.style.display = 'none';
        tasks[q].selectAssignedTo.splice(tasks[q].selectAssignedTo.indexOf(userName), 1);
    }
    await setItem('tasks', JSON.stringify(tasks));
    loadInitials_Edit(q);
}

function doNotClose(event) {
    event.stopPropagation();
}

/**
 * close via arrow drop up the a contact
 */
function closeContactBoard() {
    let contactBoard5 = document.getElementById('contactBoard3');
    if (contactBoard5 && contactBoard5.style.display === 'none') {
        contactBoard5.style.display = 'block';
        document.getElementById('contactBoard1').style.display = 'none';
        document.getElementById('contactBoard4').style.display = 'none';
    }
}

/**
 * logic for generate a mobile detail HTML
 * @param {number} q 
 * @param {string} title 
 * @param {string} description 
 * @param {string} category 
 * @param {string} priority 
 * @param {date} date 
 * @param {string} priorityIMG 
 * @param {number} assigned 
 * @param {number} column 
 * @returns 
 */
function generateMobileDetailHTML(q, title, description, category, priority, date, priorityIMG, assigned, column) {
    const isTodo = (column === 'to do');
    const isProgress = (column == 'inProgress');
    const isFeedback = (column == 'feedback');
    const isDone = (column == 'done');

    return /*html*/ `
    <span ontouchstart="openDetailCard('${q}', '${title}', '${description}', '${category}','${priority}','${date}','${priorityIMG}','${assigned}')" class="textMobileBoardContain"><p class="textContain6">Edit</p></span>
    <div class="textContain8">Move To:</div>
    <div class="textMobileBoardContain1" ontouchstart="touchTask('${q}', 'to do')" style="display: ${isTodo ? 'none' : 'block'}"><p class="textContain7">Todo</p></div>
    <div class="textMobileBoardContain1" ontouchstart="touchTask('${q}', 'inProgress')" style="display: ${isProgress ? 'none' : 'block'}"><p class="textContain7">in Progress</p></div>
    <div class="textMobileBoardContain1" ontouchstart="touchTask('${q}', 'feedback')" style="display: ${isFeedback ? 'none' : 'block'}"><p class="textContain7">await Feedback</p></div>
    <div class="textMobileBoardContain1" ontouchstart="touchTask('${q}', 'done')" style="display: ${isDone ? 'none' : 'block'}"><p class="textContain7">Done</p></div>
    `;
}

function openDetailCardMobile(q, title, description, category, priority, date, priorityIMG, assigned, column) {
    document.getElementById(`notesDetail_${q}`).style.display = 'block';
    let notes = document.getElementById(`notesDetail_${q}`);

    notes.innerHTML = generateMobileDetailHTML(q, title, description, category, priority, date, priorityIMG, assigned, column);
    closeDetailCardMobile(q);
}

function closeDetailCardMobile(q) {
    const element = document.getElementById(`notesDetail_${q}`);
    if (element) {
        setTimeout(() => {
            element.style.display = 'none';
        }, 1500);
    }
    switchClasses(true);
}

/**
 * touch function to open a detail card
 * @param {number} q 
 * @param {string} column - e.g. in progress
 */
function touchTask(q, column) {
    document.getElementById(`notesDetail_${q}`).style.display = 'none';
    ev = event || window.event;
    allowDrop(ev);
    startDragging(q);
    drop(ev, column);
}