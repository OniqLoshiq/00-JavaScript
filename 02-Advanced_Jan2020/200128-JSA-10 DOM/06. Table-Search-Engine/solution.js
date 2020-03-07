function solve() {
   let btn = document.getElementById('searchBtn');

   btn.addEventListener('click', e => {
      let serachValue = document.getElementById('searchField').value;
      Array.from(document.getElementsByClassName('select')).forEach(el => {
         el.classList.remove('select')
      });

      let rows = document.getElementsByTagName('tbody')[0].children;

      for (let i = 0; i < rows.length; i++) {
         const element = rows[i].textContent;

         if(element.includes(serachValue)){
            rows[i].classList.add('select')
         }
      }

      document.getElementById('searchField').value = "";
   })
}