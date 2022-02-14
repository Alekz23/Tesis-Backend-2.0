const { Schema, model } = require('mongoose');

const CandidatoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    apellido: {
        type: String,
        required: true,
        
    },
    cargo: {
        type: String,
        required: true,
        
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    lista: {
        type: Schema.Types.ObjectId,
        ref: 'Lista',
        required: true
    }
});


CandidatoSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}


module.exports = model( 'Candidato', CandidatoSchema );
