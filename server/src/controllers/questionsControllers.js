const { Question, User, Product, Notification } = require("../dbConexion");
const { notificationCreate, verifiedNotification} = require("./notificationsControllers");

const postQuestions = async (req, res) => {
    try {
        const { userId, userQuestion, productId } = req.body;
        const question = await Question.create({
            userId,
            question:userQuestion,
            productId,
            answered:false
        });
        if (!question) throw Error("No se pudo postear el coment");
        const product = await Product.findByPk(productId);
        notificationCreate(product, question.id, userId)
        return res.status(200).json(question);
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

const getQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        const questionFind = await Question.findAll({
            where:{
                productId:id
            }, order:[["createdAt", "DESC"]]

        });
        if(!questionFind.length) throw Error("No hay comentarios");
        return res.status(200).json(questionFind);
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

const getFinAllQuestions = async (req, res) => {
    try {
        const questionFind = await Question.findAll();
        if(!questionFind.length) throw Error("No hay Preguntas");
        return res.status(200).json(questionFind);
    } catch (error) {
        return res.status(404).send(error.message)
    }
}

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const userQuestion = await Question.findByPk(id);
        if(!userQuestion.question) throw Error("No se pudo encontrar las respuesta");
        return res.status(200).json(userQuestion);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const responseQuestions = async (req, res) => {
    try {
        const { responseQuestion, questionId , userId, productId } = req.body;
        if (!responseQuestion || !questionId|| !userId) throw Error("Faltan datos necesarios");
        const user = await User.findByPk(userId);
        if(user.userRoll !== "admin") throw Error("Usuario no autorizado");
        await Question.update(
            { 
              response:responseQuestion,
              answered:true   
            },
          
            {  where:{
                id:questionId
            },
                order:[["createdAt", "DESC"]]
            }  
        );
        const questAndResp = await Question.findAll({
            where:{
              productId
            },
            order:[["updatedAt", "DESC"]]
        });
        verifiedNotification(questionId);
        return res.status(200).json(questAndResp);
    } catch (error) {
        return res.status(401).send(error.message);
    }
}

const deleteQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        const delQuestion = await Question.findByPk(id);
        const delNotification = await Notification.findOne({
            where:{
                questionId:id
            }
        })
        if(!delQuestion) throw Error("No se encontro la pregunta");
        await delQuestion.destroy();
        await delNotification.destroy();
        return res.status(200).send("Se borro con exito");
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    getQuestions,
    getQuestionById,
    getFinAllQuestions,
    postQuestions,
    responseQuestions,
    deleteQuestions
}
