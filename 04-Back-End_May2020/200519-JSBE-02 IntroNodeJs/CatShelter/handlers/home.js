const url = require('url');
const fs = require('fs');
const path = require('path');
const dbCats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not Found');
                res.end();
                return;
            }

            let catsToRender = dbCats.map(c => `<li>
            <img src="${path.join('./content/images/' + c.image)}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p><span>Breed: </span>${c.breed}</p>
            <p><span>Description: </span>${c.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats/edit/${c.id}">Change Info</a></li>
                <li class="btn delete"><a href="/cats/find-new-home/${c.id}">New Home</a></li>
            </ul>
        </li>`);

            let modifiedData = data.toString().replace('{{cats}}', catsToRender.join(''));

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(modifiedData);
            res.end();
        })
    } else {
        return true;
    }
}