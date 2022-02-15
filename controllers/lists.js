const { response } = require('express');
const Eleccion = require('../models/Eleccion');
const Lista = require('../models/Lista');
const { addTest, addLista, eliminarlistEleccion } = require('./elections');

const getListas = async (req, res = response) => {

    const listas = await Lista.find()
    .populate('usuario','nombre')
                    .populate('eleccion', 'nombre')
                    .populate('candidates');

    res.json({
        ok: true,
        listas
    });
}


const getLista = async ( req, res = response )=>{
    const { id } = req.params;

    const listas = await Lista.findById(id).populate('candidates');

    res.json({
        ok: true,
        listas
    });
}

const crearLista = async (req, res = response) => {

    const lista = new Lista(req.body);
    const eleccion = req.body.eleccion;

    try {

        lista.usuario = req.uid;
        //lista.eleccion= req.eleccion.name
      
    

        const listaGuardado = await lista.save();
        await addLista(eleccion, listaGuardado)
        //await addTest(eleccion);

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
    const eleccion = req.id;

    console.log(eleccion, 'que me trae');


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
        //await eliminarlistEleccion("620aaedc7d488912340341e7",listaId);

        res.json({ ok: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const addCandidate= async (listaId, candidato)=>{
    try {
        const lista = await Lista.findById( listaId ).exec();
        console.log(lista,'metodo addlista');
        lista.candidates.push(candidato);
        console.log(lista.lists,'metodo addlista');

        await lista.save();
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getListas,
    crearLista,
    actualizarLista,
    eliminarLista,
    getLista,
    addCandidate
    
}