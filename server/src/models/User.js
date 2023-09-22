const { DataTypes } = require("sequelize");


module.exports = (dataBase) =>{
    dataBase.define("User",{
      id:{
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV1,
         primaryKey:true  
      },
       userName : {
          type: DataTypes.STRING,
          allowNull: false
       },
       userRoll : {
         type: DataTypes.STRING,
       },
       email: {
          type: DataTypes.STRING,
          allowNull: false
       },
       password: {
          type: DataTypes.STRING,
          allowNull: false
       }
    })
}