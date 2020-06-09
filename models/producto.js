var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// var rolesValidos = {
//     values: ['ADMIN_ROLE', 'USER_ROLE'],
//     message: '{VALUE} no es un rol permitido'
// }


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'Nombre es Obligatorio'] },
    precio: { type: Number, required: [true, 'Precio es Obligatorio'] },
    descripcion: { type: String, required: [true, 'Descripcion es Obligatorio'] },
    stock: { type: Number, required: [true, 'Stock es Obligatorio'] },
    categoria: { type: String, required: [true, 'Categoria es Obligatorio'] },
    oferta: { type: Boolean, required: [true, 'Oferta es Obligatorio'] },
    destacado: { type: Boolean, required: [true, 'Destacado es Obligatorio'] },
    nuevo: { type: Boolean, required: [true, 'Nuevo es Obligatorio'] },
    descuento: { type: Number },
    activo: { type: Boolean, required: [true, 'Activo es Obligatorio'] },
    img: { type: String },

});

// productoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Producto', productoSchema);