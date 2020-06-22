const Accessory = require('../models/accessory');

class AccessoryManager {
    create(name, description, imageUrl, callback) {
        const accessory = new Accessory({name, description, imageUrl});

        accessory.save(callback);
    }

    async getAll(){
        const accessories = await Accessory.find({}).lean();
        return accessories
    }

    async addCube(accId, cubeId){
        await Accessory.findByIdAndUpdate(accId, {
            $addToSet: {
              cubes: [cubeId],
            },
          });
    }
}

module.exports = AccessoryManager;