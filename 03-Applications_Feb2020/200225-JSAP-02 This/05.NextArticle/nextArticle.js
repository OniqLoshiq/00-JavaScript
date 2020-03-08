function getArticleGenerator(articles) {
    let $divArticles = document.getElementById('content');
    let currentArticle = 0;

    return function() {
        if (currentArticle < articles.length) {
            let divArticle = document.createElement('article');
            divArticle.textContent = articles[currentArticle++];
            $divArticles.appendChild(divArticle);
        }
    }
}