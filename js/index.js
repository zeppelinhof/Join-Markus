async function init() {
    loadHTML('formElement', "login.html");
    loadUsers();
}


function loadHTML(destinationId, fileName) {
    const destinationElement = document.getElementById(destinationId);
    const htmlFilePath = "assets/templates/" + fileName;

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
        document.getElementById(idToToggle).src = "../assets/img/lock.svg";
        password.type = "password";
    } else {
        inputState.setState("filled");
        if (password.value.length == 1) {
            document.getElementById(idToToggle).src = "../assets/img/eye.svg";
        }
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
            img.src = "../assets/img/eye_close.svg";
            password.type = "text";
        }
        else {
            img.src = "../assets/img/eye.svg";
            password.type = "password";
        }
    }
    password.focus();
}


function validateSignUp() {
    const username = document.getElementById('username').value;
    const usermail = document.getElementById('email').value;
    const password = document.getElementById('inputPassword2').value;
    const passwordConfirm = document.getElementById('inputPassword3').value;

    if(password === passwordConfirm) {
        register(username, usermail, password);
    } else {
        alert('password not matching');
    }
}