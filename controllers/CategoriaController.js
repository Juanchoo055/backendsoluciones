const { Categoria } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    add: async(req, res, next) => {
        try {
            const reg = await Categoria.create(req.body);
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
            const reg = await Categoria.findAll();
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
     update : async(req, res, next) => {
        try {
            const re = await Categoria.update({nombre: req.body.nombre, descripcion: req.body.descripcion},{ where: { id: req.body.id }});
            res.status(200).json(re)
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
            const reg = await Categoria.update({ estado: 1 }, { where: { id: req.body.id } });
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
            const reg = await Categoria.update({ estado: 0 }, { where: { id: req.body.id } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }
}


