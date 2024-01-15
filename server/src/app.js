const express = require("express");
const server = express();
const routerProduct = require("./routes/productsRouter");
const routerUsers = require("./routes/userRouter");
const routerProfile = require("./routes/profileRouter");
const routerCart = require("./routes/cartRouter");
const routerFavorites = require("./routes/favoritesRouter");
const routerOffers = require("./routes/offersRouter");
const routerPayment = require("./routes/paymentsRouter");
const routerLocations = require("./routes/locationRouter");
const questionsRouter = require("./routes/questionsRouter");
const routerScore = require("./routes/scoresRouter");
const routerNotifications = require("./routes/notificationsRouter");

server.use(express.json());
server.use(express.urlencoded({ extended : true }));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://barek-intruments-app.vercel.app/');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});
  
server.use("/products", routerProduct);
server.use("/user", routerUsers);
server.use("/profile", routerProfile);
server.use("/cart", routerCart);
server.use("/favorites", routerFavorites);
server.use("/offers", routerOffers);
server.use("/payments", routerPayment);
server.use("/location", routerLocations);
server.use("/questions", questionsRouter);
server.use("/scores", routerScore);
server.use("/notifications", routerNotifications);

module.exports = server;