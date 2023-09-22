const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define("Product",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey:true  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
    allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image2 : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image3 : {
      type: DataTypes.STRING,
      allowNull: false
    },
    image4 : {
      type: DataTypes.STRING,
      allowNull: false
    },
    characterist : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    offer:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
}