const router  = require("express").Router();
const {  getOfertas } = require("../controllers/offersController");

router.get("/", getOfertas);

module.exports = router;