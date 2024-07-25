const router = require("express").Router();
const {  
    getQuestions, 
    getQuestionById,
    getFinAllQuestions,
    postQuestions, 
    responseQuestions, 
    deleteQuestions 
}  = require("../controllers/questionsControllers");

router.get("/:id", getQuestions);

router.get("/response/:id", getQuestionById);

router.get("/", getFinAllQuestions);

router.post("/", postQuestions);

router.put("/", responseQuestions);

router.delete("/:id", deleteQuestions);

module.exports = router;
