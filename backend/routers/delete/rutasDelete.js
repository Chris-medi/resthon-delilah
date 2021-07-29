const express = require('express');
const routerDelete = express.Router();

const {connection} = require('../../connection')

const httpError500 = require('../../helper/dandleError')

routerDelete.delete('/product/:id',(req,res) => {
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

routerDelete.delete('/order/:id',(req,res)=>{
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            message: "id required"
        })
    }
    connection.query('DELETE  FROM Orders where orders_id = ?',[id],(err,rows)=>{
        httpError500(err,res)
        res.json({
            message:"La Orden a sido borrada exitosamente"
        })
    })
})

module.exports =routerDelete;