function attachEventsListeners() {
    const $fromNum = document.getElementById('inputDistance');
    const $toNum = document.getElementById('outputDistance');

    document.getElementById('convert').addEventListener('click', handler);

    function handler(){
        let optionFrom = document.getElementById('inputUnits').value;
        let optionTo = document.getElementById('outputUnits').value;
        let inputNum = Number($fromNum.value);

        let inputNumToMeters = inputNum * distancesMapToMeter[optionFrom];
        let outputNum = inputNumToMeters / distancesMapToMeter[optionTo];

        $toNum.value = outputNum;
    }

    const distancesMapToMeter = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    };
}