const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("Notification", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true  
         },
        productName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        productImg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productBrand:{
            type: DataTypes.STRING,
            allowNull: false
        },
        verified:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userChecked:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        productId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        questionId:{
            type: DataTypes.STRING,
            allowNull: false
        }

    });
}