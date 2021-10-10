const router = require("express").Router();
const service_control = require("../controllers/services");

router.post("/addservice", service_control.addservice)
router.get("/allservices", service_control.allservices)

module.exports = router;
