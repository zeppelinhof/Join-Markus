async function init() {
    animateJoinLogo();
    loadHTML('formElement', "login.html");
    await loadUsers();
}


function loadHTML(destinationId, fileName) {
    const destinationElement = document.getElementById(destinationId);
    const htmlFilePath = "templates/" + fileName;

    fetch(htmlFilePath)
        .then(response => response.text())
        .then(htmlContent => {
            destinationElement.innerHTML = "";
            destinationElement.innerHTML = htmlContent;
            toggleUiElements(fileName);
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
}


function toggleUiElements(filename) {
    if (filename != 'login.html') {
        document.getElementById('not-a-user-box').classList.add('d-none');
    } else {
        document.getElementById('not-a-user-box').classList.remove('d-none');
    }
}


function updateInputState(element, idToToggle) {
    const password = element;
    if (password.value == "") {
        inputState.setState("empty");
        document.getElementById(idToToggle).src = "assets/img/lock.svg";
        password.type = "password";
    } else {
        inputState.setState("filled");
        if (password.value.length == 1) {
            document.getElementById(idToToggle).src = "assets/img/eye.svg";
        }
    }
    if (document.getElementById('formElement').innerHTML.includes('form_signup')) {
        validateSignUp();
    }
}


class InputState {

    constructor() {
        this.state = "empty";
    }

    setState(newState) {
        if (["empty", "filled"].includes(newState)) {
            this.state = newState;
        } else {
            console.error("Invalid state:", newState);
        }
    }

    getState() {
        return this.state;
    }
}
const inputState = new InputState();


function toggleReveal(img, id) {
    const password = document.getElementById(id);
    if (inputState.getState() == "filled") {
        if (password.type == "password") {
            img.src = "assets/img/eye_close.svg";
            password.type = "text";
        }
        else {
            img.src = "assets/img/eye.svg";
            password.type = "password";
        }
    }
    password.focus();
}


function validateSignUp() {
    const credentials = validatecredentials();
    const match = validatePasswords();
    const consent = document.getElementById('checkboxConsentPolicy').checked;

    if (match && consent && credentials) {
        document.getElementById('btn_signUpUser').classList.remove('invisible');
    } else {
        document.getElementById('btn_signUpUser').classList.add('invisible');
    }
}


function validatecredentials() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    if (username != "" && email != "") {
        return true;
    } else {
        return false;
    }
}


function validatePasswords() {
    const password = document.getElementById('inputPassword2').value;
    const passwordConfirm = document.getElementById('inputPassword3').value;
    if (password === passwordConfirm) {
        document.getElementById('noMatch').classList.add('invisible');
        return true;
    } else {
        document.getElementById('noMatch').classList.remove('invisible');
        return false;
    }
}


function animateJoinLogo() {
    const animationOverlay = document.getElementById("animationOverlay");
    animationOverlay.classList.remove('d-none');
    setTimeout(function () {
        animationOverlay.classList.add('d-none');
    }, 990);
    animateIteration = 1;
}


function successMessage(message) {
    const slideBox = document.getElementById("slideBox");
    slideBox.classList.remove('d-none');
    slideBox.innerHTML = message;
    setTimeout(function () {
        slideBox.classList.add('d-none');
    }, 2750);
}


function resetPassword() {
    successMessage('You reset your password');
}


function forgotPassword() {
    const message = /*html*/ `
        <img src="assets/img/email_send.svg"> An Email has been sent to you
    `;
    successMessage(message);
    document.getElementById('btn_sendMail').classList.add('d-none');
}


function login() {
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const user = users.find(u => u.email == email.value && u.password == password.value);
    const wrongPassword = users.find(u => u.email == email.value && u.password != password.value);
    const warning = document.getElementById("password_warning");
    const passwordTextbox = document.getElementById("inputPassword");
    if (user) {
        warning.classList.add('invisible');
        passwordTextbox.classList.remove('redBorder');
        window.location.href = "summary.html?name=" + encodeURIComponent(user['name']);
    } else if (wrongPassword) {
        warning.classList.remove('invisible');
        passwordTextbox.classList.add('redBorder');
    } else {
        warning.classList.add('invisible');
        passwordTextbox.classList.remove('redBorder');
    }
}


function guest() {
    window.location.href = "summary.html?name=" + encodeURIComponent("Guest");
}