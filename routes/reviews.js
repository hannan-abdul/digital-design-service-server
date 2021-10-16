const router = require("express").Router();
const review_control = require("../controllers/reviews")

router.post("/addreview", review_control.addreviews)
router.get("/allreviews", review_control.allreviews)
router.delete("/:id",review_control.deletereview)
router.put("/:id", review_control.updateReview)

module.exports = router;