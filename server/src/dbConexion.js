require("dotenv").config();
const POSTGRES_URL = process.env.POSTGRES_URL;
const { Sequelize } = require("sequelize");
const userModel = require("./models/User");
const productModel = require("./models/Product");
const cartModel = require("./models/Cart");
const profileModel = require("./models/Profile");
const favoriteModel = require("./models/Favorite");
const paymentsModel = require("./models/Payments");
const statesArg = require("./models/States");
const citiesArg = require("./models/Cities");
const userQuestions  = require("./models/Questions");
const scoreModel = require("./models/Scores");
const notificationModel = require("./models/Notification");

const dataBase = new Sequelize(POSTGRES_URL, 
{logging:false, native: false, dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Puedes necesitar ajustar esto dependiendo de tu configuración de SSL
    },
  },
});

dataBase.authenticate().then(()=>{
    console.log("DB, Connected");
}).catch((error)=>{
   console.log(error);
});

userModel(dataBase);
profileModel(dataBase);
productModel(dataBase);
favoriteModel(dataBase);
cartModel(dataBase);
paymentsModel(dataBase);
statesArg(dataBase);
citiesArg(dataBase);
userQuestions(dataBase);
scoreModel(dataBase);
notificationModel(dataBase);


const { User, Profile, Product, Favorites, Cart} = dataBase.models;

User.hasOne(Profile);
Profile.belongsTo(User);

User.belongsToMany(Product, { through: Cart, as:"CartProduct"});
Product.belongsToMany(User, { through: Cart, as:"CartProduct"});

User.belongsToMany(Product, { through: Favorites, as: 'FavoriteProducts'});
Product.belongsToMany(User, { through: Favorites, as: 'LikedByUsers'});

module.exports = {
    ...dataBase.models,
    dataBase
};