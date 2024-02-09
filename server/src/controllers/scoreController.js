const { Score, Product, Payments } =  require("../dbConexion");


const scoreProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, coment, userId } = req.body;
    if(!userId || !id) throw Error("Faltan los parametro para la busqueda del producto");
    if(!score) throw Error("Puntuation no puede estar vacio");
    const scoreProd = {
      userId,
      coment,
      score,
      productId:id
    }
    await Product.update(
      {
        score: true
      },
      {
        where: {
          id
        }
      }
    );

    await Payments.update(
        {
          score: true
        },
        {
            where: {
              productId: id
            }
        }
      );
    const scoreCreate = await Score.create(scoreProd);
    if(!scoreCreate) throw Error("No se pudo hacer la calificación");
    return res.status(200).json(scoreCreate);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}


const getScores = async (req, res) => {
  try {
    const { id } = req.params;
    const findScores = await Score.findAll({
      where:{
        productId:id
      }
    });
    if(!findScores) throw Error("No se encontraron calificaciónes");
    return res.status(200).json(findScores);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

module.exports = {
  scoreProduct,
  getScores
}

