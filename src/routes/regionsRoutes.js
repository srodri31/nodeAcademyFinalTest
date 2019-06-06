const { Router } = require("express");
const regionsController = require("../controllers/regionsController");
const Region = require("../models/region");
const Country = require("../models/country");
const City = require("../models/city");

const router = Router();

router.get("/", (...params) => {
    regionsController.all(...params, Region);
});
router.get("/:country", (...params) => {
    regionsController.allByCountry(...params, Region);
});
router.get("/:country/:region", (...params) => {
    regionsController.getRegion(...params, Region)
});
router.delete("/:country/:region", (...params) => {
    regionsController.deleteRegion(...params, Region, City)
});
router.post("/:country", (...params) => {
    regionsController.createRegion(...params, Region, Country);
});
router.put("/:country/:region", (...params) => {
    regionsController.updateRegion(...params, Region);
});

module.exports = router;