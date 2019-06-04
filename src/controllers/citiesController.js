const City = require("../models/city");

async function getCities(req, res) {
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
            res.status(200).send(cities);
        } else {
            res.status(405).send("request must inlude query params country");
        }
        
    } catch(err) {
        res.status(500).send("Error retrieving cities");
    }
}

async function getCity(req, res) {
    try {
        let city = await City.findByPk(req.params.city);
        if(city) {
            res.status(200).send(city);
        } else {
            res.status(404).send(`No city found with code ${req.params.city}`);
        }
    } catch(err) {
        res.status(500).send("Error retrieving city");
    }
}

async function deleteCity(req, res) {
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
        res.status(500).send("Error deleting city");
    }
}

async function createCity(req, res) {
    try {
        const { country, region } = req.params;
        const { code, name, latitude, longitude, population } = req.body;
        let newCity = {
            code, name, latitude, longitude, population, country, region
        }
        let city = await City.create(newCity);
        res.status(201).send(city);
    } catch(err) {
        res.status(500).send("Error creating city"+err.message);
    }
}

async function updateCity(req, res) {
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
            res.status(200).send(cityUpdated);
        } else {
            res.status(404).send(`No city found with code ${city}`);
        }
    } catch(err) {
        res.status(500).send("Error updating city");
    }
}

module.exports = {
    getCities,
    getCity,
    deleteCity,
    createCity,
    updateCity
}