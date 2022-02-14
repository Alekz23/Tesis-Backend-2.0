const { Schema, model } = require('mongoose');

const ListaSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    eleccion: {
        type: Schema.Types.ObjectId,
        ref: 'Eleccion',
        required: true
    }
});


ListaSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}


module.exports = model('Lista', ListaSchema);
