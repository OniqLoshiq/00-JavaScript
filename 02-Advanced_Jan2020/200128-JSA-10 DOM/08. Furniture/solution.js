function solve() {
  let generateButton = document.getElementsByTagName('button')[0];

  generateButton.addEventListener('click', e => {
    let furnitureJSONstring = document.getElementsByTagName('textarea')[0].value;

    let furnitureObjs = JSON.parse(furnitureJSONstring);

    for (let i = 0; i < furnitureObjs.length; i++) {
      const element = furnitureObjs[i];

      let table = document.getElementsByTagName('tbody')[0];
      let newRow = table.firstElementChild.cloneNode(true);

      newRow.firstElementChild.querySelector('img').setAttribute('src', element.img);

      //For some SoftUni judge test to remove white spaces
      newRow.firstElementChild.innerHTML = newRow.firstElementChild.innerHTML.trim();

      //This works perfect but cloning is copying also the html prettifier with the empty spaces and judge doesn't like that in the tests
      // --------------------
      // let propertiesToCreate = newRow.getElementsByTagName('p');
      // propertiesToCreate[0].textContent = element.name;
      // propertiesToCreate[1].textContent = element.price;
      // propertiesToCreate[2].textContent = element.decFactor;

      // newRow.getElementsByTagName('input')[0].disabled = false;

      let propertiesToCreate = newRow.getElementsByTagName('td');
      propertiesToCreate[1].innerHTML = '<p>' + element.name + '</p>';
      propertiesToCreate[2].innerHTML = '<p>' + element.price + '</p>';
      propertiesToCreate[3].innerHTML = '<p>' + element.decFactor + '</p>';
      propertiesToCreate[4].innerHTML = '<input type="checkbox" />';

      table.appendChild(newRow);
    }
  })

  let buyButton = document.getElementsByTagName('button')[1];

  buyButton.addEventListener('click', e => {
    let allCheckedElements = Array.from(document.querySelectorAll("input[type='checkbox']")).filter(ch => ch.checked);

    let furnitureNames = [];
    let totalPrice = 0;
    let sumDecorationFactor = 0;

    for (let i = 0; i < allCheckedElements.length; i++) {
      const row = allCheckedElements[i].parentElement.parentElement;
      let rowData = row.getElementsByTagName('p');

      furnitureNames.push(rowData[0].textContent);
      totalPrice += +rowData[1].textContent;
      sumDecorationFactor += +rowData[2].textContent;
    }

    let outputData = [
      `Bought furniture: ${furnitureNames.join(', ')}`,
      `Total price: ${totalPrice.toFixed(2)}`,
      `Average decoration factor: ${sumDecorationFactor / allCheckedElements.length}`
    ]

    let outputTextArea = document.getElementsByTagName('textarea')[1];
    outputTextArea.value = outputData.join('\n');
  })
}