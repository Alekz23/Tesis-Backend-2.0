const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        unique: true,
        required: true
    },
    correo: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
    },
    
    vote:{
        type: Boolean,
        default: false
    },
    
    rol: {
        type: String,
        required: true,
        default: 'Elector',
       // emun: ['ADMIN_ROLE', 'USER_ROLE']
    }
});


module.exports = model('Usuario', UsuarioSchema );

