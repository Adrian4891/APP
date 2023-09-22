const  router  = require("express").Router();
const { 
    getAllProducts,
    getProductsPages,
    seachProduct, 
    getProductById, 
    deleteProduct,
    getProductCategory
} = require("../controllers/getProducts");

const {productPost  } = require("../controllers/postProducts");

router.get("/", getAllProducts);

router.get("/all", getProductsPages);

router.get("/search", seachProduct);

router.get("/category", getProductCategory);

router.get("/:id",  getProductById);

router.delete("/delete/:id", deleteProduct);

router.post("/", productPost);



module.exports = router;