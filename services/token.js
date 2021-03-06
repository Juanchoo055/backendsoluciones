var jwt = require('jsonwebtoken');
const models = require('../models');


module.exports = {

    //generar el token
    encode: async(id, rol) => {
        try{
    const token = jwt.sign( {
        id: id,
        
        rol: rol,
    }, 'mipalabrasecreta', {
        expiresIn : 3600
    } )
    return token
    }catch(error){
      return null
    }

    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const {id} = await jwt.verify(token, "mipalabrasecrete")
            const user = await models.Usuario.findOne({ Where : {id : id}})
            if (user){
                return user;
            } else{
                return false;
            }
        } catch (e) {
            return null
        }

    }
}