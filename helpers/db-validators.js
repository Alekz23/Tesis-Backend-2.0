//const Role = require('../models/role');

const Usuario = require("../models/Usuario");
const Lista = require("../models/Lista");
const Eleccion = require("../models/Eleccion");
const Candidato = require("../models/Candidato");



// const esRoleValido = async(rol = '') => {

//     const existeRol = await Role.findOne({ rol });
//     if ( !existeRol ) {
//         throw new Error(`El rol ${ rol } no está registrado en la BD`);
//     }
// }

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id usuario no existe ${ id }`);
    }
}

/**
 * Categorias
 */
const existeEleccionPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Eleccion.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id eleccion no existe ${ id }`);
    }
}

/**
 * Productos
 */
const existeListaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Lista.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id lista no existe ${ id }`);
    }
}

const existeCandidatoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Candidato.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id candidato no existe ${ id }`);
    }
}


module.exports = {
   
    emailExiste,
    existeUsuarioPorId,
    existeEleccionPorId,
    existeListaPorId,
    existeCandidatoPorId
}

