let tasks = [];
let boardStatus = 'to do';
let listClosed = false;

async function initAddTask() {
    await includeHTML();
    await loadUsers();
    await fillAssignedTo();
    await loadTasks();
    userInitials();
}

// #region Coloring Buttons Urgent, Medium, Low / Set status of Prio for transfer to Board

/**
 * By clicking a Prio button color change to red, orange or green
 * 
 * @param {string} btn_prio -       id of selcted button
 * @param {string} button_color -   class of colred button
 * @param {string} arrowWhitePrio - id of white arrow
 * @param {string} arrowColorPrio - id of colored arrow
 * @param {string} prio - as text
 * @param {string} callingPage - page which calls this function (add_task or board)
 */
function colorButton(btn_prio, button_color, arrowWhitePrio, arrowColorPrio, prio, callingPage) {
    let btn = document.getElementById(btn_prio);
    if (coloredBackground(btn)) { //already colored background
        whiteBackgroundColoredArrow(btn, button_color, arrowWhitePrio, arrowColorPrio);
        setPrioStatusAsString(''); arrowWhitePrio, arrowColorPrio
    }
    else {
        btn.classList.add(button_color);  //color background
        pushToFront(arrowWhitePrio); // z-index of white arrow to 1
        pushToBackground(arrowColorPrio);
        setPrioStatusAsString(prio);
    }
    changeWhiteBackgroundColoredArrow(prio, callingPage); // all other Button to neutral (white)
    saveChanges(callingPage, prio);
}

/**
 * 
 * @param {object} btn - selected button
 * @returns button is colored (selected) yes/no
 */
function coloredBackground(btn) {
    return btn.classList.length > 1
}

/**
 * save (new) prio status
 * @param {string} callingPage - page which calls this function
 * @param {string} prio - prio selected
 */
function saveChanges(callingPage, prio) {
    if (callingPage == 'board') {
        editPrioBoard(prio);
        document.getElementById('inputPrio').value = prio;
    }
}

/**
 * set background of other (not clicked) buttons to white
 * 
 * @param {string} prio - urgent, medium or low
 */
function changeWhiteBackgroundColoredArrow(prio, callingPage) {

    let btn_urgent = callingPage == 'add_task' ? 'btn_urgent' : 'btn_urgent_board';
    let btn_medium = callingPage == 'add_task' ? 'btn_medium' : 'btn_medium_board';
    let btn_low = callingPage == 'add_task' ? 'btn_low' : 'btn_low_board';

    let arrowWhiteMedium = callingPage == 'add_task' ? 'arrowWhiteMedium' : 'arrowWhiteMedium_board';
    let arrowOrangeMedium = callingPage == 'add_task' ? 'arrowOrangeMedium' : 'arrowOrangeMedium_board';
    let arrowWhiteLow = callingPage == 'add_task' ? 'arrowWhiteLow' : 'arrowWhiteLow_board';
    let arrowGreenLow = callingPage == 'add_task' ? 'arrowGreenLow' : 'arrowGreenLow_board';
    let arrowWhiteUrgent = callingPage == 'add_task' ? 'arrowWhiteUrgent' : 'arrowWhiteUrgent_board';
    let arrowRedUrgent = callingPage == 'add_task' ? 'arrowRedUrgent' : 'arrowRedUrgent_board';

    if (prio == 'urgent') {
        whiteBackgroundColoredArrow(document.getElementById(btn_medium), 'button-orange', arrowWhiteMedium, arrowOrangeMedium);
        whiteBackgroundColoredArrow(document.getElementById(btn_low), 'button-green', arrowWhiteLow, arrowGreenLow)
    }
    if (prio == 'medium') {
        whiteBackgroundColoredArrow(document.getElementById(btn_urgent), 'button-red', arrowWhiteUrgent, arrowRedUrgent);
        whiteBackgroundColoredArrow(document.getElementById(btn_low), 'button-green', arrowWhiteLow, arrowGreenLow)
    }
    if (prio == 'low') {
        whiteBackgroundColoredArrow(document.getElementById(btn_urgent), 'button-red', arrowWhiteUrgent, arrowRedUrgent);
        whiteBackgroundColoredArrow(document.getElementById(btn_medium), 'button-orange', arrowWhiteMedium, arrowOrangeMedium);
    }
}

/**
 * By clicking a prio button twice it changed to white and arrow change to colored (neutral status)
 * 
 * @param {object} btn - one of the Prio buttons
 * @param {string} button_color - class of colored button
 * @param {string} arrowWhitePrio - id of white arrow
 * @param {string} arrowColorPrio - id of colored arrow
 */
function whiteBackgroundColoredArrow(btn, button_color, arrowWhitePrio, arrowColorPrio) {
    btn.classList.remove(button_color);
    document.getElementById(arrowWhitePrio).classList.remove('z-index-1');
    document.getElementById(arrowColorPrio).classList.remove('z-index-n1');
}

/**
 * push to front by set z-index = 1
 * @param {string} obj - id
 */
function pushToFront(obj) {
    document.getElementById(obj).classList.add('z-index-1');
}

/**
 * push to front by set z-index = -1
 * @param {string} obj - id
 */
function pushToBackground(obj) {
    document.getElementById(obj).classList.add('z-index-n1');
}

/**
 * status im string format for evaluation
 * 
 * @param {string} status -urgent ...
 */
function setPrioStatusAsString(status) {
    document.getElementById('prioStatusAsString').innerHTML = status;
}

