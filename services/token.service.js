'use strict'

const { use, promise, reject } = require('bcrypt/promises');
const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../config');

const SECRET = require('../config').secret;
const EXP_TIME =require('../config').tokenExpTmp;

// crearToken
//
// Devuelve un token tipo JWT
// Formato JWT:
//      HEADER.PAYLOAD.VERIFY_SIGNATURE
//
//  Donde:
//      HEADER (Objeto JSON con el algoritmo codificado en base 64)
//          {
//              
//              "alg": "HS256",
//              "typ": "JWT"
//          }
//       PAYLOAD 
//          {
//              "sub": "1234567890",
//              "name": "John Doe",
//              "iat": 1516239022
//          }
//      VERIFY:SIGNATURE = HMACSHA256( base64UrlEncode(HEAD)+"."+base64UrlEncode(PAYLOAD), SECRET)
//}
//

function crearToken( user ) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(EXP_TIME, 'minutes').unix()
    };
    return jwt.encode( payload, SECRET );
}

//decodificaToken
//
// devuelve el identificador del usuario
//

function decodificaToken( token ) {
    return new Promise( (resolve, reject) => {
        try{
            const payload = jwt.decode( token, SECRET, true );
            if(payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'EL token ha caducado'
                });
            }
            console.log( payload );
            resolve( payload.sub );
        } catch {
            reject({
                status: 500,
                messge: 'El token no es válido'
            });
        }
    });
}

module.exports = {
    crearToken,
    decodificaToken
};