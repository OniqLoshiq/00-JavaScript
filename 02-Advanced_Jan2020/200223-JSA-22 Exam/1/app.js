function solve() {
   let $formFields = document.querySelectorAll('form p :nth-child(2)');
   let $btnCreate = document.querySelector('form button');
   let $articlesSection = document.querySelector('main section');
   let $articleArchiveList = document.querySelector('.archive-section > ul');

   $btnCreate.addEventListener('click', createArticle);

   function createArticle(e){
      e.preventDefault();
      let creator = $formFields[0].value;
      let title = $formFields[1].value;
      let category = $formFields[2].value;
      let content = $formFields[3].value;

      let articleEl = createElement('article');
      let h1El = createElement('h1', null, title);

      let pCategory = createElement('p', null, 'Category:');
      let pCategoryStrong = createElement('strong', null, category);
      appendChildren(pCategory, [pCategoryStrong]);

      let pCreator = createElement('p', null, 'Creator:');
      let pCreatorStrong = createElement('strong', null, creator);
      appendChildren(pCreator, [pCreatorStrong]);

      let pContent = createElement('p', null, content);

      let divBtns = createElement('div', ['buttons']);
      let btnDelete = createElement('button', ['btn', 'delete'], 'Delete', {type: 'click', handler: deleteArticle});
      let btnArchive = createElement('button', ['btn', 'archive'], 'Archive', {type: 'click', handler: archiveArticle});
      appendChildren(divBtns, [btnDelete, btnArchive]);

      appendChildren(articleEl, [h1El, pCategory, pCreator, pContent, divBtns]);
      appendChildren($articlesSection, [articleEl]);
   }

   function deleteArticle(e){
      let articleEl = e.target.parentNode.parentNode;
      articleEl.remove();
   }

   function archiveArticle(e){
      let articleEl = e.target.parentNode.parentNode;
      let articleTitle = articleEl.querySelector('h1').textContent;

      articleEl.remove();

      let liArticleArchive = createElement('li', null, articleTitle);
      let allArchivedArticles = $articleArchiveList.querySelectorAll('li');

      let updatedArchivedArticles = Array.from(allArchivedArticles);
      updatedArchivedArticles.push(liArticleArchive);
      updatedArchivedArticles.sort((a, b) => a.textContent.localeCompare(b.textContent));
      
      $articleArchiveList.innerHTML = "";
      appendChildren($articleArchiveList, updatedArchivedArticles);
   }

   function createElement(htmlElement, classNameArray, textValue, event){
      let element = document.createElement(htmlElement);

      if(classNameArray){
         classNameArray.forEach(c => element.classList.add(c));
      }

      if(textValue){
         element.textContent = textValue;
      }

      if(event){
         element.addEventListener(event.type, event.handler);
      }

      return element;
   }

   function appendChildren(parentElement, childrenArray){
      childrenArray.forEach(c => parentElement.appendChild(c));
   }
}