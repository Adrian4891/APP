const { User, Product, Cart } = require("../dbConexion");

const postCart = async (req, res) => {
        try {
            const { id } = req.params;
            const {productId, name, price, brand, image, amount, description, category} = req.body;
            if(!id || !productId || !name || !price || !brand || !image) throw Error("faltan datos necesarios");
            const findProduct = await Cart.findOne({
                where:{
                    UserId:id,
                    ProductId:productId
                }
            })
            if(findProduct) throw Error("el producto ya exite en el carrito")
            const product = {
               UserId : id,
               ProductId : productId,
               name, 
               price,
               brand,
               image,
               description,
               amount, 
               category
            }
            await Cart.create(product);
            const productsCart = await Cart.findAll({
                where:{
                    UserId:id,
                },
                order:[["id", "ASC"]]
            })
            return res.status(200).json(productsCart);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

/* Function de devuelve los productos del cart */

const getCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findByPk(id);
        if(!userFind) throw Error("No se encontro el usuario");
        const productsCart = await Cart.findAll({ 
            where:{
                UserId:id
            },
            order:[["id", "ASC"]]
         });
        return res.status(200).json(productsCart);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

/* Function que elimina productos del cart */

const removeProductCart = async (req, res) => {
    try {
        const { id, product} = req.params;
        const userFind = await User.findByPk(id);
        if(!userFind) throw Error("El usuario no se encontro");
        const productFind = await Product.findByPk(product);
        if(!productFind) throw Error("El producto no se encontro");
        await userFind.removeCartProduct(productFind);
        const productsCart = await Cart.findAll({
            where:{
               UserId:id,
            },
            order:[["id", "ASC"]]
        });
        return res.status(200).json(productsCart);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

// function que edita la cantidad del producto

const editAmount = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, ProductId} = req.body;
        if (!id || !ProductId || !amount) throw Error("faltan propiedades necesarias");
        await Cart.update(
            {
              amount: amount
            },
            {
                where:{
                   UserId:id,
                   ProductId
                }
            }
        );
        const productCart = await Cart.findAll({
            where:{
                UserId: id
            },
            order:[["id", "ASC"]]
        });  
        return res.status(200).json(productCart);

    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    postCart,
    getCart,
    removeProductCart,
    editAmount
}