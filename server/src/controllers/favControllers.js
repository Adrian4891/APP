const { User , Product} = require("../dbConexion");

const postFavorites = async (req, res) => {
    try {
        const {id, product} = req.body;
        const userFind = await User.findByPk(id);
        if(!userFind) throw Error("El usuario no existe");
        await userFind.addFavoriteProduct(product);
        const products = await userFind.getFavoriteProducts({joinTableAttributes: [] });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const getFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const userFind = await User.findByPk(id);
        if(!userFind) throw Error("El usuario no se existe");
        const favorites = await userFind.getFavoriteProducts({ joinTableAttributes: [] });
        return res.status(200).json(favorites);
    } catch (error) {
       return res.status(404).send(error.message); 
    }
}

const deleteFavorite = async (req, res) => {
    try {
        const { id, productId} = req.params;
        const userFind = await User.findByPk(id);
        if(!userFind) throw Error("El usuario no existe");
        const productFav = await Product.findByPk(productId);
        if(!productFav) throw Error("El product no existe");
        await userFind.removeFavoriteProduct(productFav);
        const productsFav = await userFind.getFavoriteProducts({ joinTableAttributes: [] });
        return res.status(200).json(productsFav);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    postFavorites,
    getFavorites,
    deleteFavorite
}