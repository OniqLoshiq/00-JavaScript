const Cube = require('../models/cube');

class CubeManager {
    create(name, description, imageUrl, difficultyLevel, creatorId, callback) {
        const cube = new Cube({ name, description, imageUrl, difficultyLevel, creatorId });

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

    async edit(cubeId, name, description, imageUrl, difficultyLevel) {
        await Cube.findByIdAndUpdate(cubeId, {
            $set: {
                name,
                description,
                imageUrl,
                difficultyLevel
            },
        });
    }

    async delete(cubeId){
        await Cube.findByIdAndRemove(cubeId);
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

    generateSelectOptions(difficultyLevel){
        return [
            { name: '1 - Very Easy', isSelected: 1 === difficultyLevel },
            { name: '2 - Easy', isSelected: 2 === difficultyLevel },
            { name: '3 - Medium (Standard 3x3)', isSelected: 3 === difficultyLevel },
            { name: '4 - Intermediate', isSelected: 4 === difficultyLevel },
            { name: '5 - Expert', isSelected: 5 === difficultyLevel },
            { name: '6 - Hardcore', isSelected: 6 === difficultyLevel }
        ]
    }
}

module.exports = CubeManager;