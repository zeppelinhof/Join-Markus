let toDos = [];
let progress = [];
let feedbacks = [];
let done = [];


function init() {

}



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