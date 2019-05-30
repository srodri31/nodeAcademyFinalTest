const { Router } = require("express");
const sistersController = require("../controllers/sistersController");

const router = Router();

router.get("/", sistersController.all);
router.post("/", sistersController.createSistersPair);
router.get("/:city", sistersController.sistersOf);
router.get("/:cityA/:cityB", sistersController.sistersPair);
router.put("/:cityA/:cityB", sistersController.updateSistersPair);
router.delete("/:cityA/:cityB", sistersController.deleteSistersPair);

module.exports = router;