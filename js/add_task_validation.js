//#region Validation

/**
 * check mandatory fields of Add Task 
 * 
 * @param {string} validatedPage - superior page of calling function
 */
function custValidation(validatedPage) {

    let validLeftSide = true;
    let validRightSide = true;

    validLeftSide = checkFieldsOnLeftSide();
    validRightSide = checkFieldsOnRightSide();

    if (validLeftSide && validRightSide) {
        register_task(validatedPage);
    }
}

/**
 * here are checked the fields title, description and selected-contacts-circles-below
 */
function checkFieldsOnLeftSide() {
    valid = true;
    title = document.getElementById('title');
    if (title.value == '') {
        setRedBorder('title');
        remove_d_none('titleInvalid');
        valid = false;
    }

    description = document.getElementById('description');
    if (description.value == '') {
        setRedBorder('description');
        remove_d_none('descriptionInvalid');
        valid = false;
    }

    selectAssignedTo = document.getElementById('selected-contacts-circles-below');
    if (selectAssignedTo.innerText == '') {
        setRedBorder('selectAssignedTo');
        remove_d_none('selected-contacts-circles-below');
        valid = false;
    }
    return valid;
}

/**
 * here are checked the fields date, Prio, category. Subtask is optional.
 */
function checkFieldsOnRightSide() {
    valid = true;
    date = document.getElementById('date');
    if (date.value == '') {
        setRedBorder('date');
        remove_d_none('dateInvalid');
        valid = false;
    }

    prioStatusAsString = document.getElementById('prioStatusAsString');
    if (prioStatusAsString.innerText == '') {
        setRedBorder('all-buttons-prio');
        remove_d_none('prioInvalid');
        valid = false;
    }

    if (document.getElementById('selected-contacts-circles-below').innerText == '') {
        setRedBorder('selectContactField');
        remove_d_none('assignedToInvalid');
        valid = false;
    }

    category = document.getElementById('selectedCategory');
    if (category.innerText == 'Select task category') {
        setRedBorder('categoryId');
        remove_d_none('categoryInvalid');
        valid = false;
    }
    return valid;
}

/**
 * invalid containers are colored red
 * 
 * @param {string} classname - id of container to color red because it is not valid
 */
function setRedBorder(classname) {
    // unsetBlueBorder(classname);
    classList = document.getElementById(classname).classList;

    if (!classList.contains('redBorder')) {
        classList.add('redBorder');
    }
}

//#endregion Validation