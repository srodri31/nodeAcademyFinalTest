const { Router } = require("express");
const citiesController = require("../controllers/citiesController");
const City = require("../models/city");
const Region = require("../models/region");
const Country = require("../models/country");
const sistersOf = require("../utils/sistersOfCity");

const router = Router();

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