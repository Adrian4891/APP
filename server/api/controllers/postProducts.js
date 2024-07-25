const { Product } = require("../dbConexion");

const productPost = async (req, res) =>{
    try { 
        const { name, price, brand, description, image, image2, image3, 
            image4, characterist, category, offer, amount } = req.body;
           
        if (!name || !price || !brand || !description || !image || !image2 || !image3 || 
           !image4 || !characterist || !category ) throw Error("Faltan propiedades necesariass");
        const product = {
            name,
            price,
            brand, 
            description, 
            image, 
            image2, 
            image3, 
            image4, 
            characterist, 
            category,
            offer, 
            amount,
            score:false
        }   
        await Product.create(product);
        return res.status(200).json(product);  
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    productPost     
};