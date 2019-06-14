const Joi = require("@hapi/joi");
const { countryHATEOAS } = require("../utils/HATEOAS");
const { createSchema, updateSchema } = require("../schemas/countrySchema");
const { Op } = require("sequelize");

async function all(req, res, next, Country) {
    try {
        let options;
        if(req.query.name) {
            options = {
                where: { name: { [Op.like]: `%${req.query.name}%`} }
            }
        }
        let countries = await Country.findAll(options);
        let result = countries.map(countryHATEOAS)
        return res.status(200).send(result);
    } catch (e) {
        next(new Error(`Unable to retrieve countries: ${e.message}`));
    }
}

async function getCountry(req, res, next, Country) {
    try {
        let result = await Country.findByPk(req.params.country);
        if(result) {
            let country = countryHATEOAS(result);
            res.status(200).send(country);
        } else {
            res.status(404).send("Country not found");
        }
    } catch(e) {
        next(new Error(`Unable to retrieve country: ${e.message}`));
    }
}

async function deleteCountry(req, res, next, Country, Region) {
    try {
        let regions = await Region.findOne({
            where: {
                country: req.params.country
            }
        })
        if(!regions){
            let deleted = await Country.destroy({
                where: {
                    code: req.params.country 
                }
            });
            if(deleted) {
                res.status(204).send({message: "Done destroying country"});
            } else {
                res.status(404).send({message: `Unable to destroy country: Country not found`});
            }
        } else {
            res.status(405).send({message:`Country with regions can not be deleted`});
        }
    } catch (err) {
        next(new Error(`Unable to destroy country: ${err.message}`));
    }
}

async function updateCreateCountry(req, res, next, Country) {    
    try {
        let country;
        let toUpdateCountry = {
            name: req.body.name
        }
        const validatedUpdate = Joi.validate(toUpdateCountry, updateSchema);
        if(!validatedUpdate.error) {
            let updated = await Country.update(toUpdateCountry, {
                where: {
                    code: req.params.country 
                }
            });
            if(updated > 0) {
                country = await Country.findByPk(req.params.country);
                country = countryHATEOAS(country);
                res.status(200).send(country);
            } else {
                let newCountry = {
                    code: req.params.country,
                    name: req.body.name
                }
                const validatedCreate = Joi.validate(newCountry, createSchema);
                if(!validatedCreate.error) {
                    country = await Country.create(newCountry);
                    country = countryHATEOAS(country);
                    res.status(201).send(country);
                } else {
                    res.status(400).send(`Unable to create country: ${validatedCreate.error.message}`);
                }
            }
        } else {
            res.status(400).send(`Unable to update country: ${validatedUpdate.error.message}`);
        }
    } catch(err) {
        next(new Error(`Unable to update country: ${err.message}`));
    }
}


module.exports = {
    all,
    getCountry,
    deleteCountry,
    updateCreateCountry
}