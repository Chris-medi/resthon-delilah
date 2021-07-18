const express = require('express');
const routerGet = express.Router()

const {connection} = require('../../connection')



routerGet.get('/users',(req,res)=>{
    // res.send("estos es una repuesta a tu solicitud")
    connection.query('SELECT * FROM Users',(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"error intenete mas tarde"
            })
        }
        res.json({
            message:"operacion exitosa",
            data:{
                rows
            }
        })
    })
})

routerGet.get('/products',(req,res)=>{
    res.json({
        message: "esto seria una lista de productos"
    })
})

routerGet.get('/orders',(req,res)=>{
    res.json({
        message:"Esto sera todas las orden y sus estados"
    })
})

routerGet.get('/user',(req,res)=>{
    res.json({
        message:"Informacion del usuario"
    })
})

module.exports = routerGet