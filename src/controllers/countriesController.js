function all(req, res) {
    try {
        res.status(200).send("return all countries");
    } catch(err) {
        res.status(500).send("Error retrieving countries");
    }
}

function getCountry(req, res) {
    try {
        res.status(200).send(`return country with code ${req.params.country}`);
    } catch(err) {
        res.status(500).send("Error retrieving country");
    }
}

function deleteCountry(req, res) {
    try {
        res.status(204).send(`delete country with code ${req.params.country}`);
    } catch(err) {
        res.status(500).send("Error deleting country");
    }
}

function updateCreateCountry(req, res) {
    try {
        res.status(200).send(`update or create country with code ${req.params.country}`);
    } catch(err) {
        res.status(500).send("Error updating or creating country");
    }
}


module.exports = {
    all,
    getCountry,
    deleteCountry,
    updateCreateCountry
}