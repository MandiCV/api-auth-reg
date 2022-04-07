'use strict'

//formato del hash:
//      $2b$10$A8kddWUa6PQ06tmUMbNckuLHIlWulIuDbqtUDOYFpOpJrwvfO3LQS
//      ****-- ***********************+++++++++++++++++++++++++++++++
//      Alg Cost        Salt                        Hash

const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');

//Datos para simulación...
const miPass = "miContraseña";
const badPass = "miOtraContraseña";

// salt = bcrypt.salt( 10 );
//hash = bcrypt.has( miPass, salt );
// db.users.update(id, hash);
//db.account.hash.update(id, salt);

//Creamos el Salt

bcrypt.genSalt(15, (err, salt) => {
    console.log(`Salt 1: ${salt}`);
    
    //Utilizamos el Salt para generar un hash...
    bcrypt.hash( miPass, salt, (err, hash) => {
        if (err) console.log(err);
        else console.log (`Hash 1: ${hash}`);
    });
});

//Creamos el hash directamente...
bcrypt.hash( miPass, 10, (err, hash) => {
    if(err) console.log(err);
    else    {
        console.log(`Hash 2: ${hash}`);

        //Comprobamos utilizando la contraseña correcta...
        bcrypt.compare( miPass, hash, (err, result) =>{
            console.log(`Resultado 2.1: ${result}`);
        });

        //Comprobamos utilizando la contraseña incorrecta...
        bcrypt.compare( miPass, badPass, (err, result) =>{
            console.log(`Resultado 2.2: ${result}`);
        });
    };
});

