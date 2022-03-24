const { Schema, model } = require('mongoose');

const CargoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
   
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
});


CargoSchema.methods.toJSON = function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
}


module.exports = model( 'Cargo', CargoSchema );
