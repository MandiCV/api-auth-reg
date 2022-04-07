'use strict'

const bcrypt = require('bcrypt');

// encriptaPassword
//
// Devuelve un hash con un salt incluido en formato:
//      $2b$10$A8kddWUa6PQ06tmUMbNckuLHIlWulIuDbqtUDOYFpOpJrwvfO3LQS
//      ****-- ***********************+++++++++++++++++++++++++++++++
//      Alg Cost        Salt                        Hash
//
function encriptaPassword( password ) {
    return bcrypt.hash( password, 10);
}

// comparaPassword
//
// Devolver verdadero o falso si coinciden o no el pass y hash
//
function comparaPassword( password, hash) {
    return bcrypt.compare( password, hash);
}

module.exports = {
    encriptaPassword, 
    comparaPassword
};

