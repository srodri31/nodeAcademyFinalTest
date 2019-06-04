const Sequelize = require("sequelize");
const Sister = require("../models/sister");

async function all(req, res) {
    try {
        let sisters = await Sister.findAll();
        res.status(200).send(sisters);
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities "+err.message);
    }
}

async function sistersOf(req, res) {
    try {
        let sisters = await Sister.findAll({
            where: Sequelize.or(
                {city1: req.params.city},
                {city2: req.params.city}
            )
        })
        res.status(200).send(sisters);
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities");
    }
}

async function createSistersPair(req, res) {
    try {
        const { city1, city2 } = req.body;
        let newSisters = {
            city1, city2
        }
        let sister = await Sister.create(newSisters);
        res.status(201).send(sister);
    } catch(err) {
        res.status(500).send("Error creating sisters cities pair");
    }
}

async function sistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        let sister = await Sister.findOne({
            where: Sequelize.or(
                {city1: cityA, city2: cityB},
                {city1: cityB, city2: cityA}
            )
        })
        if(sister) {
            res.status(200).send(sister);
        } else {
            res.status(404).send(`Sisters pair not found for cities ${cityA} and ${cityB}`);
        }
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities pair");
    }
}

async function updateSistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        const { city1, city2 } = req.body;
        let sisterPair = { city1, city2 };
        let updatedRows = await Sister.update( sisterPair, {
            where: Sequelize.or(
                {city1: cityA, city2: cityB},
                {city1: cityB, city2: cityA}
            )
        });
        if(updatedRows > 0) {
            res.status(200).send(`Done updating sisters pair`);
        } else {
            res.status(404).send(`Sisters pair not found for cities ${cityA} and ${cityB}`);
        }
    } catch(err) {
        res.status(500).send("Error uodating sisters cities pair");
    }
}

async function deleteSistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        let deleted = await Sister.destroy({
            where: Sequelize.or(
                {city1: cityA, city2: cityB},
                {city1: cityB, city2: cityA}
            )
        });
        if(deleted) {
            res.status(204).send(`Deleted sisters pair for ${cityA} and ${cityB}`);
        } else {
            res.status(404).send(`Sisters pair not found for cities ${cityA} and ${cityB}`);
        }
    } catch(err) {
        res.status(500).send("Error deleting sisters cities pair");
    }
}

module.exports = {
    all,
    sistersOf,
    sistersPair,
    createSistersPair,
    updateSistersPair,
    deleteSistersPair
}