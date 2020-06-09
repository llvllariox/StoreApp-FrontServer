var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es Obligatorio'] },
    activo: { type: Boolean, required: [true, 'Nombre es Obligatorio'] },
    img: { type: String },
});

//categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);