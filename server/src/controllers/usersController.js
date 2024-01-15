const { User } = require("../dbConexion");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { secretKey } = process.env;
const { createProfile } = require("./profilesController");

/* Function que verifica si el usuario o email existe */
const saveUser = async (req, res, next) =>{
   try {
      const { userName, email } = req.body;
      if( !userName || !email ) throw Error("Faltan campos necesarios");
      const userFind = await User.findOne({
         where: {
            userName
         }
      });
      if(userFind) return res.status(401).send("El usuario ya esta registrado");
      const emailFind = await User.findOne({
         where: {
            email
         }
      });
      if(emailFind) return res.status(401).send("El email ya esta registrado");

      next();

   } catch (error) {
      return res.status(404).send(error.message);
   }
}

/* Function que regista a los usuarios en la DB */
const signUp = async (req, res) => {
   try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) throw Error("Faltan propiedades necesarias");
      const userData = {
         userName,
         email, 
         password: await bcryptjs.hash(password, 10)
      } ;  
      const userCreate = await User.create(userData);
      if(userCreate){
         let token = jwt.sign({id: userCreate.id}, secretKey,
            {expiresIn : 1* 24 * 60 * 60 * 1000}
         );
         res.cookie(("jwt", token, {maxAge: 1 * 24 * 60 *1000, httpOnly: true }));
         createProfile(userCreate.id, email);
         return res.status(200).json(userCreate);
      };
   } catch (error) {
      return res.status(404).send(error.message);
   }
}

/* Function que autentica al usuario y devuelve los datos junto al token */

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if(!email || !password) throw Error("Faltan datos necesarios");
      const userFind = await User.findOne({
         where: {
            email
         }
      });
      if(!userFind) throw Error("La cuenta no existe");
      const isSame = await bcryptjs.compare(password, userFind.password);
      if(!isSame) throw Error("Password incorrecto");
      let token = jwt.sign({id: userFind.id}, secretKey, {
         expiresIn : 1* 24 * 60 * 60 * 1000,
      });
      const resToken = ("Token", token);
      const resCookie = ("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      const userData = {
         userName: userFind.userName,
         email: userFind.email,
         id:userFind.id,
         resToken,
         resCookie
      }
      return res.status(200).json(userData);
   } catch (error) {
      return res.status(401).json(error.message);
   }
}

const adminFind = async (req, res) => {
   try {
      const { id } = req.params;
      if(!id) throw Error("Falta el idUser");
      const response = await User.findOne({
         where:{
            id
         }
      });
      if (!response.userRoll) throw Error("Usuario no autorizado");
      return res.status(200).json(response);
   } catch (error) {
      return res.status(400).send(error.message);
   }
}


module.exports = {
   saveUser,
   signUp,
   login,
   adminFind
}