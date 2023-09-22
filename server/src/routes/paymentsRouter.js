const router = require("express").Router();
const { 
    createPayment, 
    successRes, 
    failResponse, 
    pendingResponse, 
    notificationPayment, 
    findPayments, 
    getPayments,
    deletePayment
} = require("../controllers/paymentController");

router.post("/:id", createPayment);

router.get("/success", successRes);

router.get("/failure", failResponse);

router.get("/pending", pendingResponse);

router.post("/notifications/:id", notificationPayment);

router.post("/detail/:id", findPayments);

router.get("/:id", getPayments);

router.delete("/delete/:id", deletePayment);





module.exports = router;