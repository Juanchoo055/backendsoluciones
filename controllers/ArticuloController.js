const { Articulo } = require('../models/');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await Articulo.create(req.body);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list : async(req, res, next) => {
        try {
            const re = await Articulo.findAll()
            res.status(200).json(re)
        } catch (error) {
        res.status(500).json({ 'error' : 'Oops paso algo' })
        next(error) 
        }
    }, 
    
    update : async(req, res, next) => {
        try {
            const reg = await Articulo.update(req.body,{ where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    activate: async(req, res, next) => {
        try {
            console.log(req.body.id);
            const reg = await Articulo.update({ estado: 1 }, { where: { id: req.body.id } });
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
            const reg = await Articulo.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
}





