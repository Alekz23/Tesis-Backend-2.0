const { Router } = require('express');
const { check } = require('express-validator');

const { getListas, crearLista, actualizarLista, eliminarLista } = require('../controllers/lists');
const { existeListaPorId, existeEleccionPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', getListas );

// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeListaPorId ),
//     validarCampos,
// ], obtenerLista );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('eleccion','No es un id de Mongo').isMongoId(),
    check('eleccion').custom( existeEleccionPorId ),
    validarCampos
], crearLista );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom( existeListaPorId ),
    validarCampos
], actualizarLista );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeListaPorId ),
    validarCampos,
], eliminarLista);


module.exports = router;