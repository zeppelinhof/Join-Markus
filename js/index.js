function init() {
    loadHTML('formElement', "login.html");
}


function loadHTML(destinationId, fileName) {
    const destinationElement = document.getElementById(destinationId);
    const htmlFilePath = "assets/templates/" + fileName;

    fetch(htmlFilePath)
        .then(response => response.text())
        .then(htmlContent => {
            destinationElement.innerHTML = "";
            destinationElement.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Error loading HTML file:", error);
        });
}


function forgotPassword() {
    loadHTML('formElement', "forgotPassword.html");
}

function toggleRememberMe() {
    const checkBox_empty = document.getElementById("checkBox_empty");
    const checkBox_cutted = document.getElementById("checkBox_cutted");
    const checkBox_mark = document.getElementById("checkBox_mark");

    if (checkBox_empty.classList.length == 0) {
        checkBox_empty.classList.add('d-none');
        checkBox_cutted.classList.remove('d-none');
        checkBox_mark.classList.remove('d-none');
    } else {
        checkBox_empty.classList.remove('d-none');
        checkBox_cutted.classList.add('d-none');
        checkBox_mark.classList.add('d-none');
    }
}


// document.addEventListener("DOMContentLoaded", function () {
//     const inputElement = document.getElementById("inputPassword");

//     inputElement.addEventListener("input", function (event) {
//         const inputValue = event.target.value;
//         const btn = document.getElementById("btn_reveal");
//         if (btn.src == "assets/img/eye.svg") {
//             btn.src = "assets/img/eye_close.svg";
//             input.type = "password";
//         } else {
//             btn.src = "assets/img/eye.svg";
//             input.type = "text";
//         }
//     });
// });


class InputState {
    constructor() {
        this.state = "normal";
    }

    setState(newState) {
        if (["normal", "focused", "disabled", "error"].includes(newState)) {
            this.state = newState;
        } else {
            console.error("Invalid state:", newState);
        }
    }

    getState() {
        return this.state;
    }
}

const myInput = new InputState();
console.log(myInput.getState()); // Ausgabe: "normal"

myInput.setState("focused");
console.log(myInput.getState()); // Ausgabe: "focused"

myInput.setState("invalidState"); // Ausgabe: "Invalid state: invalidState"
console.log(myInput.getState()); // Ausgabe: "focused" (unverändert)
