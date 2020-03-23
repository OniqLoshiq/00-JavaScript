(async () => {
     const elements = {
         cats: document.getElementById('allCats')
     }

     Handlebars.registerPartial('cat', await fetch('./cat-template.hbs').then(r => r.text()));

     let template = Handlebars.compile(await fetch('./cats-template.hbs').then(r => r.text()));

     let html = template({cats});
     elements.cats.innerHTML = html;

     let btns = document.querySelectorAll('button.showBtn');

     btns.forEach(b => b.addEventListener('click', () => {
         let info = b.nextElementSibling;
         info.style.display = info.style.display === 'none' ? 'block' : 'none';
     }));
})()
