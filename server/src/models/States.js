const { DataTypes } = require("sequelize");

module.exports = (dataBase) =>{
    dataBase.define("States",{
       id: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey:true
       },
       name:{
           type: DataTypes.STRING,
       },
       
       
    })
}