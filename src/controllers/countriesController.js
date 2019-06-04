const Country = require("../models/country");

function countryHATEOAS(country) {
    const { code, name } = country;
    return {
        code,
        name,
        links: [
            {
                rel: "self",
                href: `/countries/${code}`
            },
            {
                rel: "regions",
                href: `/regions/${code}`
            },
            {
                rel: "cities",
                href: `/cities/?country=${code}`
            }
        ]
    }
}

async function all(req, res, next) {
    try {
        let countries = await Country.findAll();
        let result = countries.map(countryHATEOAS)
        return res.status(200).send(result);
    } catch (e) {
        next(new Error(`Unable to retrieve countries: ${e.message}`));
    }
}

async function getCountry(req, res, next) {
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

async function deleteCountry(req, res, next) {
    try {
        let deleted = await Country.destroy({
            where: {
                code: req.params.country 
            }
        });
        if(deleted) {
            res.status(200).send("Done destroying country");
        } else {
            res.status(404).send(`Unable to destroy country: Country not found`);
        }
    } catch (err) {
        next(new Error(`Unable to destroy country: ${err.message}`));
    }
}

async function updateCreateCountry(req, res, next) {    
    let toUpdateCountry = {
        name: req.body.name
    }
    try {
        let updated = await Country.update(toUpdateCountry, {
            where: {
                code: req.params.country 
            }
        });
        if(updated > 0) {
            let country = await Country.findByPk(req.params.country);
            country = countryHATEOAS(country);
            res.status(200).send(country);
        } else {
            res.status(404).send(`Unable to update country: Country not found`);
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