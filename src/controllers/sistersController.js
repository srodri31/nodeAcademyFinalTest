const Sequelize = require("sequelize");
const Joi = require("@hapi/joi");
const { sisterHATEOAS } = require("../utils/HATEOAS");
const { createSchema, updateSchema } = require("../schemas/sisterSchema");

async function all(req, res, next, Sister) {
    try {
        let sisters = await Sister.findAll();
        sisters = sisters.map(sisterHATEOAS);
        res.status(200).send(sisters);
    } catch(err) {
        next(new Error(`Error retrieving sisters cities ${err.message}`));
    }
}

async function sistersOf(req, res, next, Sister) {
    try {
        let sisters = await Sister.findAll({
            where: Sequelize.or(
                {city1: req.params.city},
                {city2: req.params.city}
            )
        })
        if(sisters){
            sisters = sisters.map(sisterHATEOAS);
            res.status(200).send(sisters);
        } else {
            res.status(404).send(`There are no sisters for city ${req.params.city}`)
        }
    } catch(err) {
        next(new Error(`Error retrieving sisters cities ${err.message}`));
    }
}

async function createSistersPair(req, res, next, Sister, City) {
    try {
        const { city1, city2 } = req.body;
        let cityA = await City.findByPk(city1);
        let cityB = await City.findByPk(city2);
        if(cityA && cityB) {
            let newSisters = {
                city1, city2
            }
            const { error: errValidate } = Joi.validate(newSisters, createSchema);
            if(!errValidate) {
                let sister = await Sister.create(newSisters);
                sister = sisterHATEOAS(sister);
                res.status(201).send(sister);
            } else {
                res.status(400).send(`Unable to create sisters pair: ${errValidate.message}`);
            }
        } else {
            res.status(405).send(`Cannot create sisters pair for nonexistent cities`);
        }
    } catch(err) {
        next(new Error(`Error creating sisters pair ${err.message}`));
    }
}

async function sistersPair(req, res, next, Sister) {
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

async function updateSistersPair(req, res, next, Sister, City) {
    try {
        const { cityA, cityB } = req.params;
        const { city1, city2 } = req.body;
        let sisterPair = { city1, city2 };
        const { error: errValidateUpdate } = Joi.validate(sisterPair, updateSchema);
        if(!errValidateUpdate) {
            let updatedRows = await Sister.update( sisterPair, {
                where: Sequelize.or(
                    {city1: cityA, city2: cityB},
                    {city1: cityB, city2: cityA}
                )
            });
            if(updatedRows > 0) {
                res.status(200).send(`Done updating sisters pair`);
            } else {
                let cityA = await City.findByPk(city1);
                let cityB = await City.findByPk(city2);
                if(cityA && cityB) {
                    const { error: errValidate } = Joi.validate(sisterPair, createSchema);
                    if(!errValidate) {
                        let sister = await Sister.create(sisterPair);
                        sister = sisterHATEOAS(sister);
                        res.status(201).send(sister);
                    } else {
                        res.status(400).send(`Unable to create sisters pair: ${errValidate.message}`);
                    }
                } else {
                    res.status(405).send(`Cannot create sisters pair for nonexistent cities`);
                }
            }
        } else {
            res.status(400).send(`Unable to create sisters pair: ${errValidateUpdate.message}`);
        }
    } catch(err) {
        next(new Error(`Error updating sisters pair ${err.message}`));
    }
}

async function deleteSistersPair(req, res, next, Sister) {
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