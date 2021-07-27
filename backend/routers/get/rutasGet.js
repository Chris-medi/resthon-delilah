const express = require('express');
const routerGet = express.Router();

const {connection} = require('../../connection')
const {validar_token} = require('../../js/token')
const {validate_rol} = require('../../js/validar-rol')



// routerGet.get('/users',(req,res)=>{
//     // res.send("estos es una repuesta a tu solicitud")
//     connection.query('SELECT * FROM Users',(err,rows)=>{
//         if(err){
//             res.status(500).json({
//                 message:"error intente mas tarde"
//             })
//         }
//         res.json({
//             message:"operacion exitosa!!",
//             data:{
//                 rows
//             }
//         })
//     })
// })

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

routerGet.get('/orders',validate_rol,(req,res)=>{
  connection.query('SELECT * FROM Orders',(err,rows)=>{
      if(err){
          res.status(500).json({
              message: "Error en el servidor vuelve a intentarlo"
          })
          rs.json({
              message: "Todas las ordenes",
              data:{
                  rows
              }
          })
      }
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
                if(err){
                    res.status(500).json({
                        message: "Error en le servidor vuelve a intentarlo"
                    })
                }
                res.json({
                    data:{
                        rows
                    }
                })
            })

        }
    }
})

module.exports = routerGet