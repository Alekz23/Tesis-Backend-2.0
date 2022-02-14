const { response } = require('express');
const Eleccion = require('../models/Eleccion');

const getElecciones = async( req, res = response ) => {

    const elecciones = await Eleccion.find()
                                .populate('user','name');

    res.json({
        ok: true,
        elecciones
    });
}

const crearEleccion = async ( req, res = response ) => {

    const eleccion = new Eleccion( req.body );

    try {

        eleccion.usuario = req.uid;
        console.log(eleccion.user, 'maldita manda eso')
        
        const eleccionGuardado = await eleccion.save();

        res.json({
            ok: true,
            eleccion: eleccionGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEleccion = async( req, res = response ) => {
    
    const eleccionId = req.params.id;
    const uid = req.uid;

    try {

        const eleccion = await Eleccion.findById( eleccionId );

        if ( !eleccion ) {
            return res.status(404).json({
                ok: false,
                msg: 'Eleccion no existe por ese id'
            });
        }

        // if ( eleccion.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de editar este evento'
        //     });
        // }

        const nuevaEleccion = {
            ...req.body,
            user: uid
        }

        const eleccionActualizado = await Eleccion.findByIdAndUpdate( eleccionId, nuevaEleccion, { new: true } );

        res.json({
            ok: true,
            eleccion: eleccionActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEleccion = async( req, res = response ) => {

    const eleccionId = req.params.id;
    const uid = req.uid;

    try {

        const eleccion = await Eleccion.findById( eleccionId );

        if ( !eleccion ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        // if ( eleccion.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegio de eliminar este evento'
        //     });
        // }


        await Eleccion.findByIdAndDelete( eleccionId );

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
    getElecciones,
    crearEleccion,
    actualizarEleccion,
    eliminarEleccion
}