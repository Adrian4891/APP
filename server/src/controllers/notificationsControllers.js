const { Notification, User } = require("../dbConexion");

const notificationCreate = async (product, questionId, userId) =>{
    try {
        if (!product || !questionId || !userId) throw Error("Faltan las propiedades para la notificación");
        const newNotification = {
            productName: product.name,
            productBrand: product.brand,
            productImg: product.image,
            verified: false,
            userChecked: false,
            userId,
            productId:product.id,
            questionId
        } 
        await Notification.create(newNotification);
        return 
    } catch (error) {
        console.log(error.message)
    }
}

const getNotifications = async (req, res) => {
   try {
      const { id } = req.params;
      let findNotification = [];
      const findUser = await User.findByPk(id);
      if ( findUser.userRoll === "admin") {
        findNotification = await Notification.findAll(
            {
                order:[["createdAt", "DESC"]]
            }
        );
      }
      else {
        findNotification = await Notification.findAll({
        where: {
            userId:id, 
            verified:true
        }, 
        order:[["createdAt", "DESC"]]
        });
      }
      if (!findNotification) throw Error("No se encontraron notificaciones");
      return res.status(200).json(findNotification);
   } catch (error) {
      return res.status(404).send(error.message);
   }
}

const verifiedNotification = async (id) => {
   try {
       const notificacion = await Notification.findOne({
          where:{
             questionId:id
          }
        });
      if (!notificacion.productName) throw Error("No se encontro la notificación")
      await Notification.update(
       {
          verified: true
       },
       {
           where:{
              questionId: id
           }
       }
    );
      return 
   }catch (error) {
      return error;
   }
}


const userCheckedNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notification.findOne({
            where:{
                questionId:id
            }
        })
        if (!notificacion.productName) throw Error("No se encontro la notificación");
       await Notification.update(
        {
            userChecked:true
        },
        {
            where:{
               questionId: id
            }
        }
     );
     return res.status(200).json(notificacion);
    } catch (error) {
      return res.status(404).send(error.message);
    }
 }


module.exports = {
    notificationCreate,
    getNotifications,
    verifiedNotification,
    userCheckedNotification
}