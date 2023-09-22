const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    dataBase.define("Cart", {
        id:{
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
        brand:{
           type: DataTypes.STRING,
           allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount:{
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        category:{
            type: DataTypes.STRING,
            allowNull: false 
        }
    
    });
}