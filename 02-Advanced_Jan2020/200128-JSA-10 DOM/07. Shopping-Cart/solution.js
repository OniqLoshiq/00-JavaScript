function solve() {
   const shoppingCart = { totalPrice: 0 };

   let textOutput = document.getElementsByTagName('textarea')[0];

   let handler = e => {
      if (e.target.className === 'add-product') {
         let productElement = e.target.parentElement.parentElement;
         let productName = productElement.querySelector('.product-title').textContent;
         let productPriceAsString = productElement.querySelector('.product-line-price').textContent;

         if (!shoppingCart[productName]) {
            shoppingCart[productName] = +productPriceAsString;
         }

         shoppingCart.totalPrice += +productPriceAsString;

         textOutput.textContent += `Added ${productName} for ${productPriceAsString} to the cart.\n`;
      } else if (e.target.className === 'checkout') {
         let allButtons = Array.from(document.getElementsByTagName('button')).forEach(b => b.disabled = true)
         let boughtProductNames = Object.keys(shoppingCart).filter(k => k !== 'totalPrice');

         let productsString = boughtProductNames.join(', ');

         textOutput.textContent += `You bought ${productsString} for ${shoppingCart.totalPrice.toFixed(2)}.`;

         document.getElementsByClassName('shopping-cart')[0].removeEventListener('click', handler);
      }
   }

   document.getElementsByClassName('shopping-cart')[0].addEventListener('click', handler);
}