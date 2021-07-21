const models = require('../models');
const bcrypt = require('bcryptjs');
const token = require('../services/token');
const jwt = require('jsonwebtoken');


module.exports = {
    add: async(req, res, next) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.findAll();
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    update: async(req, res, next) => {
        try {
            // let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({ where: { email: req.body.email } });
            if (reg0) {
                const reg = await models.Usuario.update({ nombre: req.body.nombre, password: req.body.password },
                { where: { email: req.body.email },
            });
            
            res.status(200).json(reg);
            } else{
            res.status(404).send({
                message: 'Ocurrió un error'
            })
        }
        }catch(error){
            res.status(404).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },


    activate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.update({ estado: 1 }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.update({ estado: 0 }, { where: { email: req.body.email } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    login:  async(req,res, next) =>{
        try{
            const user = await models.Usuario.findOne({ where: { email: req.body.email } });
            if (user) {
                const passwordIsValid  = bcrypt.compareSync(req.body.password, user.password);
                if (passwordIsValid) {
                    const token= jwt.sign({
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        rol: user.rol
                    },'config.secret',{
                        expiresIn: 86400,
                    }
                    );
                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        user: user
                    })
                }else {
                    res.status(401).json({
                        error: 'Error en el usuario o contrasena'
                    });
                }
            }else {
                res.status(404).send({
                    error: 'Error en el usuario o contrasena'
                });
            }
    
        } catch(error){
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    }
}

