'use strict'

const port = process.env.PORT || 3000

const https = require('https');
const fs = require('fs');

const OPTIONS_HTTPS ={
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const PassService = require('./services/pass.service');
const TokenService = require('./services/token.service'); 
const moment = require('moment');

const app = express();

var db = mongojs("SD");
var id = mongojs.ObjectID;

const cors = require ('cors');
const { Module } = require('module');
const { isModuleNamespaceObject } = require('util/types');
const { tokenExpTmp } = require('./config');



//middlewares

var allowCrossTokenHeader = (req, res, next) => {
    res.header("Access-Control-Allow-Headers","*");
    return next();
};

var allowCrossTokenOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    return next();
};

var auth = (req, res, next) => {
    const jwt=req.headers.authorization.split(' ')[1];
    TokenService.decodificaToken(jwt)
    .then(userId => {
        req.user = { 
            id: userId,
            token: jwt
         }
        return next();
    })
    .catch( err => res.json({res: 'ko', error: err}));
};

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);

//rutas

app.get('/api/user', auth,(req, res, next) =>{

    db.usuario.find((err, usuarios) =>{
        if (err) return next(err);
        res.json(usuarios);
    });
});

app.get('/api/user/:id', auth, (req, res, next) =>{
    db.usuario.findOne({_id: id(req.user.id)},(err, elemento) =>{
        if (err) return next(err);
        res.json(elemento);
    });
});

app.post('/api/user', auth, (req, res, next) =>{
    const user = req.body;

    if(!user.nombre) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <nombre>'
        });
    } else if (!user.password) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <password>'
        });

    } else if (!user.email) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <email>'
        });
    }else {
        db.usuario.findOne({email: user.email},(err, usuario) =>{
            if (err) return next(err);
            if(usuario) {
                res.status(400).json ({
                    result: 'ko',
                    error:'Bad Data',
                    message: 'Usuario ya creado'
                });
            }else{
                PassService.encriptaPassword(user.password).then( hash => {        
                    user.password = hash;
        
                    const usuario = {
                        nombre: user.nombre,
                        email: user.email,
                        password: user.password
                    }
        
                db.usuario.save(usuario, (err, coleccionGuardada) => {
                    if (err) return next(err);
                    res.json({
                        result: 'ok',
                        usuario: coleccionGuardada,
                    })
                });
                });
            }
        });
    }
});

app.put('/api/user/:id', auth, (req, res, next) => {
    const user = req.body;
    db.usuario.update({_id: id (req.user.id) },
        {$set: user}, {safe: true, multi: false}, (err,msg) => {
            if(err) return next(err);
            res.json({
                result: 'ok',
                usuario: user
            }); 
        });
});

app.delete('/api/user/:id', auth, (req, res, next) => { //hacer como arriba


    db.usuario.remove({_id: id(req.user.id)}, (err, resultado) =>{
        if (err) return next(err);
        res.json({
            result: 'ok',
            resultado: resultado
        });
    });
});

app.get('/api/auth',auth, (req, res, next) =>{ 

    db.usuario.find({},{nombre:1, email:1, _id:0}, (err,coleccion) =>{
        if (err) return next(err);
        res.json({
            result: 'ok',
            usuario: coleccion
        }); //hacer como arriba
    });
});

app.get('/api/auth/me', auth, (req, res, next) =>{

    db.usuario.findOne({_id: id (req.user.id)},(err, user) =>{

        if (err) return next(err);
        if(user){
            res.json({
                result: 'ok',
                usuario: user
            });
        } else{
            res.status(200).json({
                result: 'ko',
                message:  `Usuario ${req.user.id} no encontrado` 
            })
        }
    });
});
app.post('/api/auth', (req, res, next) => {

    const body = req.body;

    db.usuario.findOne({ email: body.email }, (err, usuarioDB) =>{
        if(err) {
            return res.status(500).json({
                ok:false,
                err: err
            })
        }
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err: {
                    message: "Usuario incorrecto"
                }
            })
        }
            PassService.comparaPassword(body.password, usuarioDB.password)
            .then(isOK =>{
                if(isOK){   
                    usuarioDB.lastLogin = moment().unix();
                    db.usuario.update({_id: id (usuarioDB.id) },
                    {$set: usuarioDB}, {safe: true, multi: false}, (err,msg) => {
                        if(err) return next(err);
                    });
                    const token = TokenService.crearToken( usuarioDB );        
                    res.json({
                        result: 'ok',
                        usuario: usuarioDB,
                        token: token
                    });
                }else {
                    res.status(200).json({
                        result: 'ko',
                        message:  `Usuario  no encontrado` 
                    })
                }
            })
    })
});
app.post('/api/reg', (req, res, next) => {
    const  user = req.body;

    if(!user.nombre) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <nombre>'
        });
    } else if (!user.password) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <password>'
        });

    } else if (!user.email) {
        res.status(400).json ({
            error: 'Bad Data',
            description: 'Se precisa un campo <email>'
        });
    
    } else {
         PassService.encriptaPassword(user.password).then( hash => {        
            user.password = hash;

            const usuario = {
                nombre: user.nombre,
                email: user.email,
                password: user.password,
                signUpDate: moment().unix(),
                lastLogin: moment().unix()
            }

        db.usuario.save(usuario, (err, coleccionGuardada) => {
            if (err) return next(err);
            const token = TokenService.crearToken( coleccionGuardada );
            res.json({
                result: 'ok',
                usuario: coleccionGuardada,
                token: token
            })
        });
        });
    }
});


//iniciamos la app

https.createServer(OPTIONS_HTTPS, app).listen(port, () => {
    console.log(`SEC WS API REST CRUD con DB ejecutándose en https://localhost:${port}/api/user/:id`);
    
});