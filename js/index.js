function forgotPassword() {
    //tbd
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