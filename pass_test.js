'use strict'

const PassService = require('./services/pass.service');
const moment = require('moment');
const { hash } = require('bcrypt');

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

//Encriptamos el password
PassService.encriptaPassword(usuario.password)
    .then(hash => {
        usuario.password = hash;
        console.log(usuario);

        //Verificamos el password
        PassService.comparaPassword(miPass, usuario.password)
            .then(isOK =>{
                if(isOK){
                    console.log('P1: El pass es correcto');
                }else {
                    console.log('P1: El pass es incorrecto')
                }
            })
            .catch( err => console.log(err));

            //Verificamos el password contra un pass falso
            PassService.comparaPassword(badPass, usuario.password)
            .then(isOK =>{
                if(isOK){
                    console.log('P2: El pass es correcto');
                }else {
                    console.log('P2: El pass es incorrecto')
                }
            })
            .catch( err => console.log(err));
    });