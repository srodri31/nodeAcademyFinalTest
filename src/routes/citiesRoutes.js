const { Router } = require("express");
const citiesController = require("../controllers/citiesController");

const router = Router();

router.get("/", citiesController.getCities);
router.get("/:city", citiesController.getCity);
router.post("/:country/:region", citiesController.createCity);
router.put("/:country/:region/:city", citiesController.updateCity);
router.delete("/:city", citiesController.deleteCity);

module.exports = router;