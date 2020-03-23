(() => {
    const elements = {
        input: document.getElementById('towns'),
        loadBtn: document.getElementById('btnLoadTowns'),
        towns: document.getElementById('root')
    }

    elements.loadBtn.addEventListener('click', loadTowns);

    async function loadTowns(){
        let towns = elements.input.value.split(',').map(t => t.trim());
        let template = Handlebars.compile(await fetch('./towns-template.hbs').then(r => r.text()));
        let html = template({towns});

        elements.towns.innerHTML = html;
        elements.input.value = "";
    }
})();