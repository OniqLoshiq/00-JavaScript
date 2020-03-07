function create(words) {
   const $content = document.getElementById('content');

   for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      let $newDiv = document.createElement('div');
      let $newP = document.createElement('p');
      $newP.style.display = 'none';
      $newP.textContent = word;

      $content.appendChild($newDiv);
      $newDiv.appendChild($newP);
   }

   $content.addEventListener('click', e => {
      if(e.target.parentNode.id === 'content'){
         e.target.firstElementChild.style.display = 'block';
      }
   });
}