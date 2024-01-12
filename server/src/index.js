const server = require("./app");
require("dotenv").config();
const { PORT } = process.env;
const { dataBase } = require("./dbConexion");

dataBase.sync({force: false}).then(()=>{
    server.listen(PORT, ()=>{
       console.log(`server in port ${PORT}`)
    });
})
