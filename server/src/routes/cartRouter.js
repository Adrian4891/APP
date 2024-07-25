const router = require("express").Router();
const { 
    postCart, 
    getCart, 
    removeProductCart, 
    editAmount 
} = require("../controllers/cartsController");

router.post("/:id", postCart);

router.get("/:id", getCart);

router.delete("/:id/:product", removeProductCart);

router.put("/:id", editAmount);

module.exports = router;
