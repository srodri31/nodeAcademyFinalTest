const { Router } = require("express");
const countriesController = require("../controllers/countriesController");
const Country = require("../models/country");
const Region = require("../models/region");

const router = Router();

router.get("/", (...params) => {
    countriesController.all(...params, Country);
});
router.get("/:country", (...params) => {
    countriesController.getCountry(...params, Country);
});
router.delete("/:country", (...params) => {
    countriesController.deleteCountry(...params, Country, Region);
});
router.put("/:country", (...params) => {
    countriesController.updateCreateCountry(...params, Country)
});

module.exports = router;