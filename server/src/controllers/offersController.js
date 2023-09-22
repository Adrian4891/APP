const { Product } = require("../dbConexion");

const getOfertas = async (req, res) => {
   try {
    const { page } = req.query;
    const size = 6;
    const offset = (page - 1) * size;
      const offers = await Product.findAll({
        where:{
          offer:true
        },
        limit:size,
        offset:offset,
        order:[["id", "ASC"]]
      }
      );
      if(offers) return res.status(200).json(offers);
   } catch (error) {
      return res.status(404).send(error)
   }
}

module.exports = {
  getOfertas
}