const { DataTypes } = require("sequelize");

module.exports = (dataBase) =>{
    
    dataBase.define("Cities",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
        },
        stateId: {
            type: DataTypes.INTEGER,
            foreingKey:true
        }
    })
     
}