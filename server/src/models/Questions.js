const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define("Question", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey:true  
   },
    question:{
      type: DataTypes.STRING,
      allowNull: false
    },
    answered:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    response:{
      type: DataTypes.STRING,
    },
    userId:{
      type: DataTypes.STRING,
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull:false
    }
  });
}