//const Role = require('../models/role');

const Usuario = require("../models/Usuario");
const Lista = require("../models/Lista");
const Eleccion = require("../models/Eleccion");
const Candidato = require("../models/Candidato");
const Cargo = require("../models/Cargo");



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

const existeCedulaUser = async( cedula='' ) => {

    // Verificar si el correo existe
    const existeCedula = await Usuario.findOne({ cedula });
    console.log('llega a validar cedula', cedula)
    if ( existeCedula ) {
        throw new Error(`La cedula: ${ cedula }, ya está registrada`);
    }
}


const existeCargoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCargo = await Cargo.findById(id);
    if ( !existeCargo ) {
        throw new Error(`El id cargo no existe ${ id }`);
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


const existeLista = async( nombre='' ) => {

    // Verificar si el correo existe
    const existeLista = await Lista.findOne({ nombre });
  
    if ( existeLista ) {
        throw new Error(`La ${ nombre }, ya está registrada`);
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
    existeCandidatoPorId,
    existeCargoPorId,
    existeCedulaUser,
    existeLista 
}

