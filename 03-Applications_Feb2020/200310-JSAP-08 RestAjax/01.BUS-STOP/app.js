function getInfo() {
    let $stopId = document.querySelector('#stopId');
    let $stopName = document.querySelector('#stopName');
    let $buses = document.querySelector('#buses');

    let url = `https://judgetests.firebaseio.com/businfo/${$stopId.value}.json`;
    

    fetch(url)
    .then(res => res.json())
    .then(data => {
        $stopName.textContent = '';
        $buses.innerHTML = '';
        $stopName.textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            let liElem = document.createElement('li');
            liElem.textContent = `Bus ${busId} arrives in ${time}`;
            $buses.appendChild(liElem);
        })
    })
    .catch(err => $stopName.textContent = 'Error');
}