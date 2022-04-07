'use strict'

const TokenService = require('./services/token.service');
const moment = require('moment');

//Datos para simulación...
const miPass = "miContraseña";
const badPass = "miOtraContraseña";
const usuario = {
        _id: '123456789',
        email: 'acv41@alu.ua.es',
        displayName: 'Amanda Cascales',
        password: miPass,
        signUpDate: moment().unix(),
        lastLogin: moment().unix()
};

console.log(usuario);

// Creamos un token...

const token = TokenService.crearToken( usuario );
//console.log(token);

//Decodificar un token
TokenService.decodificaToken( token)
    .then(userId => {
        return console.log(`ID1: ${userId}`);
    })
    .catch( err => console.log(err));

//Decodificar un token erroneo
const badToken = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

TokenService.decodificaToken( badToken)
.then(userId => {
    return console.log(`ID2: ${userId}`);
})
.catch( err => console.log(err));


