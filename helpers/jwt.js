const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre,rol, cedula ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, nombre, rol, cedula };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '4h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}



module.exports = {
    generarJWT
}


