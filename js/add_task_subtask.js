// #region add Subtask

/**
 * Add a subtask. Optional field. Plus button only working when filled field.
 */

let subtaskNumber = 0;

/**
 * add subtask and switch input field
 */
function addSubtask() {
    if (document.getElementById('subtaskInputfield').value) {
        subtaskInputfield = document.getElementById('subtaskInputfield').value;
        selectedSubtasks = document.getElementById('selectedSubtasks');
        selectedSubtasks.innerHTML += oneSelectedSubtask();
        document.getElementById('subtaskInputfield').value = '';
        subtaskNumber++;
        fillSubtaskArray();
    }
}

/**
 * 
 * @returns HTML for feature of single subtask
 */
function oneSelectedSubtask(){
    return /*html*/`
        <div class="oneSelectedSubtask" onmouseover="showEdit('pencil-bin${subtaskNumber}');" onmouseout="closeEdit('pencil-bin${subtaskNumber}')" id="oneSubtask${subtaskNumber}">                
                <div style="display: flex; width: 100%">
                    •<div id="rawData${subtaskNumber}">
                        ${subtaskInputfield}
                    </div>
                    <input class="inputChangeSubtask d-none" id="rawDataChange${subtaskNumber}" type="text" value="${subtaskInputfield}">
                </div>                              
                <div class="pencil-bin d-none" id="pencil-bin${subtaskNumber}">
                    <img src="assets/img/Subtasks_pencil.svg" id="pencil${subtaskNumber}"
                        onclick="editSubtask(${subtaskNumber});" class="cursor-pointer">
                    <div class="pencil-bin-separator"></div>
                    <img src="assets/img/Subtasks_bin.svg" onclick=deleteSubtaskInAddTask(${subtaskNumber}) class="cursor-pointer">
                    <img src="assets/img/check_black.svg" class="d-none" id="submit${subtaskNumber}" 
                        onclick="saveSubtaskChanges('rawDataChange${subtaskNumber}', 'rawData${subtaskNumber}', '${subtaskNumber}'); 
                        add_d_none('rawDataChange${subtaskNumber}'); remove_d_none('rawData${subtaskNumber}'); 
                        remove_d_none('pencil${subtaskNumber}'); add_d_none('submit${subtaskNumber}')" class="cursor-pointer">                                        
                </div>    
            </div>  
    `
}

/**
 * editing subtask: remove div container and exchange by input field with value of div containers text
 * 
 * @param {*} subtaskNumber - number of editing subtask
 */
function editSubtask(subtaskNumber) {
    remove_d_none('rawDataChange' + subtaskNumber);
    add_d_none('rawData' + subtaskNumber);
    add_d_none('pencil' + subtaskNumber);
    remove_d_none('submit' + subtaskNumber);
}

/**
 * User can change a written subtask. To confrim changes he can click on hook to save the changes
 * 
 * @param {string} changedValue - include the changes
 * @param {string} goal - includes previous text of subtask
 * @param {string} subtaskNumber - several subtasks are possible, hence a subtask number
 */
function saveSubtaskChanges(changedValue, goal, subtaskNumber) {
    document.getElementById(goal).value = document.getElementById(changedValue).value;
    fillSubtaskArrayAsValue(subtaskNumber);
    document.getElementById(`rawData${subtaskNumber}`).innerHTML = /*html*/`
        ${document.getElementById(changedValue).value}
    `

}

function fillSubtaskArray() {
    subtasks = [];
    for (let i = 0; i < 100; i++) {
        let element = document.getElementById('rawData' + i)

        if (element) {
            subtasks.push(element.innerText);
        }

    }
}

/**
 * fill array for subtasks with a current subtask
 * 
 * @param {string} subtaskNumber 
 */
function fillSubtaskArrayAsValue(subtaskNumber) {
    let element = document.getElementById('rawData' + subtaskNumber)

    if (element) {
        subtasks[subtaskNumber] = element.value;  // here as a value
    }
}

/**
 * on mouseover subtask show pencil for edit
 * 
 * @param {string} x 
 */
function showEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.remove('d-none');
}

function closeEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.add('d-none');
}

/**
 * delete a specific subtask
 * 
 * @param {string} x - number of subtask to be delted
 */
function deleteSubtaskInAddTask(x) {
    let oneSubtaskToDelete = document.getElementById(`oneSubtask${x}`);

    for (let i = 0; i < subtasks.length; i++) {
        const currentSubtask = subtasks[i];

        if (document.getElementById('rawData' + x).innerHTML === currentSubtask) {
            subtasks.splice(i, 1);
        }
    }
    oneSubtaskToDelete.innerHTML = '';
    fillSubtaskArray();
}

/**
 * reset Add Task: set white background if colored
 * 
 * @param {string} classname - id of prio button
 */
function changeWhiteBackground(classname) {
    let surface = document.getElementById(classname).classList
    if (surface.contains('white-background')) {
        surface.remove('white-background');
    }
    else {
        surface.add('white-background');
    }
}

// #endregion add Subtask