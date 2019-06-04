const Region = require("../models/region");

function regionHATEOAS(region) {
    const { code, name, country } = region;
    return {
        code,
        name,
        country,
        links: [
            {
                rel: "self",
                href: `/regions/${country}/${code}`
            },
            {
                rel: "country",
                href: `/countries/${country}`
            },
            {
                rel: "cities",
                href: `/cities/?country=${country}&region=${code}`
            }
        ]
    }
}

async function all(req, res) {
    try {
        let regions = await Region.findAll();
        regions = regions.map(regionHATEOAS);
        res.status(200).send(regions);
    } catch(err) {
        res.status(500).send(`Error retrieving regions ${err.message}`);
    }
}

async function allByCountry(req, res) {
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
        res.status(500).send(`Error retrieving regions ${err.message}`);
    }
}

async function getRegion(req, res) {
    try {
        let region = await Region.findByPk(req.params.region);
        if(region) {
            region = regionHATEOAS(region);
            res.status(200).send(region);
        } else {
            res.status(404).send(`No region found with code ${req.params.region}`);
        }
    } catch(err) {
        res.status(500).send(`Error retrieving region ${err.message}`);
    }
}

async function deleteRegion(req, res) {
    try {
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
    } catch(err) {
        res.status(500).send(`Error deleting region ${err.message}`);
    }
}

async function createRegion(req,res) {
    try {
        let newRegion = {
            code: req.body.code,
            name: req.body.name,
            country: req.params.country
        }
        let region = await Region.create(newRegion);
        region = regionHATEOAS(region);
        res.status(200).send(region);
    } catch(err) {
        res.status(500).send(`Error creating region ${err.message}`);
    }
}

async function updateRegion(req, res) {
    try {
        let region = {
            name: req.body.name,
            country: req.body.country
        }
        let updatedRows = await Region.update(region, {
            where: {
                code: req.params.region
            }
        })
        if(updatedRows > 0) {
            let region = await Region.findByPk(req.params.region);
            region = regionHATEOAS(region);
            res.status(200).send(region);
        } else {
            res.status(404).send(`No region found with code ${req.params.region}`);
        }
    } catch(err) {
        res.status(500).send(`Error updating or creating region ${err.message}`);
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