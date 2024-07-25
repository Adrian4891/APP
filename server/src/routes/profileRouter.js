const  router  = require("express").Router();
const { getProfile, completeProfile } = require("../controllers/profilesController") ;

router.get("/:id", getProfile);

router.put("/:id", completeProfile);

module.exports = router;