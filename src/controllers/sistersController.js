function all(req, res) {
    try {
        res.status(200).send("return all sister cities pairs");
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities");
    }
}

function sistersOf(req, res) {
    try {
        res.status(200).send(`return all sister cities pairs of ${req.params.city}`);
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities");
    }
}

function createSistersPair(req, res) {
    try {
        const { cityA, cityB } = req.body;
        res.status(201).send(`create sisters pair for ${cityA} and ${cityB}`);
    } catch(err) {
        res.status(500).send("Error creating sisters cities pair");
    }
}

function sistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        res.status(200).send(`return sisters pair for ${cityA} and ${cityB}`);
    } catch(err) {
        res.status(500).send("Error retrieving sisters cities pair");
    }
}

function updateSistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        res.status(200).send(`update sisters pair for ${cityA} and ${cityB} with body`);
    } catch(err) {
        res.status(500).send("Error uodating sisters cities pair");
    }
}

function deleteSistersPair(req, res) {
    try {
        const { cityA, cityB } = req.params;
        res.status(204).send(`delete sisters pair for ${cityA} and ${cityB}`);
    } catch(err) {
        res.status(500).send("Error deleting sisters cities pair");
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