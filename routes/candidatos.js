const { Router } = require('express');
const { check } = require('express-validator');


const { getCandidatos, crearCandidato, actualizarCandidato, eliminarCandidato } = require('../controllers/candidates');
const { existeCandidatoPorId, existeListaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', getCandidatos );

// Obtener una categoria por id - publico
// router.get('/:id',[
//     check('id', 'No es un id de Mongo válido').isMongoId(),
//     check('id').custom( existeCandidatoPorId ),
//     validarCampos,
// ], obtenerCandidato );

// Crear candidato - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('lista','No es un id de Mongo').isMongoId(), //verifica si es un id valido
    check('lista').custom( existeListaPorId ), //busca en la bdd si existe esa lista 
    validarCampos
], crearCandidato );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom( existeCandidatoPorId ),
    validarCampos
], actualizarCandidato );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCandidatoPorId ),
    validarCampos,
], eliminarCandidato);


module.exports = router;