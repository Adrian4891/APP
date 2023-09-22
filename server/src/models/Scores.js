const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
   dataBase.define("Score",{
      id:{
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV1,
         primaryKey:true  
      },
      score:{
         type: DataTypes.INTEGER,
         allowNull: false
      },
      coment:{
         type: DataTypes.STRING
      },
       productId:{
         type: DataTypes.STRING,
         allowNull: false
      },
      userId:{
         type: DataTypes.STRING,
         allowNull: false
      },
   })
}