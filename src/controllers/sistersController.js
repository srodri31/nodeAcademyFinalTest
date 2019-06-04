const Sequelize = require("sequelize");
const Sister = require("../models/sister");

function sisterHATEOAS(sister) {
    const { city1, city2 } = sister;
    return {
        city1, city2,
        links: [
            {
                rel: "self",
                href: `/sisters/${city1}/${city2}`
            },
            {
                rel: "city1",
                href: `/cities/${city1}`
            },
            {
                rel: "city2",
                href: `/cities/${city2}`
            }
        ]
    }
}

async function all(req, res, next) {
    try {
        let sisters = await Sister.findAll();
        sisters = sisters.map(sisterHATEOAS);
        res.status(200).send(sisters);
    } catch(err) {
        next(new Error(`Error retrieving sisters cities ${err.message}`));
    }
}

async function sistersOf(req, res, next) {
    try {
        let sisters = await Sister.findAll({
            where: Sequelize.or(
                {city1: req.params.city},
                {city2: req.params.city}
            )
        })
        sisters = sisters.map(sisterHATEOAS);
        res.status(200).send(sisters);
    } catch(err) {
        next(new Error(`Error retrieving sisters cities ${err.message}`));
    }
}

async function createSistersPair(req, res, next) {
    try {
        const { city1, city2 } = req.body;
        let newSisters = {
            city1, city2
        }
        let sister = await Sister.create(newSisters);
        sister = sisterHATEOAS(sister);
        res.status(201).send(sister);
    } catch(err) {
        next(new Error(`Error creating sisters pair ${err.message}`));
    }
}

async function sistersPair(req, res, next) {
    try {
        const { cityA, cityB } = req.params;
        let sister = await Sister.findOne({
            where: Sequelize.or(
                {city1: cityA, city2: cityB},
                {city1: cityB, city2: cityA}
            )
        })
        if(sister) {
            sister = sisterHATEOAS(sister);
            res.status(200).send(sister);
        } else {
            res.status(404).send(`Sisters pair not found for cities ${cityA} and ${cityB}`);
        }
    } catch(err) {
        next(new Error(`Error retrieving sisters pair ${err.message}`));
    }
}

async function updateSistersPair(req, res, next) {
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
        next(new Error(`Error updating sisters pair ${err.message}`));
    }
}

async function deleteSistersPair(req, res, next) {
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
        next(new Error(`Error deleting sisters pair ${err.message}`));
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