var express = require('express');
var app = express();
var mdAutenticacion = require('../middlewares/autenticacion');

var Hospital = require('../models/hospital');

//===================================
// Obtener todos los hospitales
//==================================
app.get('/', (req, res, next) => {


    Hospital.find({})
        .populate('usuario', 'nombre email')
        .exec((err, hospitals) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error Obteniendo hospital',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                hospitals: hospitals
            })
        });
});

//===================================
// crear nuevo hospital
//==================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    // app.post('/', (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
            // hospitalToken: req.hospital
        });

    });
});

//===================================
// Actualizar Hospital
//==================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe hospital' }
            });
        }

        hospital.nombre = body.nombre;
        hospital.usuario = req.usuario._id;
        // hospital.email = body.email;
        // hospital.role = body.role;

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar hospital',
                    errors: err
                });
            }
            hospital.password = ':)'
            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        })
    });
});

//===================================
// Eliminar hospital
//==================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar hospital',
                errors: err
            });
        }
        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe hospital',
                errors: { message: 'No existe hospital' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    })
});

module.exports = app;