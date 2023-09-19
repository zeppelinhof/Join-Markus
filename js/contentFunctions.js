// #region Add Task
function getAddTask() {
    prepareIncludeAddTask_Standard_Or_Card('standard');
    setSidebarNavActive('add_task');
    loadHTML('dynamicContent', 'add_task.html');
    initAddTask();
    //document.getElementById('body_join').innerHTML += getAddTaskScript();
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

async function getBoard() {
    prepareIncludeAddTask_Standard_Or_Card('card');
    setSidebarNavActive('board');
    await loadHTML('dynamicContent', 'board.html');
    boardInit();    
}

async function getSummary() {
    setSidebarNavActive('summary');
    await loadHTML('dynamicContent', 'summary.html');
    initSummary();
}

async function getContacts() {
    await includeHTML();
    setSidebarNavActive('contacts');
    await loadHTML('dynamicContent', 'contacts.html');
    initContacts();
}

async function getHelp() {
    await loadHTML('dynamicContent', 'help.html');
    initHelp();
}

function prepareIncludeAddTask_Standard_Or_Card(typeOfAddTask) {
    if (typeOfAddTask == 'standard') {
        document.getElementById('addTaskCARD_include').innerHTML = '';
    }
    else {
        document.getElementById('addTaskCARD_include').innerHTML = /*html*/`
        <div class="contacts-d-none" w3-include-html="templates/add_task_card.html" id="add-new-task-include-HTML"></div>
        `
        includeHTML();
    }

}