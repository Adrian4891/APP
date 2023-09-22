const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
   dataBase.define("Profile", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey:true  
    },
    name: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATEONLY,
    },
    telephone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
} 