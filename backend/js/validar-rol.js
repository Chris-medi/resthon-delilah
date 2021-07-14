const {validar_token} = require('./token');
const {connection} = require('../connection');
const { response } = require('express');


const validate_rol = (req,res,next)=>{
    const {token} = req.params;
    const  {info_descode} = validar_token(token);
    connection.query('SELECT * FROM Users Where email = ',[info_descode],(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"Error en el servidor"
            })
        }
        if(rows.email == info_descode){
            next()
        }else{
            res.status(403).send("No tienes permisos para realizar esta tarea")
        }
    })


}