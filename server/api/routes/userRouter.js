const router = require("express").Router();
const { saveUser, signUp, login, adminFind } = require("../controllers/usersController");

router.post("/signUp",saveUser, signUp);

router.post("/login", login);

router.get("/:id", adminFind);

module.exports = router;
