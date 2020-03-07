function notify(message) {
    const $notifiactionDiv = document.getElementById('notification');
    $notifiactionDiv.textContent = message;
    $notifiactionDiv.style.display = 'block';

    setTimeout(function () {
        $notifiactionDiv.style.display = 'none';
    }, 2000);
}