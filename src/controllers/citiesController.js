const City = require("../models/city");

function cityHATEOAS(city) {
    const { code, name, latitude, longitude, population, region, country } = city;
    return {
        code, name, latitude, longitude, population, region, country,
        links: [
            {
                rel: "self",
                href: `/cities/${code}`
            },
            {
                rel: "country",
                href: `/countries/${country}`
            },
            {
                rel: "region",
                href: `/regions/${country}/${region}`
            },
            {
                rel: "sisters",
                href: `/sisters/${code}`
            }
        ]
    }
}

async function getCities(req, res, next) {
    try {
        const { country, region } = req.query;
        if(country) {
            let cities;
            if(region) {
                cities = await City.findAll({
                    where: { country, region }
                })
            } else {
                cities = await City.findAll({
                    where: { country }
                })
            }
            cities = cities.map(cityHATEOAS);
            res.status(200).send(cities);
        } else {
            res.status(405).send("request must inlude query params country");
        }
        
    } catch(err) {
        next(new Error(`Error retrieving cities: ${err.message}`));
    }
}

async function getCity(req, res, next) {
    try {
        let city = await City.findByPk(req.params.city);
        if(city) {
            city = cityHATEOAS(city);
            res.status(200).send(city);
        } else {
            res.status(404).send(`No city found with code ${req.params.city}`);
        }
    } catch(err) {
        next(new Error(`Error retrieving city: ${err.message}`));
    }
}

async function deleteCity(req, res, next) {
    try {
        let deleted = await City.destroy({
            where: {
                code: req.params.city
            }
        });
        if(deleted) {
            res.status(204).send(`City with code ${req.params.city} deleted`);
        } else {
            res.status(404).send(`No city found with code ${req.params.city}`);
        }
    } catch(err) {
        next(new Error(`Error deleting city: ${err.message}`));
    }
}

async function createCity(req, res, next) {
    try {
        const { country, region } = req.params;
        const { code, name, latitude, longitude, population } = req.body;
        let newCity = {
            code, name, latitude, longitude, population, country, region
        }
        let city = await City.create(newCity);
        city = cityHATEOAS(city);
        res.status(201).send(city);
    } catch(err) {
        next(new Error(`Error creating city: ${err.message}`));
    }
}

async function updateCity(req, res, next) {
    try {
        const { country, region, city } = req.params;
        const { name, latitude, longitude, population } = req.body;
        let toUpdateCity = {
            name, latitude, longitude, population, country, region
        }
        let updatedRows = await City.update(toUpdateCity, {
            where: {
                code: city
            }
        });
        if(updatedRows > 0) {
            let cityUpdated = await City.findByPk(city);
            cityUpdated = cityHATEOAS(cityUpdated);
            res.status(200).send(cityUpdated);
        } else {
            res.status(404).send(`No city found with code ${city}`);
        }
    } catch(err) {
        next(new Error(`Error updating city: ${err.message}`));
    }
}

module.exports = {
    getCities,
    getCity,
    deleteCity,
    createCity,
    updateCity
}