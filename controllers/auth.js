const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const bcryptjs = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    const { correo, password, cedula } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }


        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });




        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese correo'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        //confirmar si el ususario ya dio el votos
        if (usuario.vote === true) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya ha votado!'
            });
        }


        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.nombre, usuario.rol, usuario.cedula);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.nombre,
            cedula: usuario.cedula,
            rol: usuario.rol,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}


const revalidarToken = async (req, res = response) => {

    const { uid, nombre, rol, cedula } = req;

    // Generar JWT
    const token = await generarJWT(uid, nombre, rol, cedula);

    res.json({
        ok: true,
        uid, nombre,
        rol,
        cedula,
        token
    })
}


const getUsuarios = async (req, res = response) => {

    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });
}


const actualizarUsuario = async (req, res = response) => {

    const { id } = req.params;
    const {password} = req.body;
    let updateUser= req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        updateUser.password = bcryptjs.hashSync(password, salt);
    }
    //console.log(resto, 'resto------');
    console.log(updateUser, 'update');
    const usuario = await Usuario.findByIdAndUpdate(id, updateUser);

    res.json({
        ok: true,
        usuario
    });

}

const eliminarUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;
    //const uid = req.uid;

    try {

        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'User no existe por ese id'
            });
        }


        await Usuario.findByIdAndDelete(usuarioId);

        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    getUsuarios,
    loginUsuario,
    revalidarToken
}