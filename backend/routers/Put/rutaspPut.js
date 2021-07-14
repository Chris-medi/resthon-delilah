const express = require('express');
const routerPut = express.Router();


routerPut.put('/product',(req,res)=>{
    res.json({
        message:"esto sera un edpoint para actualizar productos"
    })
});

routerPut.put('/order',(req,res)=>{
    res.json({
        message:"esto sera un edpoint para actualizar estado de la orden"
    })
})

module.exports = routerPut