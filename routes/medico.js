var express = require('express');
var app = express();
var mdAutenticacion = require('../middlewares/autenticacion');


var Medico = require('../models/medico');

//===================================
// Obtener todos los medicoes
//==================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Medico.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('hospital')
        .exec((err, medicos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error Obteniendo medico',
                    errors: err
                });
            }
            Medico.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    medicos: medicos,
                    total: conteo
                })
            });

        });
});

//===================================
// crear nuevo medico
//==================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    // app.post('/', (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        usuario: req.usuario._id,
        hospital: body.hospital
    });

    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear medico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            body: medicoGuardado,
            // medicoToken: req.medico
        });

    });
});

//===================================
// Actualizar medico
//==================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar medico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico con el id ' + id + ' no existe',
                errors: { mensaje: 'No existe medico' }
            });
        }

        medico.nombre = body.nombre;
        console.log(body.nombre);
        medico.usuario = req.usuario._id;
        medico.hospital = body.hospital;
        // medico.role = body.role;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar medico',
                    errors: err
                });
            }
            medico.password = ':)'
            res.status(200).json({
                ok: true,
                body: medicoGuardado
            });
        })
    });
});

//===================================
// Eliminar medico
//==================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar medico',
                errors: err
            });
        }
        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe medico',
                errors: { message: 'No existe medico' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
    })
});

module.exports = app;