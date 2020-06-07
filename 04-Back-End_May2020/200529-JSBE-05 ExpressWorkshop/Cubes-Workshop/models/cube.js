const { v4: uuidv4 } = require('uuid');

class Cube {
    constructor(name, description, imageUrl, difficultyLevel){
        this.id = uuidv4();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }
}

module.exports = Cube
