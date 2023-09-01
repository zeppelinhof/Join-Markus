const STORAGE_TOKEN = 'GKAE3MZGHV4QZFBPDA8OOMCEAC9OBJHNPSJXA670';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

async function updateItem(database, index, newValue) {
    let allItems = JSON.parse(await getItem(database));

    if (index >= 0 && index < allItems.length) {
        allItems[index] = newValue;
        await setItem(database, JSON.stringify(allItems));
    } else {
        console.log(database + "nicht aktualisiert!");
    }
}

async function deleteItem(database, indexToDelete) {
    let allItems = JSON.parse(await getItem(database));

    if (indexToDelete >= 0 && indexToDelete < allItems.length) {
        // Löschen Sie den Eintrag anhand des Index.
        allItems.splice(indexToDelete, 1);
        await setItem(database, JSON.stringify(allItems));
    } else {
        console.log(database + " nicht gelöscht!");
    }
}
