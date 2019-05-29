function getCities(req, res) {
    try {
        const { country, region } = req.query;
        if(country && region) {
            res.status(200).send(`return cities from country ${country} and region ${region}`);
        } else {
            res.status(405).send("request must inlude query params country and region");
        }
        
    } catch(err) {
        res.status(500).send("Error retrieving cities");
    }
}

function getCity(req, res) {
    try {
        res.status(200).send(`return city with id ${req.params.city}`);
    } catch(err) {
        res.status(500).send("Error retrieving city");
    }
}

function deleteCity(req, res) {
    try {
        res.status(204).send(`delete city with id ${req.params.city}`);
    } catch(err) {
        res.status(500).send("Error deleting city");
    }
}

function createCity(req, res) {
    try {
        const { country, region } = req.params;
        res.status(201).send(`create city for country ${country} and region ${region}`);
    } catch(err) {
        res.status(500).send("Error deleting city");
    }
}

function updateCity(req, res) {
    try {
        const { country, region, city } = req.params;
        res.status(201).send(`update city with id ${city} or
        create city for country ${country} and region ${region}`);
    } catch(err) {
        res.status(500).send("Error deleting city");
    }
}

module.exports = {
    getCities,
    getCity,
    deleteCity,
    createCity,
    updateCity
}