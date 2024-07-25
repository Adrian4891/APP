const router = require("express").Router();
const { postFavorites, getFavorites, deleteFavorite } = require("../controllers/favControllers");

router.post("/", postFavorites);

router.get("/:id", getFavorites);

router.delete("/:id/:productId", deleteFavorite);

module.exports = router;