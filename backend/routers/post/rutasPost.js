const express = require('express');
const routerPost = express.Router();

const { validate_information,validate_product,validate_orden } = require('../../../schema/validat/validat-join');
const {validate_rol} = require('../../js/validar-rol')
const {encriptar,comparar_hash} = require('../../js/bcrypt');
const {crear_token,validar_token} = require('../../js/token');
const { connection } = require('../../connection');


//-------handler Error
const httpError500 = require('../../helper/dandleError')

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
                httpError500(err,res)
                res.json({ message: "Usuario registrado exitosamente" })
            })

        } 
        const user_error = ()=>{
            res.status(401).json({
                message: "email ya existe"
            })
        }
    }

    if(validate_joi.error!=null){
        res.status(400).json({
            message: "datos invalidad",
            error: validate_joi.error.details[0].message
        })
    }

})

//edpoint usuario ingresar
routerPost.post('/signin',(req,res)=>{
    const {email,password} = req.body
    // console.log(req.body);
    if(email==null || password==null){
        res.statu(400).json({
            message: "Data required",
            details: "email and password"
        })
    }
    //llamar a la base de datos
    connection.query(`SELECT * FROM Users WHERE  email = ?`,[email],(err,rows)=>{
        httpError500(err,res)
        if(!err){
            if(rows.length == null){
                res.status(404).json({
                message:"email not found "
                })
          }else{
                  const _token = crear_token(rows[0].email)
                  const contraseña = comparar_hash(password,rows[0].password);
                  if(contraseña){
                
                        res.json({
                                message:"usuario encontrado",
                                data:{
                                        userName:rows[0].userName,
                                        email:rows[0].email,
                                    },
                                token:_token
                        
                })
                }else{
                        res.status(401).json({    
                        message:"incorrect password"
                    })
            }
        }
    }
    })

})








//-------------- create product
routerPost.post('/product',validate_rol,(req,res)=>{
  let result_valid =   validate_product(req.body)
  if(result_valid.error == null){
      const {link_imagen,price,name} = req.body
            const sql = "INSERT INTO Products (link_image, name_product, price) VALUES (?,?,?)"
      connection.query(sql,[name,price,link_imagen],(err,rows)=>{

        httpError500(err,res)
        res.json({
            message: "operation successful, add product to database"
        })
      })
    
  }else{
      res.status(400).json({
          message: "data invalid",
          error: result_valid.error.details[0].message
      })
  }
})




//---------------------------------crear una orden--------

routerPost.post('/order',(req,res) => {
    const {products_id} = req.body
    const {authorization} = req.headers

    //variable para tomar id  de la ultima orden y aumentarle en uno

    const promise_last_id = new Promise(function (resolve, reject) {
        connection.query('SELECT order_id FROM Orders',(err,rows) => {
            // console.log(err)
            httpError500(err,res)
            if(!err){
                let last = rows.length
                let  last_id = rows[last-1]['order_id']
                resolve(last_id)
            }
        })
    })



    const valid =  validate_orden(req.body)

    if(authorization == null){
        res.status(401).json({
            message: "token required"
        })

    }
    //recibo los productos uno o varios
   
    const promise_total_price = new Promise((resolve,rejet)=>{
      connection.query(`SELECT SUM(price) FROM Products WHERE product_id IN (?) `,[products_id],(err,rows) =>{
        httpError500(err,res)
            resolve(rows[0]['SUM(price)'])
            // console.log(rows[0]['SUM(price)'])
      })
  })
    const promise_search_user = new Promise((resolve,rejet)=>{
        const {info_descode} = validar_token(authorization)
        connection.query(`SELECT ID FROM Users WHERE email= ?`,[info_descode],(err,rows) =>{
            httpError500(err,res)
            if(!err){
                resolve(rows[0].ID)
            }
        })
    }) 


    const create_orden = (id_details,price,user_id,products_id)=>{
        let data = products_id.map((acc)=>{
            return [id_details,acc]
        })
        // console.log(data)
        
        const sql = 'INSERT INTO `Orders`( `detail_id`, `total_price`, `user_id`) VALUES (?,?,?)'
        connection.query('INSERT INTO Details (detail_id,product_id) VALUES ?',[data],(err,rows) =>{
            httpError500(err,res)
            connection.query(sql,[id_details,price,user_id],(err,rows) => {
                httpError500(err,res)
                res.json({
                    message: "successful order creation"
                })
                
        })
        })
    }

    if(valid.error == null){
      promise_total_price.then(res =>{
        //   console.log(res)
          promise_search_user.then(result =>{
            //   console.log(result)
            promise_last_id.then(id_details =>{
                create_orden(id_details,res,result,products_id)
                
            })
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