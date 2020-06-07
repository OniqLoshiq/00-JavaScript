const fs = require('fs');
const path = require('path')
const Cube = require('../models/cube');

const databaseFile = path.join(__dirname, '..', 'config/database.json')

class CubeManager {
    create(name, description, imageUrl, difficultyLevel, callback) {
        const cube = new Cube(name, description, imageUrl, difficultyLevel);

        fs.readFile(databaseFile, (err, data) => {
            if (err) {
                console.log(err);
                throw err
            }

            let cubes = JSON.parse(data);
            cubes.push(cube);
            let updatedCubes = JSON.stringify(cubes);

            fs.writeFile(databaseFile, updatedCubes, error => {
                if (error) {
                    console.log(error);
                    throw error
                }

                callback();
            });
        })
    }

    getAll(callback) {
        fs.readFile(databaseFile, (err, data) => {
            if (err) {
                console.log(err);
                throw err
            }

            let cubes = JSON.parse(data);
            callback(cubes);
        })
    }

    getById(id, callback) {
        this.getAll((cubes) => {
            let cube = cubes.find(c => c.id === id);
            callback(cube)
        })
    }

    getByParams(search, from, to, callback) {
        this.getAll((cubes) => {
            const regex = RegExp(search, 'i');
            let result = cubes.filter(c => regex.test(c.name));

            if (!to && from) {
                result = result.filter(c => regex.test(c.name) && c.difficultyLevel >= from);
            } else if (!from && to) {
                result = result.filter(c => regex.test(c.name) && c.difficultyLevel <= to);
            } else if (from && to) {
                result = result.filter(c => regex.test(c.name) && c.difficultyLevel >= from && c.difficultyLevel <= to);
            }

            callback(result)
        })
    }
}

module.exports = CubeManager;