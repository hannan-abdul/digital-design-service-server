const router = require("express").Router();
const service_control = require("../controllers/services");

router.post("/addservice", service_control.addservice)
router.get("/allservices", service_control.allservices)
router.get("/:id", service_control.singleservice)
router.delete("/:id", service_control.deleteservice)
router.put("/:id",service_control.updateService)

module.exports = router;
