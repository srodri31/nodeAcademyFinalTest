const { Router } = require("express");
const citiesController = require("../controllers/citiesController");
const City = require("../models/city");
const Region = require("../models/region");
const Country = require("../models/country");

const router = Router();

const Sister = require("../models/sister");
const Sequelize = require("sequelize");

async function sistersOf(city) {
    let sisters = await Sister.findAll({
        where: Sequelize.or(
            {city1: city.code},
            {city2: city.code}
        )
    })
    city.sisters = sisters.map(record => record.city1 === city.code ? record.city2 : record.city1);
    return city;
} 

router.get("/", (...params) => {
    citiesController.getCities(...params, City, sistersOf);
});
router.get("/:city", (...params) => {
    citiesController.getCity(...params, City, sistersOf);
});
router.post("/:country/:region", (...params) => {
    citiesController.createCity(...params, City, Region, Country);
});
router.put("/:country/:region/:city", (...params) => {
    citiesController.updateCity(...params, City, Region, Country, sistersOf);
});
router.delete("/:city", (...params) => {
    citiesController.deleteCity(...params, City, sistersOf);
});

module.exports = router;