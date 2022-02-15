
const { response } = require('express');
const Candidato = require('../models/Candidato');
const { addCandidate } = require('./lists');

const getCandidatos = async( req, res = response ) => {

    const candidatos = await Candidato.find()
                                .populate('user','name')
                                .populate('lista', 'nombre');

    res.json({
        ok: true,
        candidatos
    });
}

const crearCandidato = async ( req, res = response ) => {

    const candidato = new Candidato( req.body );
    const lista = req.body.lista;

    try {

        candidato.usuario = req.uid;
        
        const candidatoGuardado = await candidato.save();
        await addCandidate(lista, candidatoGuardado)


        res.json({
            ok: true,
            candidato: candidatoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarCandidato = async( req, res = response ) => {
    
    const candidatoId = req.params.id;
    const uid = req.uid;

    try {

        const candidato = await Candidato.findById( candidatoId );

        if ( !candidato ) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no existe por ese id'
            });
        }

        // if ( eleccion.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este evento'
        //     });
        // }

        const nuevoCandidato = {
            ...req.body,
            user: uid
        }

        const candidatoActualizado = await Candidato.findByIdAndUpdate( candidatoId, nuevoCandidato, { new: true } );

        res.json({
            ok: true,
            candidato: candidatoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarCandidato = async( req, res = response ) => {

    const candidatoId = req.params.id;
    const uid = req.uid;

    try {

        const candidato = await Candidato.findById( candidatoId );

        if ( !candidato ) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no existe por ese id'
            });
        }

        // if ( eleccion.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Candidato.findByIdAndDelete( candidatoId );

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
    getCandidatos,
    crearCandidato,
    actualizarCandidato,
    eliminarCandidato
}