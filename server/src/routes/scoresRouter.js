const router = require("express").Router();
const { scoreProduct,  getScores } = require("../controllers/scoreController");

router.post("/:id", scoreProduct);

router.get("/:id", getScores);

module.exports = router;