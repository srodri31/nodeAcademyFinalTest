const { Router } = require("express");
const regionsController = require("../controllers/regionsController");

const router = Router();

router.get("/", regionsController.all);
router.get("/:country", regionsController.allByCountry);
router.get("/:country/:region", regionsController.getRegion);
router.delete("/:country/:region", regionsController.deleteRegion);
router.post("/:country", regionsController.createRegion);
router.put("/:country/:region", regionsController.updateRegion);

module.exports = router;