const Cube = require('../models/cube');

class CubeManager {
    create(name, description, imageUrl, difficultyLevel, callback) {
        const cube = new Cube({ name, description, imageUrl, difficultyLevel });

        cube.save(callback);
    }

    async getAll() {
        const cubes = await Cube.find({}).lean();
        return cubes
    }

    async getById(id) {
        const cube = await Cube.findById(id)
            .populate('accessories').lean();
        return cube;
    }

    async addAccessory(cubeId, accId) {
        await Cube.findByIdAndUpdate(cubeId, {
            $addToSet: {
                accessories: [accId],
            },
        });
    }

    async getByParams(search, from, to) {
        const regex = RegExp(search, 'i');
        let result = Cube.find({ name: { $regex: regex } });

        if (!to && from) {
            result = result.where('difficultyLevel').gte(from);
        } else if (!from && to) {
            result = result.where('difficultyLevel').lte(to);
        } else if (from && to) {
            result = result.where('difficultyLevel').gte(from).lte(to);
        }

        return await result.lean().exec();
    }
}

module.exports = CubeManager;