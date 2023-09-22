const { Profile } = require("../dbConexion");

const createProfile = async (id, email) => {
    try { 
        const profileData = {
            email,
            complete:false,
            UserId:id
        }
        const profile = await Profile.create(profileData);
        if(!profile) throw Error("hubo un error al crear");
        return profile;
    } catch (error) {
        return (error.message);
    }
}

const getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findOne({
            where: {
                UserId:id
            }
        });
        if (!profile) throw Error("No se encontraron datos");
        return res.status(200).json(profile);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const completeProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, state, city, address, telephone, birthday } = req.body;
        if(!name || !lastName || !state || !city || 
            !address || !telephone || !birthday
        ) throw Error("Todos los campos deben estar completos");
        await Profile.update(
            {
                name, 
                lastName, 
                state, 
                city, 
                address, 
                telephone, 
                birthday,
                complete:true
            },
            {
                where:{
                    UserId: id
                }
            }
        )
        const profileFind = await Profile.findOne({
            where:{
                UserId: id
            }
        });

        return res.status(200).json(profileFind);
        
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

module.exports = {
    createProfile,
    getProfile,
    completeProfile
}