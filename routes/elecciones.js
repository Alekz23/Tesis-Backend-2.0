const { Router } = require('express');
const { check } = require('express-validator');


const { getElecciones, eliminarEleccion, actualizarEleccion, crearEleccion } = require('../controllers/elections');
const { existeEleccionPorId } = require('../helpers/db-validators');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');





const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', getElecciones );

// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeEleccionPorId ),
//     validarCampos,
// ], obtenerEleccion );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom( isDate ),
    check('end','Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
], crearEleccion );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEleccionPorId ),
    validarCampos
],actualizarEleccion );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEleccionPorId ),
    validarCampos,
],eliminarEleccion);



module.exports = router;