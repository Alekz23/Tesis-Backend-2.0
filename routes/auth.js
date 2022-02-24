/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken, getUsuarios, eliminarUsuario, actualizarUsuario } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeUsuarioPorId, existeCedulaUser } = require('../helpers/db-validators');


const router = Router();

router.get('/', getUsuarios );


router.post(
    '/new', 
    [ // middlewares
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El email es obligatorio').isEmail(),
        check('cedula').custom( existeCedulaUser ), //busca en la bdd si existe esa lista 
        check('cedula', 'La cedula debe tener 10 caracteres').isLength({ min: 10 }),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/login',
    [
        check('correo', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    //check('rol').custom( esRoleValido ), 
    validarCampos
],actualizarUsuario );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    //tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],eliminarUsuario );


router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;