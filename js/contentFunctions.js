// #region Add Task
function getAddTask() {
    document.getElementById('dynamicContent').innerHTML = getAddTaskContent();
    initAddTask();
    document.getElementById('body_join').innerHTML += getAddTaskScript();
}

function getAddTaskContent() {
    return /*html*/`
        <div class="contentStandard left-0-top-3em-mobile">
            <div class="add-task-subcontainer">
                <h1>Add Task</h1>
                <div class="panel block-mobile">
                    <div class="left-side-of-panel">
                        <div class="property">
                            <label for="title" class="form-label">Title</label>
                            <input id="title" type="text" class="form-control height-48px cursor-pointer"
                                placeholder="Enter a title">
                            <div class="invalidMessage d-none" id="titleInvalid">This field is required.</div>
                        </div>
                        <div class="property">
                            <label class="form-label">Description</label>
                            <textarea id="description" class="form-control cursor-pointer"
                                placeholder="Enter a Description" id="floatingTextarea"
                                style="height: 100px"></textarea>
                            <div class="invalidMessage d-none" id="descriptionInvalid">This field is required.</div>
                        </div>
                        <div class="property">
                            <label class="form-label">Assigned to</label>
                            <div class="select-btn form-control" onclick="selectContactFieldInBackground();"
                                id="selectContactField">
                                <span>Select Contact</span>
                                <div class="circleAroundDownArrow" id="downarrow"
                                    onclick="add_d_none('downarrow'); remove_d_none('uparrow');">
                                    <img src="./assets/img/arrow_drop_down.svg">
                                </div>
                            </div>
                            <div class="contentSearchContact d-none" id="contentSearchContact">
                                <div class="search">
                                    <input type="text" placeholder="Search" id="searchContactField">
                                    <div class="circleAroundUpArrow d-none" id="uparrow"
                                        onclick="add_d_none('contentSearchContact'); remove_d_none('selectContactField'); add_d_none('uparrow'); remove_d_none('downarrow');">
                                        <img src="./assets/img/arrow_drop_up.svg">
                                    </div>
                                </div>
                                <div style="position: relative;">
                                    <ul class="selectAssignedTo" id="selectAssignedTo">
                                    </ul>
                                    <div class="buttonInContactListAddContact dropdownAbsolutePositioned"
                                        id="buttonInContactListAddContact"
                                        onclick="openAndCloseAddNewEditContact('add-new-contact-include-HTML', 'add-new-contact')">
                                        <div>
                                            Add new contact
                                        </div>
                                        <div>
                                            <img src="./assets/img/person_add.svg">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="invalidMessage d-none" id="assignedToInvalid">This field is required.</div>
                            <div id="selected-contacts-circles-below">
                            </div>
                        </div>
                    </div>
                    <div class="separator hide-mobile"></div>
                    <div class="right-side-of-panel">
                        <div class="property">
                            <label class="form-label">Due date</label>
                            <input id="date" name="date" type="date"
                                class="form-control height-48px date-format cursor-pointer" placeholder="dd/mm/yyyy"
                                onmouseover="setDateOfTodayForDatepicker();">
                            <div class="invalidMessage d-none" id="dateInvalid">This field is required.</div>
                        </div>
                        <div class="property">
                            <label class="form-label">Prio</label>
                            <div class="all-buttons-prio" id="all-buttons-prio">
                                <div id="btn_urgent" class="button-prio" onclick="colorRed();">Urgent
                                    <div class="containArrow">
                                        <img id="arrowWhiteUrgent" class="arrowWhiteUrgent"
                                            src="./assets/img/Capa_2_white.svg">
                                        <img id="arrowRedUrgent" class="arrowRedUrgent" src="./assets/img/Capa_2.svg">
                                    </div>
                                </div>
                                <div id="btn_medium" class="button-prio" onclick="colorOrange();">Medium
                                    <div class="containArrow">
                                        <img id="arrowWhiteMedium" class="arrowWhiteMedium"
                                            src="./assets/img/Prio_media_white.svg">
                                        <img id="arrowOrangeMedium" class="arrowOrangeMedium"
                                            src="./assets/img/Prio_media.svg">
                                    </div>
                                </div>
                                <div id="btn_low" class="button-prio" onclick="colorGreen();">Low
                                    <div class="containArrow">
                                        <img id="arrowWhiteLow" class="arrowWhiteLow"
                                            src="./assets/img/Capa_1_white.svg">
                                        <img id="arrowGreenLow" class="arrowGreenLow" src="./assets/img/Capa_1.svg">
                                    </div>
                                </div>
                                <div id="prioStatusAsString" style="display: none;"></div>
                            </div>
                            <div class="invalidMessage d-none" id="prioInvalid">This field is required.</div>
                        </div>
                        <div class="property">
                            <div class="wrapper-category">
                                <label class="form-label" for="">Category</label>
                                <div class="select-btn form-control" onclick="showContentCategory();" id="categoryId">
                                    <span id="selectedCategory">Select task category</span>
                                    <div class=" circleAroundDownArrow" id="downarrow_cat"
                                        onclick="showContentCategory();">
                                        <img src="assets/img/arrow_drop_down.svg">
                                    </div>
                                    <div class="circleAroundDownArrow d-none" id="uparrow_cat"
                                        onclick="closeContentCategory();">
                                        <img src="assets/img/arrow_drop_up.svg">
                                    </div>
                                </div>
                            </div>
                            <div class="contentSearchContact d-none" id="contentCategory">
                                <ul class="selectAssignedTo dropdownAbsolutePositioned">
                                    <li class="list-group-item padding-left-16 list-group-item-category"
                                        onclick="selectCategory(1); closeContentCategory();">
                                        <div class="list-item-display-flex">
                                            <div class="list-item-display-flex-icon-name" id="category1">User Story
                                            </div>
                                        </div>
                                    </li>
                                    <li class="list-group-item padding-left-16 display-flex"
                                        onclick="selectCategory(2); closeContentCategory();">
                                        <div class="list-item-display-flex">
                                            <div class="list-item-display-flex-icon-name" id="category2">Technical
                                                Task</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="invalidMessage d-none" id="categoryInvalid">This field is required.</div>
                        </div>
                        <div class="property">
                            <label for="subtask_wrapper" class="form-label">Subtasks</label>
                            <div class="input-group" id="subtask_wrapper">
                                <input type="text"
                                    class="form-control white-background borderradius-10 height-48px cursor-pointer"
                                    placeholder="Add new subtask" aria-label="Recipient's username"
                                    aria-describedby="basic-addon2" id="subtaskInputfield">
                                <img id="add_symbol" class="cursor-pointer" src="./assets/img/add_black.svg"
                                    onclick="addSubtask();">
                            </div>
                            <div class="invalidMessage d-none" id="subtaskInvalid">This field is required.</div>
                            <div class="selectedSubtasks bigger-area-mobile" id="selectedSubtasks"></div>
                        </div>
                        <div class="buttons_clear_create fixed-mobile">
                            <button class="btn btn-outline-dark button-clear hide-mobile" onclick="resetForm2();"
                                onmouseover="remove_d_none('blue_x'); add_d_none('black_x');"
                                onmouseleave="add_d_none('blue_x'); remove_d_none('black_x');">Clear<img id="black_x"
                                    src="./assets/img/Vector.svg"> <img id="blue_x" src="./assets/img/Vector_blue.svg"
                                    class="d-none"></button>
                            <div>
                                <button class="btn btn-outline-dark button-create-task" onclick="custValidation();"
                                    id="buttonCreate">Create Task <img src="./assets/img/check.svg"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

function getAddTaskScript() {
    return /*html*/`
        <!-- Search contacts by typing letters in field. Please do not delete. -->
        <script>
            try{
                const wrapper = document.getElementById('wrapper');
            searchInp = document.getElementById('searchContactField');
            selectAssignedTo = document.getElementById('selectAssignedTo');
            searchInp.addEventListener("keyup", () => {
                if (document.getElementById('searchContactField').value == '') {
                    document.getElementById('selectAssignedTo').innerHTML = '';
                    fillAssignedTo();
                }
                else {
                    document.getElementById('selectAssignedTo').innerHTML = '';
                    let arr = [];
                    let searchedVal = searchInp.value.toLowerCase();
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        if (user.name.toLowerCase().startsWith(searchedVal) && searchedVal != "") {
                            document.getElementById('selectAssignedTo').innerHTML += showDropdown(i, user);
                            fillUsername(i, user.name);
                        }
                    }
                }
            });
            }

            catch{
                console.error('hat nicht funktioniert');
            }
        </script>
    `
}
// #endregion Add Task

//#region Board
function getBoard() {
    document.getElementById('dynamicContent').innerHTML = getBoardContent();
    getInitials('Juri S');
    boardInit();
}

function getBoardContent() {
    return /*html*/`
        <div class="bodyContainer">
            <div class="headlineBoardMobile">
                <div class="boardContainMobile">
                    <h1>Board</h1>
                    <div class="headlineBoard1Mobile">
                        <button type="button" class="btn btn-primary headlineButton"
                            onclick="openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')">
                            <img class="hlB1" src="assets/img/add.svg" alt="">
                        </button>
                    </div>
                </div>
                <div class="searchContainerMobile">
                    <div class="sC1Mobile">
                        <input class="inputBoard" type="search" id="searchInputMobile" placeholder="Find Task"
                            oninput="loopAllTasks()">
                        <img class="search" id="searchButton" onclick="searchTasks()" src="assets/img/Frame 122.svg"
                            alt="">
                    </div>
                </div>
            </div>
            <div class="headlineBoard">
                <h1>Board</h1>
                <div class="headlineBoard1">
                    <div class="searchContainer">
                        <div class="sC1">
                            <input class="inputBoard" type="search" id="searchInput" placeholder="Find Task"
                                oninput="loopAllTasks()">
                            <img class="search" id="searchButton" onclick="loopAllTasks()"
                                src="assets/img/Frame 122.svg" alt="">
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary headlineButton"
                        onclick="openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')">
                        <p>Add task</p>
                        <img class="hlB1" src="assets/img/add.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="boardContainer" id="boardContain">
                <div class="Todo">
                    <div class="hlB">
                        <p>To do</p>
                        <img class="addheadlineButton" src="assets/img/plus button.svg" alt="plus"
                            onclick="addFeedback('to do')">
                    </div>
                    <div class="noTaskContainer" id="noTask">
                        <span class="noTaskContainer1">
                            <p>No tasks To do</p>
                        </span>
                    </div>
                    <div class="taskContainer" id="toDoContainer" ondrop="drop(event, 'to do')"
                        ondragover="allowDrop(event)">
                    </div>

                </div>
                <div class="in_Progress">
                    <div class="hlB">
                        <p> In progress</p>
                        <img class="addheadlineButton" src="assets/img/plus button.svg" alt="plus"
                            onclick="addFeedback('inProgress')">
                    </div>
                    <div class="noTaskContainer" id="noProgress">
                        <span class="noTaskContainer2">
                            <p>No tasks Progress</p>
                        </span>
                    </div>
                    <div class="taskContainer" id="inProgressContainer" ondrop="drop(event, 'inProgress')"
                        ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="Feedback">
                    <div class="hlB">
                        <p> Await feedback</p>
                        <img class="addheadlineButton" src="assets/img/plus button.svg" alt="plus"
                            onclick="addFeedback('feedback')">
                    </div>
                    <div class="noTaskContainer" id="noFeedback">
                        <span class="noTaskContainer2">
                            <p>No tasks feedback</p>
                        </span>
                    </div>
                    <div class="taskContainer" id="feedbackContainer" ondrop="drop(event, 'feedback')"
                        ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="donecontainer">
                    <div class="hlB">
                        <p>Done</p>
                    </div>
                    <div class="noTaskContainer" id="noDone">
                        <span class="noTaskContainer1">
                            <p>No tasks Done</p>
                        </span>
                    </div>
                    <div class="taskContainer" id="DoneContainer" ondrop="drop(event, 'done')"
                        ondragover="allowDrop(event)">
                    </div>
                </div>
            </div>
        </div>
        <div id="detailCard" style="display: none;">
            <div class="taskOverlay">
                <div class="frame203" id="frame203">
                    <span class="frame113" id="frame113">
                        <p id="taskContain"></p>
                    </span>
                    <div id="close1" onclick="closeDetailCard()">
                        <img class="close2" src="assets/img/close.svg" alt="close">
                    </div>
                </div>
                <p id="taskOverlayHeadline"></p>
                <p id="descriptionContain"></p>
                <div class="frame179">
                    <p class="taskOverlayDate">Due date:</p>
                    <span id="taskOverlayNumber"></span>
                </div>
                <div class="frame178">
                    <p class="priority">Priority:</p>
                    <div id="priorityButton">
                        <p id="medium"></p>
                        <span id="prioMedia"></span>
                    </div>
                </div>
                <div class="frame214">
                    <p class="assignedTo">Assigned To:</p>
                    <div id="frame204"></div>
                </div>
                <div class="frame215">
                    <p class="subtasks">Subtasks</p>
                    <div class="frame204" id="subtaskContain">

                    </div>
                </div>
                <div class="frame20" id="frame20">
                    <div class="deleteContact" onclick="deleteCard()">
                        <div class="deleteContain">
                            <img src="assets/img/delete.svg" alt="" class="deleteIcon">
                        </div>
                        <p class="deleteText">Delete</p>
                    </div>
                    <span class="vector3"></span>
                    <div class="editContacts">
                        <div class="editContain">
                            <img src="assets/img/edit.svg" alt="" class="editIcon">
                        </div>
                        <p class="editText">Edit</p>
                    </div>
                </div>
            </div>
        </div>
    `
}
//#endregion Board

//#region Summary
function getSummary() {
    document.getElementById('dynamicContent').innerHTML = getSummaryContent();
    initSummary();
}

function getSummaryContent() {
    return /*html*/`
        <div class="contentContainer">
            <div class="headline-subcontainer-panel">
                <div class="contact-data-headline">
                    <h1 class="contact-data-headline-left">Summary</h1>
                    <div class="contact-data-headline-subContainer">
                        <div class="contact-data-headline-separator"></div>
                        <span class="contact-data-headline-right">Everything in a nutshell!</span>
                    </div>
                </div>
                <div class="contentSubcontainer">
                    <div class="panelContainer">
                        <div class="panelRow">
                            <div class="tasksPanel" onclick="getBoard();">
                                <div class="variablePanel" id="variablePanel1"></div>
                                <div class="font20px400">Tasks in<br>Board</div>
                            </div>
                            <div class="tasksPanel" onclick="getBoard();">
                                <div class="variablePanel" id="variablePanel2"></div>
                                <div class="font20px400">Tasks in<br>Progress</div>
                            </div>
                            <div class="tasksPanel" onclick="getBoard();">
                                <div class="variablePanel" id="variablePanel3"></div>
                                <div class="font20px400">Awaiting<br>Feedback</div>
                            </div>
                        </div>
                        <div class="rowUrgent" onclick="getBoard();">
                            <div class="urgentTask">
                                <div class="urgentImageContainer">
                                    <img src="assets/img/Capa_2_white.svg" alt="arrowUp">
                                </div>
                                <div class="urgentTextContainer">
                                    <div class="variablePanel" id="variablePanel4"></div>
                                    <div class="font16px400">Urgent</div>
                                </div>
                            </div>
                            <div class="verticalGreyLine"></div>
                            <div class="deadline">
                                <div class="font21px700" id="deadlineDate">October 16, 2022</div>
                                <div class="font16px400">Upcoming Deadline</div>
                            </div>
                        </div>
                        <div class="panelRow">
                            <div class="otherTasksContainer" onclick="getBoard();">
                                <div class="edit">
                                    <div class="edit-icon"></div>
                                </div>
                                <div class="editText">
                                    <div class="variablePanel" id="variablePanel5"></div>
                                    <div class="font20px400">To-Do</div>
                                </div>
                            </div>
                            <div class="otherTasksContainer" onclick="getBoard();">
                                <div class="done">
                                    <div class="done-icon"></div>
                                </div>
                                <div class="editText">
                                    <div class="variablePanel" id="variablePanel6"></div>
                                    <div class="font20px400">Done</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="summary-greeting">
                        <div class="greetingContainer">
                            <div class="font47px500" id="greeting">Welcome,</div>
                            <div class="font64px700" style="color: #29ABE2;" id="greetingName">Guest</div>
                        </div>
                    </div>
                    <div class="greetingMobileContainer" id="greetingMobileContainer">
                        <div class="greetingMobileMessage" id="greetingMobileMessage"></div><br>
                        <div class="greetingMobileName" id="greetingMobileName"></div>
                    </div>
                </div>
            </div>
        </div>
    `
}
//#endregion Summary

//#region Contacts
function getContacts() {
    document.getElementById('dynamicContent').innerHTML = getContactsContent();
    // initSummary();
}

function getContactsContent(){
    return /*html*/`
        
    `
}
//#endregion Contacts