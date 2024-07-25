const { Product } = require("../dbConexion");
const { Op } = require("sequelize");

const getAllProducts = async (req, res) =>{
    try {
        const products = await Product.findAll();
        if(!products.length) throw Error("No hay productos");
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const getProductsPages = async (req, res) => {
    try {
        const { page } = req.query;
        const size = 6;
        const offset = ( page -1 ) * size;
        const products = await Product.findAll({
            where:{
              offer:false
            },
            offset:offset,
            limit: size,
            order: [["id", "ASC"]]
        });
        return res.status(200).json(products);
    } catch (error) {
       return res.status(404).send(error.message); 
    }
}

const seachProduct = async (req, res) =>{
    try {
        const { name } = req.query;
        if (!name) throw Error("No se proporciono el nombre, para la busqueda");
        const product = await Product.findAll({
           where: {
                [Op.or]: [
                    {
                        name:{
                        [Op.iLike]:`%${name}%` 
                        }
                    },
                    {
                        brand:{
                        [Op.iLike]:`%${name}%` 
                        }
                    },
                    {
                        category:{
                        [Op.iLike]:`%${name}%` 
                        }
                    }
                ]
            }         
        });
    if(!product) throw Error("no existe el producto");
        return res.status(200).json(product);
    } catch (error) {
        return res.status(404).json(error.message);
    }
}


const getProductById = async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product)throw Error("No se encontro el producto");
        return res.status(200).json(product);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const deleteProduct = async (req, res) =>{
    try {
        const {id}=req.params;
        await Product.destroy({
            where:{
                id
            }
        });
        return res.status(200).send("producto borrado con exito");
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const getProductCategory = async (req, res) => {
    try {
        const { category } = req.query;
        const products = await Product.findAll({
            where:{
                category:category
            }
        });
        if(!products) throw Error("No se encontro el producto");
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).send("no");
    }
}


module.exports = {
    getAllProducts,
    getProductsPages,
    seachProduct,
    getProductById,
    deleteProduct,
    getProductCategory,
    
}