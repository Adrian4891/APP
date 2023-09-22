const { States, Cities } = require("../dbConexion");


const getStates  = async (req, res) => {
    try {
        const state = await States.findAll();
        if(!state) throw Error("No hay states");
        return res.status(200).json(state);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const getCities = async (req, res) => {
    try {
        const { name } = req.query;
        const state = await States.findOne({
            where:{
                name
            }
        });
        const cities = await Cities.findAll({
            where:{
                stateId:state.id
            }
        });
        if (!cities) throw Error("No hay ciudades");
        return res.status(200).json(cities);

    } catch (error) {
        return res.status(404).send(error.message);
    }
}



module.exports ={ 
    getStates, 
    getCities
}