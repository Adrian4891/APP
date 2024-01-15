const { User } = require("../dbConexion");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createProfile } = require("./profilesController");
const crypto = require('crypto');


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



const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

/* Function que regista a los usuarios en la DB */
const signUp = async (req, res) => {
   try {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
         throw { status: 400, message: "Faltan propiedades necesarias" };
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      const userData = { userName, email, password: hashedPassword };

      const userCreate = await User.create(userData);
      if (userCreate) {
         const token = jwt.sign({ id: userCreate.id }, secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000
         });

         res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });
         createProfile(userCreate.id, email);

         return res.status(200).json(userCreate);
      }
   } catch (error) {
      return res.status(error.status || 500).send(error.message || "Error interno del servidor");
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         throw { status: 400, message: "Faltan datos necesarios" };
      }

      const userFind = await User.findOne({ where: { email } });
      if (!userFind) {
         throw { status: 401, message: "La cuenta no existe" };
      }
      console.log(userFind)

      const isSame = await bcryptjs.compare(password, userFind.password);
      if (!isSame) {
         throw { status: 401, message: "Contraseña incorrecta" };
      }

      const token = jwt.sign({ id: userFind.id }, secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true });

      // const userData = {
      //    userName: userFind.userName,
      //    email: userFind.email,
      //    id: userFind.id,
      // };

      return res.status(200).json(userFind);
   } catch (error) {
      return res.status(error.status || 500).json({ error: error.message || "Error interno del servidor" });
   }
};

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