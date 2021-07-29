const express = require('express');
const routerPut = express.Router();

const {connection} = require('../../connection')
const {validate_product_update,validate_update_status} = require('../../../schema/validat/validat-join')

const httpError500 = require('../../helper/dandleError')
const {validate_rol} = require('../../js/validar-rol')

routerPut.put('/product',validate_rol,(req,res)=>{
    const {id,name,price,link_imagen} = req.body;
    // console.log(req.body)
    const validar = validate_product_update(req.body);
    if(validar.error == null){
        const sql = "UPDATE Products SET link_image=?,name_product=?,price=? WHERE product_id = ? "
        connection.query(sql,[link_imagen,name,price,id],(err,rows)=>{
            // console.log(rows)
            httpError500(err,res)
            res.json({
                message:"actualizacion exitosa"
            })
        })
    }else{
        res.status(400).json({
            message: "Datos invaLidos",
            error:validar.error.details[0].message
        })
    }
});

routerPut.put('/order',validate_rol,(req,res)=>{
    const {body} = req
    const {status,order_id } = body
    const result_validation = validate_update_status(body)
    // console.log(result_validation)
    if(result_validation==true){
        
       const sql = 'UPDATE Orders SET status_orden=? WHERE  orders_id = ?'
       connection.query(sql,[status,order_id],(err,rows)=>{
           httpError500(err,res)
            res.json({
                message: "Actualizacion exitosa del estado de la orden"
            })
       })
       
    }else{

        res.status(400).json({
            message:"Datos invalidos",
            details: result_validation
        })
    }
})

module.exports = routerPut