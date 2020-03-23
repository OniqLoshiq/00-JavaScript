import { monkeys } from './monkeys.js'

(async () => {
    const divMonkeys = document.querySelector('.monkeys');
    let template = Handlebars.compile(await fetch('./monkeys-template.hbs').then(r => r.text()));
    let html = template({monkeys});
    divMonkeys.innerHTML = html;

    let btns = document.querySelectorAll('button');

    btns.forEach(b => b.addEventListener('click', () => {
        let info = b.nextElementSibling;
        info.style.display = info.style.display === 'none' ? 'block' : 'none';
    }));
})()