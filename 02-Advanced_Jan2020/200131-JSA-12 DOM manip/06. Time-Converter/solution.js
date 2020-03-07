function attachEventsListeners() {
    document.getElementById('daysBtn').addEventListener('click', daysHandler);
    document.getElementById('hoursBtn').addEventListener('click', hoursHandler);
    document.getElementById('minutesBtn').addEventListener('click', minutessHandler);
    document.getElementById('secondsBtn').addEventListener('click', secondsHandler);

    let days = document.getElementById('days');
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    function daysHandler() {
        hours.value = +days.value * 24;
        minutes.value = +hours.value * 60;
        seconds.value = +minutes.value * 60;
    }

    function hoursHandler() {
        days.value = +hours.value / 24;
        minutes.value = +hours.value * 60;
        seconds.value = +minutes.value * 60;
    }

    function minutessHandler() {
        seconds.value = +minutes.value * 60;
        hours.value = +minutes.value / 60;
        days.value = +hours.value / 24;
       
    }

    function secondsHandler() { 
        minutes.value = +seconds.value / 60;
        hours.value = +minutes.value / 60;
        days.value = +hours.value / 24;
    }
}