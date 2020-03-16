function solve() {
    let $info = document.querySelector('.info');
    let $departBtn = document.querySelector('#depart');
    let $arriveBtn = document.querySelector('#arrive');
    let currStopId = 'depot';
    let currStopName = 'Depot';
        
    function depart() {
        enableDisableButtons();

        fetch(`https://judgetests.firebaseio.com/schedule/${currStopId}.json `)
        .then(res => res.json())
        .then(data => {
            currStopId = data.next;
            currStopName = data.name;
            $info.textContent = `Next stop ${currStopName}`
        });
    }

    function arrive() {
       enableDisableButtons();
       $info.textContent = `Arriving at ${currStopName}`;
    }

    function enableDisableButtons(){
        if($departBtn.disabled){
            $departBtn.disabled = false;
            $arriveBtn.disabled = true;
        } else {
            $departBtn.disabled = true;
            $arriveBtn.disabled = false;
        } 
    }

    return {
        depart,
        arrive
    };
}

let result = solve();