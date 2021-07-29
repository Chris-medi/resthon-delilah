const express = require('express');
const routerGet = express.Router();

const {connection} = require('../../connection')
const {validar_token} = require('../../js/token')
const {validate_rol} = require('../../js/validar-rol')
const httpError500 = require('../../helper/dandleError')


// })

routerGet.get('/products',(req,res)=>{
     connection.query('SELECT * FROM Products',(err,rows)=>{
        httpError500(err,res)
        res.json({
            message:"all products available",
            data:rows
        })
        
    })

})

routerGet.get('/orders',validate_rol,(req,res)=>{
  connection.query('SELECT * FROM Orders',(err,rows)=>{
      httpError500(err,res)
        res.json({
            message: "all orders",
            data:{
                rows
            }
        })
  })
   
})

routerGet.get('/user',(req,res)=>{
    const {authorization} = req.headers
    // console.log(authorization)
    if(authorization==null){
        res.status(400).json({
            message: "Token el requerido"
        })
    }else{
        const {info_descode,validation} = validar_token(authorization)
        if(validation){
            connection.query('SELECT * FROM Users WHERE email = ?',[info_descode],(err,rows)=>{
                httpError500(err,res)
                res.json({
                    message: "found user",
                    data:{
                        rows
                    }
                })
            })

        }
    }
})

module.exports = routerGet