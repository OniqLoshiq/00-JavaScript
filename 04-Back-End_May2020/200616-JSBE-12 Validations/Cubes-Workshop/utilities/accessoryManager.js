const Accessory = require('../models/accessory');
const mongoose = require('mongoose');

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
        const id = mongoose.Types.ObjectId(accId);
        
        await Accessory.findByIdAndUpdate(id, {
            $addToSet: {
              cubes: [cubeId],
            },
          });
    }
}

module.exports = AccessoryManager;