const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const dbBreeds = require('../data/breeds');
const dbCats = require('../data/cats');

function generateGetResponse(filePath, res, obj) {
    const readStream = fs.createReadStream(filePath);

    readStream.on('data', (data) => {
        let catBreedPlaceholder = dbBreeds.map(b => {
            if (obj && obj.breed === b) {
                return `<option selected="selected" value="${b}">${b}</option>`
            } else {
                return `<option value="${b}">${b}</option>`
            }
        });

        let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder.join(''));

        if (obj) {
            modifiedData = modifiedData.replace(/{{id}}/gm, obj.id);
            modifiedData = modifiedData.replace(/{{image}}/gm, '../../content/images/' + obj.image);
            modifiedData = modifiedData.replace(/{{name}}/gm, obj.name);
            modifiedData = modifiedData.replace(/{{description}}/gm, obj.description);
        }

        res.write(modifiedData);
    });

    readStream.on('end', () => {
        res.end();
    });

    readStream.on('error', (err) => {
        console.log(err);
    });
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        generateGetResponse(filePath, res);
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        generateGetResponse(filePath, res);
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, error => {
                    if (error) {
                        console.log(error);
                        throw error
                    }
                });

                res.writeHead(302, { location: '/' });
                res.end();
            })
        })
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                throw err
            }

            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload.name));

            fs.rename(oldPath, newPath, (error) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.log('File was uploaded successfully!')
            })

            fs.readFile('./data/cats.json', 'utf-8', (error, data) => {
                if (error) {
                    console.log(error);
                    throw error;
                }

                let allCats = JSON.parse(data);
                let id = allCats.length === 0 ? 1 : allCats[allCats.length - 1].id + 1;
                allCats.push({ id, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, errorMsg => {
                    if (errorMsg) {
                        console.log(errorMsg);
                        throw errorMsg
                    }
                    res.writeHead(302, { location: '/' });
                    res.end();
                })
            })
        })
    } else if (pathname.includes('/cats/edit') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/editCat.html')
        );

        const catId = pathname.substring(pathname.lastIndexOf('/') + 1);
        const cat = dbCats.find(c => c.id == catId);

        if (!cat) {
            console.log("Cat not found");
            res.writeHead(302, { location: '/' });
            res.end();
            return;
        }

        generateGetResponse(filePath, res, cat);
    } else if (pathname.includes('/cats/find-new-home') && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/catShelter.html')
        );

        const catId = pathname.substring(pathname.lastIndexOf('/') + 1);
        const cat = dbCats.find(c => c.id == catId);

        if (!cat) {
            console.log("Cat not found");
            res.writeHead(302, { location: '/' });
            res.end();
            return;
        }

        generateGetResponse(filePath, res, cat);
    } else if (pathname.includes('/cats/edit') && req.method === 'POST') {
        const catId = pathname.substring(pathname.lastIndexOf('/') + 1);
        const cat = dbCats.find(c => c.id == catId);

        if (!cat) {
            console.log("Cat not found");
            res.writeHead(302, { location: '/' });
            res.end();
            return;
        }

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                throw err
            }

            if (files.upload.size) {
                let oldPath = files.upload.path;
                let newPath = path.normalize(path.join(__dirname, '../content/images/' + files.upload.name));

                fs.rename(oldPath, newPath, (error) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }

                    console.log('File was uploaded successfully!')
                })

                cat.image = files.upload.name;
            }

            const updatedCat = { ...cat, ...fields };

            fs.readFile('./data/cats.json', 'utf-8', (error, data) => {
                if (error) {
                    console.log(error);
                    throw error;
                }

                let allCats = JSON.parse(data);
                let catIndex = allCats.findIndex(c => c.id == updatedCat.id);
                allCats[catIndex] = updatedCat;
                let json = JSON.stringify(allCats);

                fs.writeFile('./data/cats.json', json, errorMsg => {
                    if (errorMsg) {
                        console.log(errorMsg);
                        throw errorMsg
                    }
                    res.writeHead(302, { location: '/' });
                    res.end();
                })
            })
        })
    } else if (pathname.includes('/cats/find-new-home') && req.method === 'POST') {
        const catId = pathname.substring(pathname.lastIndexOf('/') + 1);
        const cat = dbCats.find(c => c.id == catId);

        if (!cat) {
            console.log("Cat not found");
            res.writeHead(302, { location: '/' });
            res.end();
            return;
        }

        fs.unlink('./content/images/' + cat.image, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        });

        fs.readFile('./data/cats.json', 'utf-8', (error, data) => {
            if (error) {
                console.log(error);
                throw error;
            }

            let allCats = JSON.parse(data);
            let updatedCats = allCats.filter(c => c.id != cat.id);
            let json = JSON.stringify(updatedCats);



            fs.writeFile('./data/cats.json', json, errorMsg => {
                if (errorMsg) {
                    console.log(errorMsg);
                    throw errorMsg
                }

                res.writeHead(302, { location: '/' });
                res.end();
            })
        })
    } else if (pathname === '/search' && req.method === "POST") {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);
            const regex = RegExp(body.name, 'i');
        
            let result = dbCats.filter(c => regex.test(c.name));

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
    
                let catsToRender = result.map(c => `<li>
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
        })
    } else {
        return true;
    }
}