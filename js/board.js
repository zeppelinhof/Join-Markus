let allTasks = [
    {
        "task": 'User Story',
        "designation": 'Kochwelt Page & Recipe Recomender',
        "description": 'Build start page wirh recipe recommendation',
        "date": '10.05.2023',
        "priority": 'Medium',
        "assigned": ["Emmanuel Mauerer", "Marcel Bauer", "Anton Mayeer"]
    },
    {
        "task": 'Technical Task',
        "designation": 'CSS Architecture Planning',
        "description": 'Define CSS naming conventions and structure.',
        "date": '02.09.2023',
        "priority": 'Urgent',
        "assigned": ['Juri Sajzew', 'Benedigt Ziegler']
    }
];


function init() {
    //includeHTML();
    detailCard();
}

//async function includeHTML() {
//    let includeElements = document.querySelectorAll('[w3-include-html]');
//    let file;
//
//    for (let i = 0; i < includeElements.length; i++) {
//        const element = includeElements[i];
//        file = element.getAttribute('w3-include-html');
//        let resp = await fetch(file);
//
//        if (resp.ok) {
//            element.innerHTML = await resp.text();
//        } else {
//            element.innerHTML = 'Page not found.';
//        };
//    }
//}



function openAddTask() {
    let contain = document.getElementById('noTaskContain');
    contain.innerHTML = '';

    document.getElementById('noTaskContain').innerHTML += /*html*/`
    <div class='hauptContainer'>
        <div class='unterContainer'>
            <div class='taskbezeichnung'>
                <p>User Story</p>
            </div>
            <div class='beschreibungsContainer'>
                <div class='titel'>
                    Hier kommt die Überschrit der Aufgabe!
                </div>
                <div class='beschreibung'>
                    hier kommt die Beschreibung der Aufgabe!
                </div>
            </div>
            <div class='progressBar'>
                    <div class="progress progress1" role="progressbar" aria-label="Basic example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar w-75 progressBar1"></div>
                    </div> 
                <div class='progressBarFortschritt'>1/2 Subtasks</div>
            </div>
            <div class='benutzerContainer'>
                <div class='benutzerNamenContainer'>
                    <span class='namensUeberContainer'>
                        <span class='eclipse'>
                            <p class='namensContainer'>AM</p>
                        </span>
                    </span>
                    <span class='namensUeberContainer'>
                        <span class='eclipse'>
                            <p class='namensContainer'>EL</p>
                        </span>
                    </span>
                    <span class='namensUeberContainer'>
                        <span class='eclipse'>
                            <p class='namensContainer'>MC</p>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
`;

    einBlenden();
}

function einBlenden() {
    document.getElementById('noTask').style.display = 'none';
    document.getElementById('noTaskContain').style.display = '';
}

function detailCard() {
    let detail = document.getElementById('detailCard');
    detail.innerHTML = '';

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];

        document.getElementById('detailCard').innerHTML += /*html*/`
            <div class="taskOverlay">
                <div class="frame203">
                    <span class="frame113">${task['task']}</span>
                    <div class="close1">
                        <img class="close2" src="assets/img/close.svg" alt="">
                    </div>
                </div>
                <p class="taskOverlayHeadline">${task['designation']}</p>
                <div class="frame179">
                    <p class="taskOverlayDate">Due date:</p>
                    <span class="taskOverlayNumber">${task['date']}</span>
                </div>
                <div class="frame178">
                    <p class="priority">Priority:</p>
                    <div class="priorityButton"></div>
                </div>
                <div class="frame214">
                    <p class="assignedTo">Assigned To:</p>
                    <div class="frame204">
                        <div class="contactContain">
                            <div class="frame191">
                                <div class="profileBadge">
                                    <div class="group9">
                                        <p class="initialien"></p>
                                        <div class="ellipse5"></div>
                                    </div>
                                </div>
                                <p class="userName6"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="frame215">
                   <p class="subtasks">Subtasks</p>
                   <div class="frame204">
                        <span class="subtasksCheck">
                            <p class="contactForm"></p>
                        </span>
                   </div>
                </div>
                <div class="frame20">
                    <div class="deleteContact">
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
    `;
    }
}