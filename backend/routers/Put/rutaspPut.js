const express = require('express');
const routerPut = express.Router();
const {validate_rol} = require('../../js/validar-rol')
const {connection} = require('../../connection')
const {validate_product_update,validate_update_status} = require('../../../schema/validat/validat-join')


routerPut.put('/product',validate_rol,(req,res)=>{
    const {id,name,price,link_imagen} = req.body;
    // console.log(req.body)
    const validar = validate_product_update(req.body);
    if(validar.error == null){
        const sql = "UPDATE Products SET link_image=?,name_product=?,price=? WHERE product_id = ? "
        connection.query(sql,[link_imagen,name,price,id],(err,rows)=>{
            // console.log(rows)
            if(err){
                res.status(500).json({
                    message:"error",
                    error:err
                })
            }
            res.json({
                message:"actualizacion exitosa"
            })
        })
    }else{
        res.status(400).json({
            message: "Error",
            error:validar.error.details[0].message
        })
    }

    // res.json({
    //     message:"esto sera un edpoint para actualizar productos"
    // })s
});

routerPut.put('/order',validate_rol,(req,res)=>{
    const {body} = req
    const sql = 'UPDATE `Orders` SET status_orden`=? WHERE  orders_id = ?'
   const result_validation =validate_update_status(body)
    // connection.query(sql,[],(err,rows)=>{

    // })
    if(result_validation){
        res.json({
            message:"es valido"
        })
    }
    res.json({
        message:"esto sera un edpoint para actualizar estado de la orden"
    })
})

module.exports = routerPut