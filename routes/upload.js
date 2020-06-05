var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var app = express();
app.use(fileUpload());


var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');

// Rutas
app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    //tipos de coleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'tipo de coleccion no valida',
            errors: { message: 'tipo de coleccion no valida' }
        });
    }

    //Validar que viene archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono archivo',
            errors: { message: 'Debe seleccionar un archivo' }
        });
    }

    //obtener nombre del archivo
    var archivo = req.files.imagen;
    //cortar el archivo por puntos
    var nombreCortado = archivo.name.split('.');
    //obtener extension desde la ulitma posicion
    var extensionArchivo = nombreCortado[nombreCortado.length - 1]

    //Filtrar extensiones
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extension validas son ' + extensionesValidas.join(', ') }
        });
    }

    //crear nombre archivo personalizado
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

    //Mover Archivo desde temporal o un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;
    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res);
    });

});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {
            var pathViejo = './uploads/usuarios/' + usuario.img;

            //si existe una imagen la elimina
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {
                usuarioActualizado.password = ':)'
                return res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada correctamente',
                    usuario: usuarioActualizado
                })
            })
        });
    }

    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {
            var pathViejo = './uploads/medicos/' + medico.img;

            //si existe una imagen la elimina
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada correctamente',
                    medico: medicoActualizado
                })
            })
        });
    }

    if (tipo === 'hospitales') {

        Hospital.findById(id, (err, hospital) => {
            var pathViejo = './uploads/hospitales/' + hospital.img;

            //si existe una imagen la elimina
            if (fs.existsSync(pathViejo)) {
                fs.unlinkSync(pathViejo)
            }

            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'imagen actualizada correctamente',
                    hospital: hospitalActualizado
                })
            })
        });
    }

}

module.exports = app;