const { Router } = require("express");
const countriesController = require("../controllers/countriesController");

const router = Router();

router.get("/", countriesController.all);
router.get("/:country", countriesController.getCountry);
router.delete("/:country", countriesController.deleteCountry);
router.put("/:country", countriesController.updateCreateCountry);

module.exports = router;