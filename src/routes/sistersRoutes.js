const { Router } = require("express");
const sistersController = require("../controllers/sistersController");
const Sister = require("../models/sister");
const City = require("../models/city");

const router = Router();

router.get("/", (...params) => {
    sistersController.all(...params, Sister);
});
router.post("/", (...params) => {
    sistersController.createSistersPair(...params, Sister, City);
});
router.get("/:city", (...params) => {
    sistersController.sistersOf(...params, Sister);
});
router.get("/:cityA/:cityB", (...params) => {
    sistersController.sistersPair(...params, Sister);
});
router.put("/:cityA/:cityB", (...params) => {
    sistersController.updateSistersPair(...params, Sister, City);
});
router.delete("/:cityA/:cityB", (...params) => {
    sistersController.deleteSistersPair(...params, Sister);
});

module.exports = router;