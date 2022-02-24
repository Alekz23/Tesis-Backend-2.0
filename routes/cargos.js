/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeCargoPorId } = require('../helpers/db-validators');
const { getCargos, crearCargo, eliminarCargo } = require('../controllers/cargos');


const router = Router();

router.get('/', getCargos );


router.post(
    '/', 
    [ // middlewares
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCargo
);


router.delete('/:id',[
    validarJWT,

    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCargoPorId ),
    validarCampos
],eliminarCargo );






module.exports = router;