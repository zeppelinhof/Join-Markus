// #region Coloring Buttons Urgent Medium Low

function colorRed() {
    let btn = document.getElementById('btn_urgent');
    if (btn.classList.length > 1) {
        whiteBackgroundRedArrow(btn);
    }
    else {
        btn.classList.add('button-red');
        document.getElementById('arrowWhiteUrgent').classList.add('z-index-1');
        document.getElementById('arrowRedUrgent').classList.add('z-index-n1');
    }
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}
function colorOrange() {
    let btn = document.getElementById('btn_medium');
    if (btn.classList.length > 1) {
        whiteBackgroundOrangeArrow(btn);
    }
    else {
        btn.classList.add('button-orange');
        document.getElementById('arrowWhiteMedium').classList.add('z-index-1');
        document.getElementById('arrowOrangeMedium').classList.add('z-index-n1');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}
function colorGreen() {
    let btn = document.getElementById('btn_low');
    if (btn.classList.length > 1) {
        whiteBackgroundGreenArrow(btn);
    }
    else {
        btn.classList.add('button-green');
        document.getElementById('arrowWhiteLow').classList.add('z-index-1');
        document.getElementById('arrowGreenLow').classList.add('z-index-n1');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
}

function whiteBackgroundRedArrow(btn) {
    btn.classList.remove('button-red');
    document.getElementById('arrowWhiteUrgent').classList.remove('z-index-1');
    document.getElementById('arrowRedUrgent').classList.remove('z-index-n1');
}

function whiteBackgroundOrangeArrow(btn) {
    btn.classList.remove('button-orange');
    document.getElementById('arrowWhiteMedium').classList.remove('z-index-1');
    document.getElementById('arrowOrangeMedium').classList.remove('z-index-n1');
}

function whiteBackgroundGreenArrow(btn) {
    btn.classList.remove('button-green');
    document.getElementById('arrowWhiteLow').classList.remove('z-index-1');
    document.getElementById('arrowGreenLow').classList.remove('z-index-n1');
}

// #endregion region Coloring Buttons Urgent Medium Low

// #region Data from Add Task to Backend
let users = [];

async function init() {
    loadUsers();
}

async function loadUsers() {
    users = JSON.parse(await getItem('users'));
    fillAssignedTo();
}

async function register_mg() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value,
    });

    await setItem('users', JSON.stringify(users));

    fillAssignedTo();
    resetForm();
}

function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}

function fillAssignedTo() {
    for (let i = 0; i < users.length; i++) {
        document.getElementById('selectAssignedTo').innerHTML += /*html*/`
        <option id="option${i}" value=""></option>
    `
        const user = users[i];
        document.getElementById(`option${i}`).innerHTML = user.email;
    }
    
}
// #endregion Data from Add Task to Backend