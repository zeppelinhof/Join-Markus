function getLetterHeadlineHTML(firstLetter) {
    return /*html*/`
        <span class="contacts-letter-headline">${firstLetter}</span>
        <div class="contacts-separator"></div>
    `;
}


function getContactCardHTML(colorStyle, firstLetters, name, email) {
    return /*html*/`
        <div class="contact-card">
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