function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu');

    if (contextMenu.classList.contains('topbar-d-none')) {
        contextMenu.classList.remove('topbar-d-none')
    } else (
        contextMenu.classList.add('topbar-d-none')
    )
}