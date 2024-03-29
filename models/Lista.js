const { Schema, model } = require('mongoose');

const ListaSchema = Schema({
    nombre: {
        type: String,
        required: true,
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
    },
    img:{
        type: String,
    },
    voteBN:{
        type: Boolean,
        default: false
    },
    agregado:{
        type: Boolean,
        default: false
    },
    candidates:[{
        type: Schema.Types.ObjectId,
        ref: 'Candidato'
    }]
});


ListaSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}


module.exports = model('Lista', ListaSchema);
