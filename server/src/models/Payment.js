const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define("Payment", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey:true  
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false 
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false 
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false 
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    score: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productId :{
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentId :{
      type: DataTypes.STRING,
      allowNull: false
    },
  });
};
