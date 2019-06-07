const { countryHATEOAS } = require("../utils/HATEOAS");

async function all(req, res, next, Country) {
    try {
        let countries = await Country.findAll();
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
                res.status(204).send("Done destroying country");
            } else {
                res.status(404).send(`Unable to destroy country: Country not found`);
            }
        } else {
            res.status(405).send(`Country with regions can not be deleted`);
        }
    } catch (err) {
        next(new Error(`Unable to destroy country: ${err.message}`));
    }
}

async function updateCreateCountry(req, res, next, Country) {    
    try {
        let country, status;
        let toUpdateCountry = {
            name: req.body.name
        }
        let updated = await Country.update(toUpdateCountry, {
            where: {
                code: req.params.country 
            }
        });
        if(updated > 0) {
            country = await Country.findByPk(req.params.country);
            status = 200;
        } else {
            let newCountry = {
                code: req.params.country,
                name: req.body.name
            }
            country = await Country.create(newCountry);
            status = 201;
        }
        country = countryHATEOAS(country);
        res.status(status).send(country);
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