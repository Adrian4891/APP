const router = require("express").Router();
const { getNotifications, userCheckedNotification} = require("../controllers/notificationsControllers");

router.get("/:id", getNotifications);

router.put("/:id", userCheckedNotification);

module.exports = router;