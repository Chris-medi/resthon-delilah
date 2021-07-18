const express = require('express');
const routerDelete = express.Router();
const {validate_rol } = require('../../js/validar-rol');
const {connection} = require('../../connection')

routerDelete.delete('/product/:id',validate_rol,(req,res) => {
    const {id} = req.params
    connection.query('SELECT * FROM Products WHERE Product_id = ?',[id],(err,rows) =>{
        if(err){
            re.status(500).json({
                message:"Error en el servidor"
            })
        }
        res.json({
            message:"Producto borrado exitosamente"
        })
    })
    // console.log(id)
})

module.exports =routerDelete;