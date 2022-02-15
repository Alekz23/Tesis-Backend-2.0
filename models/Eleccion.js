const { Schema, model } = require('mongoose');

const EleccionSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true, 
    },

    start:{
        type: Date,
        required: true, 

    },
    end:{
        type: Date,
        required: true

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    ,lists:[{
        type: Schema.Types.ObjectId,
        ref: 'Lista'
    }]
});


EleccionSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}


module.exports = model( 'Eleccion', EleccionSchema );
