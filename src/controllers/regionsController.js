const Joi = require("@hapi/joi");
const { regionHATEOAS } = require("../utils/HATEOAS");
const { createSchema, updateSchema } = require("../schemas/regionSchema");

async function all(req, res, next, Region) {
    try {
        let regions = await Region.findAll();
        regions = regions.map(regionHATEOAS);
        res.status(200).send(regions);
    } catch(err) {
        next(new Error(`Error retrieving regions ${err.message}`));
    }
}

async function allByCountry(req, res, next, Region) {
    try {
        let regions = await Region.findAll({
            where: {
                country: req.params.country
            }
        })
        if(regions){
            regions = regions.map(regionHATEOAS);
            res.status(200).send(regions);
        } else {
            res.status(404).send(`No regions found for ${req.params.country}`);
        }
    } catch(err) {
        next(new Error(`Error retrieving regions ${err.message}`));
    }
}

async function getRegion(req, res, next, Region) {
    try {
        let region = await Region.findByPk(req.params.region);
        if(region) {
            region = regionHATEOAS(region);
            res.status(200).send(region);
        } else {
            res.status(404).send(`No region found with code ${req.params.region}`);
        }
    } catch(err) {
        next(new Error(`Error retrieving region ${err.message}`));
    }
}

async function deleteRegion(req, res, next, Region, City) {
    try {
        const { country, region } = req.params;
        let cities = await City.findOne({
            where: { country, region }
        })
        if(!cities) {
            let deleted = await Region.destroy({
                where: {
                    code: req.params.region
                }
            });
            if(deleted) {
                res.status(204).send(`deleted region with code ${req.params.region}`);
            } else {
                res.status(404).send(`No region found with code ${req.params.region}`);
            }
        } else {
            res.status(405).send("Cannot delete region with associated cities");
        }
    } catch(err) {
        next(new Error(`Error deleting region: ${err.message}`));
    }
}

async function createRegion(req, res, next, Region, Country) {
    try {
        let country = await Country.findByPk(req.params.country);
        if(country) {
            let newRegion = {
                code: req.body.code,
                name: req.body.name,
                country: req.params.country
            }
            const validated = Joi.validate(newRegion, createSchema);
            if(!validated.error) {
                let region = await Region.create(newRegion);
                region = regionHATEOAS(region);
                res.status(201).send(region);
            } else {
                res.status(400).send(`Unable to create region: ${validated.error.message}`);
            }
        } else {
            res.status(405).send("Cannot create region for non existent country");
        }
    } catch(err) {
        next(new Error(`Error creating region: ${err.message}`));
    }
}

async function updateRegion(req, res, next, Region, Country) {
    try {
        let region = {
            name: req.body.name,
            country: req.params.country
        }
        const validatedUpdate = Joi.validate(region, updateSchema);
        if(!validatedUpdate.error) {
            let updatedRows = await Region.update(region, {
                where: {
                    code: req.params.region
                }
            })
            if(updatedRows > 0) {
                region = await Region.findByPk(req.params.region);
                region = regionHATEOAS(region);
                res.status(200).send(region);
            } else {
                let country = await Country.findByPk(req.params.country);
                if(country) {
                    let newRegion = {
                        code: req.params.region,
                        ...region
                    }
                    const validatedCreate = Joi.validate(newRegion, createSchema);
                    if(!validatedCreate.error) {
                        let region = await Region.create(newRegion);
                        region = regionHATEOAS(region);
                        res.status(201).send(region);
                    } else {
                        res.status(400).send(`Unable to create region: ${validatedCreate.error.message}`);
                    }
                } else {
                    res.status(405).send("Cannot create region for non existent country");
                }
            }
        } else {
            res.status(400).send(`Unable to update region: ${validatedUpdate.error.message}`);
        }
    } catch(err) {
        next(new Error(`Error updating or creating region ${err.message}`));
    }
}


module.exports = {
    all,
    allByCountry,
    getRegion,
    deleteRegion,
    createRegion,
    updateRegion
}