const express = require('express');
const routerGet = express.Router();

const {connection} = require('../../connection')



routerGet.get('/users',(req,res)=>{
    // res.send("estos es una repuesta a tu solicitud")
    connection.query('SELECT * FROM Users',(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"error intente mas tarde"
            })
        }
        res.json({
            message:"operacion exitosa!!",
            data:{
                rows
            }
        })
    })
})

routerGet.get('/products',(req,res)=>{
     connection.query('SELECT * FROM Products',(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"Error en el servidor"
            })
        }
        res.json({
            message:"productos disponibles",
            data:rows
        })
        
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