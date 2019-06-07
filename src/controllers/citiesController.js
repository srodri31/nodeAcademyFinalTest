function cityHATEOAS(city) {
    const { code, name, latitude, longitude, population, region, country, sisters } = city;
    return {
        code, name, latitude, longitude, population, region, country, sisters,
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

async function getCities(req, res, next, City, sistersOf) {
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
            if(cities.length > 0) {
                promises = cities.map(async city => {
                    city = await sistersOf(city);
                    city = cityHATEOAS(city);
                    return city;
                });
                cities = await Promise.all(promises);
                res.status(200).send(cities);
            } else {
                res.status(404).send(`No cities found for specified params`)
            }
        } else {
            res.status(405).send("request must inlude query params country");
        }
        
    } catch(err) {
        next(new Error(`Error retrieving cities: ${err.message}`));
    }
}

async function getCity(req, res, next, City, sistersOf) {
    try {
        let city = await City.findByPk(req.params.city);
        if(city) {
            city = await sistersOf(city);
            city = cityHATEOAS(city);
            res.status(200).send(city);
        } else {
            res.status(404).send(`No city found with code ${req.params.city}`);
        }
    } catch(err) {
        next(new Error(`Error retrieving city: ${err.message}`));
    }
}

async function deleteCity(req, res, next, City, sistersOf) {
    try {
        let sisters = await sistersOf({code: req.params.city});
        if(sisters.length === 0) {
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
        } else {
            res.status(405).send(`Cannot delete city with sisters`);
        }
    } catch(err) {
        next(new Error(`Error deleting city: ${err.message}`));
    }
}

async function createCity(req, res, next, City, Region, Country) {
    try {
        const { country, region } = req.params;
        let regionRecord = await Region.findByPk(region);
        let countryRecord = await Country.findByPk(country);
        if(countryRecord && regionRecord) {
            const { code, name, latitude, longitude, population } = req.body;
            let newCity = {
                code, name, latitude, longitude, population, country, region
            }
            let city = await City.create(newCity);
            city = cityHATEOAS(city);
            res.status(201).send(city);
        } else {
            res.status(405).send(`Cannot create city with non existent country and/or non existent region`);
        }
    } catch(err) {
        next(new Error(`Error creating city: ${err.message}`));
    }
}

async function updateCity(req, res, next, City, Region, Country, sistersOf) {
    try {
        const { country, region, city: code } = req.params;
        const { name, latitude, longitude, population } = req.body;
        let toUpdateCity = {
            name, latitude, longitude, population, country, region
        }
        let updatedRows = await City.update(toUpdateCity, {
            where: { code }
        });
        if(updatedRows > 0) {
            let cityUpdated = await City.findByPk(code);
            cityUpdated = await sistersOf(cityUpdated);
            cityUpdated = cityHATEOAS(cityUpdated);
            res.status(200).send(cityUpdated);
        } else {
            let regionRecord = await Region.findByPk(region);
            let countryRecord = await Country.findByPk(country);
            if(countryRecord && regionRecord) {
                let newCity = {
                    code, name, latitude, longitude, population, country, region
                }
                let city = await City.create(newCity);
                city = cityHATEOAS(city);
                res.status(201).send(city);
            } else {
                res.status(405).send(`Cannot create city with non existent country and/or non existent region`);
            }
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