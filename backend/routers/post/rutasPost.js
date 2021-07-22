const express = require('express');
const routerPost = express.Router();

const { validate_information,validate_product,validate_orden } = require('../../../schema/validat/validat-join');
const {validate_rol} = require('../../js/validar-rol')
const {encriptar,comparar_hash} = require('../../js/bcrypt');
const {crear_token,validar_token} = require('../../js/token');
const { connection } = require('../../connection');


//--------------router users post -------------------
routerPost.post('/signup',async(req,res)=>{
    const {fullName,email,userName,password} = req.body
    const validate_joi = validate_information(req.body); 
    if(validate_joi.error == null){
            //------------------no correo repetidos
        connection.query(`SELECT * FROM Users WHERE email = ?`,[email],(err,rows)=>{
            // console.log(rows)
            if(rows.length > 0){
                user_error()
            }else{
                crear_user()
            }
        });

       const crear_user = ()=>{
            const sql = 'INSERT INTO Users (email,fullName, userName, password, rol) VALUES (?,?,?,?,?)'
            
            let hash_password = encriptar(password)
            let Rol = false

            connection.query(sql,[email,fullName,userName,hash_password,Rol],(err,rows)=>{
                if(err){
                    res.status(500).json({ status:false,message: "Error!!, intente nuevamente", data:err })
                }else{
                    res.json({ status: true, message: "Usuario registrado exitosamente" })
                }
            })

        } 
        const user_error = ()=>{
            res.status(400).json({
                message: "email ya existe"
            })
        }
    }

    if(validate_joi.error!=null){
        res.status(403).json({
            status:false,
            message: "datos invalidos",
            error: validate_joi.error.details[0].message
        })
    }

})










//-------------- create product
routerPost.post('/product',validate_rol,(req,res)=>{
  let result_valid =   validate_product(req.body)
  if(result_valid.error == null){
      const {link_imagen,price,name} = req.body
            const sql = "INSERT INTO Products (link_image, name_product, price) VALUES (?,?,?)"
      connection.query(sql,[name,price,link_imagen],(err,rows)=>{
          if(!err){
            res.json({
                message: "producto agregado exitosamente a la base de datos"
            })
          }
          res.status(500).json({
            message: "error en el servidor"
        })
      })
    
  }else{
      res.status(400).json({
          message: "datos invalidos",
          error: result_valid.error.details[0].message
      })
  }
})


//---------------------------------crear una orden--------

routerPost.post('/order',async(req,res) => {
    const {products_id} = req.body
    const {authorization} = req.headers

    const valid =  validate_orden(req.body)

    if(authorization == null){
        res.status(400).json({
            message: "se requiere token"
        })
    }
    //recibo los productos uno o varios
   
    const promise_total_price = new Promise((resolve,rejet)=>{
      connection.query(`SELECT SUM(price) FROM Products WHERE product_id IN (?) `,[products_id],(err,rows) =>{
          if(err){
              res.status(500).json({
                  message: "Error vuelve a intertarlo",
                  error:err
                })
            }
            resolve(rows[0]['SUM(price)'])
            // console.log(rows[0]['SUM(price)'])
      })
  })
    const promise_search_user = new Promise((resolve,rejet)=>{
        const {info_descode} = validar_token(authorization)
        connection.query(`SELECT ID FROM Users WHERE email= ?`,[info_descode],(err,rows) =>{
            if(!err){
                resolve(rows[0].ID)
            }
        })
    }) 
    const create_orden = (id_details,price,user_id)=>{
        const sql = 'INSERT INTO `Orders`( `detail_id`, `total_price`, `user_id`) VALUES (?,?,?)'
        connection.query(sql,[id_details,price,user_id],(err,rows) => {
            if(err){
                res.status(500).json({
                    message: "Error en el servidor",
                    error:err
                })
            }
            res.json({
                message: "Orden creada",
                id:rows
            })
            
        })
    }

    if(valid.error == null){
      promise_total_price.then(res =>{
          console.log(res)
          promise_search_user.then(result =>{
              console.log(result)
              create_orden(1,res,result)
          })
      })
        
    }else{
        res.status(400).json({
            message: "Error, datos invalidos",
            error:valid.error.details[0].message
        })
    }
})

module.exports = routerPost