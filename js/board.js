let allTasks = [
    //{
    //    "task": 'User Story',
    //    "designation": 'Kochwelt Page & Recipe Recomender',
    //    "description": 'Build start page wirh recipe recommendation',
    //    "date": '10.05.2023',
    //    "priority": 'Medium',
    //    "assigned": ["Emmanuel Mauerer", "Marcel Bauer", "Anton Mayeer"],
    //    "initial": [],
    //    "category": 'User Story',
    //},
    //{
    //    "task": 'Technical Task',
    //    "designation": 'CSS Architecture Planning',
    //    "description": 'Define CSS naming conventions and structure.',
    //    "date": '02.09.2023',
    //    "priority": 'Urgent',
    //    "assigned": ['Juri Sajzew', 'Benedigt Ziegler'],
    //    "initial": [],
    //    "category": 'User Story',
    //},
    //{
    //    "task": 'Technical Task',
    //    "designation": 'CSS Architecture Planning',
    //    "description": 'Define CSS naming conventions and structure.',
    //    "date": '02.09.2023',
    //    "priority": 'Urgent',
    //    "assigned": ['Juri Sajzew', 'Benedigt Ziegler'],
    //    "initial": [],
    //    "category": 'Technical Story',
    //}
];

let currentDraggedElement;

function init() {
    //includeHTML();
    loadAllName();
    loadTasks();
}

async function loadTasks() {
    allTasks = JSON.parse(await getItem('tasks'));
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

function extractInitials(name) {
    return name.split(' ').map(part => part[0].toUpperCase()).join('');
}

function loadAllName() {
    for (let s = 0; s < allTasks.length; s++) {
        const namesArray = allTasks[s]['assigned'];
        const initials = namesArray.map(extractInitials);
        allTasks[s]['initial'] = initials;
    }
}

/*drag and drop function*/
function allowDrop(ev) {
    ev.preventDefault();
}


function openAddTask() {
    for (let a = 0; a < allTasks.length; a++) {
        const task = allTasks[a]['task'];
        const designation = allTasks[a]['designation'];
        const description = allTasks[a]['description'];
        const initialArray = allTasks[a]['initial'];
        const category = allTasks[a]['category'];

        const containerClass = category === 'User Story' ? 'toDoContainer' : 'inProgressContainer';

        let initialsHTML = '';

        for (let w = 0; w < initialArray.length; w++) {
            const initial = initialArray[w];
            initialsHTML += /*html*/ `
                <div class='profileBadge1' >
                    <div class="Group9">
                        <p class='initialContain'>${initial}</p>
                        <div class='eclipse5'></div>
                    </div>
                </div>`;
            if (w === initialArray.length - 1) {
                console.log("an error has occurred!");
            }
        }

        document.getElementById('noTaskContain').innerHTML += /*html*/`
            <div id="cards" onclick="detailCard()"  draggable="true" ondragstart="startDragging()" class="${containerClass}">
                <div class='frame119'>
                    <div class='labelsBoardCardlabel'>
                        <p id="cardLabel">${task}</p>
                    </div>
                    <div class='frame114'>
                        <div id='title'>${designation}</div>
                        <div id="content">${description}</div>
                    </div>
                    <div class='progressBar'>
                        <div class="progress progress1" role="progressbar" aria-label="Basic example"
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar w-75 progressBar1"></div>
                        </div>
                        <div class='progressBarFortschritt'>1/2 Subtasks</div>
                    </div>
                    <div id='frame139'>
                        <div id='frame217'>${initialsHTML}</div>
                    </div>
                </div>
            </div>
        `;
    }
    insert();
}

function detailCard() {
    openDetailCard();

    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i]['task'];
        const designation = allTasks[i]['designation'];
        const date = allTasks[i]['date'];

        document.getElementById('frame113').innerHTML = /*html*/`
           <span class="userStory">${task}</span>`;
        document.getElementById('taskOverlayHeadline').innerHTML = /*html*/`
        <p class="taskOverlineHeadline">${designation}</p> `;
        document.getElementById('taskOverlayNumber').innerHTML = /*html*/`
        <span class="taskOverlayNumber">${date}</span>`;
    }
}




/*Close and Open Function*/
function insert() {
    document.getElementById('noTask').style.display = 'none';
    document.getElementById('noTaskContain').style.display = '';
}

function openDetailCard() {
    document.getElementById('cards').style.display = 'none';
    document.getElementById('detailCard').style.display = '';
}

function closeDetailCard() {
    document.getElementById('detailCard').style.display = 'none';
    document.getElementById('cards').style.display = '';
}

