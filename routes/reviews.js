const router = require("express").Router();
const review_control = require("../controllers/reviews")

router.post("/addreview", review_control.addreviews)
router.get("/allreviews", review_control.addreviews)

module.exports = router;