/**
 * by reloading page change all prio buttons to neutral
 */
function clearPrioButtons(callingPage) {
    btnUrgent = document.getElementById('btn_urgent')
    btnMedium = document.getElementById('btn_medium')
    btnLow = document.getElementById('btn_low')

    if (btnUrgent.classList.length > 1) {
        whiteBackgroundColoredArrow(btnUrgent, 'button-red', 'arrowWhiteUrgent', 'arrowRedUrgent');
        setPrioStatusAsString('');
    }
    if (btnMedium.classList.length > 1) {
        whiteBackgroundColoredArrow(btnMedium, 'button-orange', 'arrowWhiteMedium', 'arrowOrangeMedium');
        setPrioStatusAsString('');
    }
    if (btnLow.classList.length > 1) {
        whiteBackgroundColoredArrow(btnLow, 'button-green', 'arrowWhiteLow', 'arrowGreenLow');
        setPrioStatusAsString('');
    }
}

// #endregion region Coloring Buttons Urgent Medium Low

// #region Data from Add Task to Backend

/**
 * clicking Create task saves task data in array and reset current page
 * 
 * @param {*} validatedPage - superior page of calling function
 */
async function register_task(validatedPage) {
    // tasks.splice(0,2);
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
    resetFormAddTask(validatedPage, true); // true means that Created Task (not Clear)
}

/**
 * set subtaskstate for all tasks to false
 */
function subtaskstate() {
    let subtaskstate = [];
    for (let i = 0; i < subtasks.length; i++) {
        subtaskstate[i] = 'false';
    }
    return subtaskstate;
}

/**
 * To avoid error by enter bad title
 * 
 * @param {string} input - content of field for input
 * @returns {string} - corrected input data
 */
function cleanInputString(input) {
    const pattern = /[<>&"'/\\]/g;
    const sanitizedInput = input.replace(pattern, '');
    const trimmedInput = sanitizedInput.trim();
    return trimmedInput;
}

/**
 * clear all temporary arrays of add task and reload page
 * 
 * @param {*} validatedPage - superior page of calling function
 */
function resetFormAddTask(validatedPage, created) {
    title.value = '';
    description.value = '';
    contactsInTask = [];
    selectAssignedTo.innerHTML = '';
    date.value = '';
    subtasks = [];
    document.getElementById('selectedSubtasks').innerHTML = '';
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    reloadPage(validatedPage);
    if (created) {
        addNewTaskShowSlideBox('Task created');
    }
}

// #endregion Data from Add Task to Backend

// #region select contact logic
let categoryClosed = false;

/**
 * function for hiding containers
 * 
 * @param {string} classname - contains id of container
 */
function add_d_none(classname) {
    if (!document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.add('d-none');
    }
}

/**
 * function for hiding containers
 * 
 * @param {string} classname - contains id of container
 */
function remove_d_none(classname) {
    if (document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.remove('d-none');
    }
}

/**
 * push dropdown of contacts to background (close Dropdown)
 * 
 * @param {string} field - contains id of container
 */
function selectContactFieldInBackground(field) {
    add_d_none('selectContactField');
    if (document.getElementById(field).classList.contains('d-none')) {
        remove_d_none(field);
        remove_d_none('uparrow');
    }
}

function closeContactList(field) {
    if (!document.getElementById(field).classList.contains('d-none')) {
        add_d_none(field);
        remove_d_none('selectContactField');
        add_d_none('uparrow');
        remove_d_none('downarrow');
        add_d_none('areaClickedCauseClosingList');
        listClosed = true;
    }
}

/**
 * are to be clicked an close a list
 */
function areaClickedCauseClosingList() {
    remove_d_none('areaClickedCauseClosingList');
}

/**
 * when list not closed then show it
 */
function areaClickedCauseClosingListOuter() {
    if (!listClosed) {
        remove_d_none('areaClickedCauseClosingList');
    } else {
        listClosed = false;
    }
}


/**
 * manage visibilty of container Category list
 */
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

/**
 * switch configurations (behavior of containers) to show closing dropdown of category
 */
function closeContentCategory() {
    add_d_none('uparrow_cat');
    add_d_none('contentCategory');
    remove_d_none('downarrow_cat');
    categoryClosed = true;
}

/**
 * logi when select category User Story or Technical Task
 * @param {number} i - nr 1 or two 
 */
function selectCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    selectedCategory.innerHTML = document.getElementById('category' + i).innerHTML;
}


// #endregion select contact logic


//#region set Date Minimum for Datepicker

/**
 * functions to set today's date for disable past calendar days
 */
async function setDateOfTodayForDatepicker(inputName) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName(inputName)[0].setAttribute('min', today);
}

function setDateOfTodayForDatepickerCard(inputId) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName(inputId)[0].setAttribute('min', today);
}
//#endregion set Date Minimum for Datepicker

/**
 * after page has been validated, reload it
 * 
 * @param {*} validatedPage - superior page of calling function
 */
function reloadPage(validatedPage) {
    clearPrioButtons(validatedPage);
    validatedPage == 'add_task' ? getAddTask() : getBoard();
}

/**
 * filter the contacts according user input
 */
function filterNames(inputfield, contactfield) {
    let search = document.getElementById(inputfield).value;
    search = search.toLowerCase();

    document.getElementById(contactfield).innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        if (user.toLowerCase().includes(search)) {
            document.getElementById(contactfield).innerHTML += showDropdown(i, user);
            fillUsername(i, user);
        }
    }
}