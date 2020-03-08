function solve(){
   let $tBody = document.querySelector('.minimalistBlack > tbody');

   $tBody.addEventListener('click', changeBackground);

   function changeBackground(e){
      let clickedRow = e.target.parentNode;

      let previousClickedRow = $tBody.querySelector('tr[style="background-color: rgb(65, 63, 94);"]');

      if(previousClickedRow){
         previousClickedRow.style.backgroundColor = "";
      }

      if(previousClickedRow !== clickedRow){
         clickedRow.style.backgroundColor = '#413f5e';
      }
   }
}