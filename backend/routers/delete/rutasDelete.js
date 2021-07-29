const express = require('express');
const routerDelete = express.Router();

const {connection} = require('../../connection')

const httpError500 = require('../../helper/dandleError')

const {validate_rol } = require('../../js/validar-rol')
routerDelete.delete('/product/:id',validate_rol,(req,res) => {
    const {id} = req.params
    if(!id){
        res.status(400).json({
            message: "id required"
        })
    }
    connection.query('DELETE  FROM Products WHERE Product_id = ?',[id],(err,rows) =>{
        httpError500(err,res)
        res.json({
            message:"El producto a sido borrado exitosamente"
        })
    })
})

routerDelete.delete('/order/:id',validate_rol,(req,res)=>{
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            message: "id required"
        })
    }
    connection.query('DELETE  FROM Orders where order_id = ?',[id],(err,rows)=>{
        httpError500(err,res)
        res.json({
            message:"La Orden a sido borrada exitosamente"
        })
    })
})

module.exports =routerDelete;