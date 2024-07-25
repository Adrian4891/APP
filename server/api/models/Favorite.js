 const { DataTypes } = require("sequelize");


module.exports = (dataBase) => {
    dataBase.define("Favorites", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
}