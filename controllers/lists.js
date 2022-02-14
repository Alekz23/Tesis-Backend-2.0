const { response } = require('express');
const Lista = require('../models/Lista');

const getListas = async (req, res = response) => {

    const listas = await Lista.find()
    .populate('usuario','nombre')
                    .populate('eleccion', 'nombre');

    res.json({
        ok: true,
        listas
    });
}

const crearLista = async (req, res = response) => {

    const lista = new Lista(req.body);

    try {

        lista.usuario = req.uid;
        //lista.eleccion= req.eleccion.name
      
    

        const listaGuardado = await lista.save();

        res.json({
            ok: true,
            lista: listaGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarLista = async (req, res = response) => {

    const listaId = req.params.id;
    const uid = req.uid;

    try {

        const lista = await Lista.findById(listaId);

        if (!lista) {
            return res.status(404).json({
                ok: false,
                msg: 'Lista no existe por ese id'
            });
        }

        // if ( lista.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este '
        //     });
        // }

        const nuevaLista = {
            ...req.body,
            user: uid
        }

        const listaActualizado = await Lista.findByIdAndUpdate(listaId, nuevaLista, { new: true });

        res.json({
            ok: true,
            lista: listaActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarLista = async (req, res = response) => {

    const listaId = req.params.id;
    const uid = req.uid;

    try {

        const lista = await Lista.findById(listaId);

        if (!lista) {
            return res.status(404).json({
                ok: false,
                msg: 'Lista no existe por ese id'
            });
        }

        // if ( lista.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Lista.findByIdAndDelete(listaId);

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
    getListas,
    crearLista,
    actualizarLista,
    eliminarLista
}