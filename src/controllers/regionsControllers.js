const countries = require("../config/dataTest");

function all(req, res) {
    try {
        // countriesArr = Array.from(countries.values());
        res.status(200).send("return all regions");
    } catch(err) {
        res.status(500).send("Error retrieving regions");
    }
}

function allByCountry(req, res) {
    try {
        res.status(200).send(`return all regions from ${req.params.country}`);
    } catch(err) {
        res.status(500).send("Error retrieving regions");
    }
}

function getRegion(req, res) {
    try {
        res.status(200).send(`return region with id ${req.params.region}`);
    } catch(err) {
        res.status(500).send("Error retrieving region");
    }
}

function deleteRegion(req, res) {
    try {
        res.status(204).send(`delete region with id ${req.params.region}`);
    } catch(err) {
        res.status(500).send("Error deleting region");
    }
}

function createRegion(req,res) {
    try {
        res.status(200).send(`create region for country ${req.params.country}`);
    } catch(err) {
        res.status(500).send("Error creating region");
    }
}

function updateRegion(req, res) {
    try {
        res.status(200).send(`update or create region with id ${req.params.region}`);
    } catch(err) {
        res.status(500).send("Error updating or creating region");
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