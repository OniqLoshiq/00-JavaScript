function solve() {
   let playerOneCard = 0;
   let playerOneCardNode;
   let playerTwoCard = 0;
   let playerTwoCardNode;

   let cards = document.getElementsByClassName('cards')[0];

   cards.addEventListener('click', e => {
      if(e.target.tagName === 'IMG'){
         let resultElement = document.getElementById('result');

         if(e.target.parentNode.id === 'player1Div'){
            playerOneCardNode = e.target;
            playerOneCard = Number(playerOneCardNode.getAttribute('name'));
            playerOneCardNode.setAttribute('src', 'images/whiteCard.jpg');
            resultElement.firstElementChild.textContent = playerOneCard;
         } else {
            playerTwoCardNode = e.target;
            playerTwoCard = Number(playerTwoCardNode.getAttribute('name'));
            playerTwoCardNode.setAttribute('src', 'images/whiteCard.jpg');
            resultElement.lastElementChild.textContent = playerTwoCard;
         }

         if(playerOneCard !== 0 && playerTwoCard !== 0){
            if(playerOneCard > playerTwoCard){
               setWinnerLoserCards(playerOneCardNode, playerTwoCardNode, false);
            } else if(playerOneCard < playerTwoCard){
               setWinnerLoserCards(playerTwoCardNode, playerOneCardNode, false);
            } else {
               setWinnerLoserCards(playerOneCardNode, playerTwoCardNode, true);
            }

            let historyLog = `[${playerOneCard} vs ${playerTwoCard}] `;

            let history = document.getElementById('history');
            history.textContent += historyLog;

            playerOneCard = 0;
            playerTwoCard = 0;

            resultElement.firstElementChild.textContent = "";
            resultElement.lastElementChild.textContent = "";
         }
      }
   });

   function setWinnerLoserCards(winnerCard, loserCard, isDraw){
      winnerCard.style = 'border: 2px solid green';
      loserCard.style = isDraw ? 'border: 2px solid green' : 'border: 2px solid red';
   }
}