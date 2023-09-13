// #region Add Task
function getAddTask() {
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
// #endregion Add Task

//#region Board
function getBoard() {
    loadHTML('dynamicContent', 'board.html');
    boardInit();
}

//#endregion Board

//#region Summary
function getSummary() {
    loadHTML('dynamicContent', 'summary.html');
    initSummary();
}
//#endregion Summary

//#region Contacts
function getContacts() {
    loadHTML('dynamicContent', 'contacts.html');
    initContacts();
}
//#endregion Contacts