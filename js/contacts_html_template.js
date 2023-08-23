function getLetterHeadlineHTML(firstLetter) {
    return /*html*/`
        <span class="contacts-letter-headline">${firstLetter}</span>
        <div class="contacts-separator"></div>
    `;
}


function getContactCardHTML(i, colorStyle, firstLetters, name, email) {
    return /*html*/`
        <div class="contact-card" onclick="openContactData(${i})" id='contactCard-${i}'>
            <div class="contact-icon" style="background-color: ${colorStyle}">
                <span>${firstLetters}</span>
            </div>
            <div class="contact">
                <span class="contact-name">${name}</span>
                <spa class="contact-email">${email}</span>
            </div>
        </div>
    `;
}