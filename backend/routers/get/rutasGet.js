const express = require('express');
const routerGet = express.Router()

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