
const { response } = require('express');
const Cargo = require('../models/Cargo');

const getCargos = async (req, res = response) => {

    const cargos = await Cargo.find()

    res.json({
        ok: true,
        cargos
    });
}

const crearCargo = async (req, res = response) => {

    const cargo = new Cargo(req.body);
    //const lista = req.body.lista;

    try {

        cargo.usuario = req.uid;

        const cargoGuardado = await cargo.save();
        //await addCandidate(lista, cargoGuardado)


        res.json({
            ok: true,
            cargo: cargoGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const eliminarCargo = async (req, res = response) => {

    const cargoId = req.params.id;
    //const uid = req.uid;

    try {

        const cargo = await Cargo.findById(cargoId);

        if (!cargo) {
            return res.status(404).json({
                ok: false,
                msg: 'Cargo no existe por ese id'
            });
        }

        await Cargo.findByIdAndDelete(cargoId);

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
    getCargos,
    crearCargo,
    eliminarCargo
}