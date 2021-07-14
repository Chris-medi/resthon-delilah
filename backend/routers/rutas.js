const express = require('express');
const { validate_information } = require('../../schema/validat/validat-join');
const router = express.Router();
const app = express();
const {connection} = require('../connection');
const {encriptar,comparar_hash} = require('../js/bcrypt');
const {crear_token} = require('../js/token');
// app.use(express.json());

//edpoint usuario ingresar
router.post('/api/signin',(req,res)=>{
    const {email,password} = req.body
    console.log(req.body);

    //llamar a la base de datos
    connection.query(`SELECT * FROM USERS  WHERE  email = ?`,[email],(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"error intenete mas tarde",
                error:err.name
            })

        }
        if(!err){
          if(rows.length==0){
              res.status(400).json({
                  message:"correo no encontrado"
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
                }
            if(!contraseña){
                    res.status(400).json({    
                        status:false,
                        message:"contraseña incorrecta"
                    })
            }
        }
        }
        // res.json({
        //     message:"operacion exitosa",
        //     data:{
        //         user:rows[0].password
        //     }
        // })
    })

})


router.post('/api/signup',(req,res)=>{
    const {fullName,email,userName,password} = req.body
    const validate_joi = validate_information(req.body); 

    // console.log(body)
    // console.log(validate_joi)

    if(validate_joi.error == null){
       const sql = 'INSERT INTO USERS (email,fullName, userName, password, rol) VALUES (?,?,?,?,?,?)'

        let hash_password = encriptar(password)
        let Rol = false
        // console.log(hash_password)
        connection.query(sql,[emai,fullName,userName,hash_password,Rol],(err,rows)=>{
            if(err){
                res.status(500).json({ status:false,message: "Error!!, intente nuevamente", data:err })
            }else{
                res.json({ status: true, message: "Usuario registrado exitosamente" })
            }
        })

    }
    if(validate_joi.error!=null){
        res.status(403).json({
            status:false,
            message: "datos invalidos",
            error: validate_joi.error.name
        })
    }

})

router.get('/api/user',(req,res)=>{
    // res.send("estos es una repuesta a tu solicitud")
    connection.query('SELECT * FROM USERS',(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"error intenete mas tarde"
            })
        }
        res.json({
            message:"operacion exitosa",
            data:{
                rows
            }
        })
    })
})


router.get('/',(req,res)=>{
    res.json({ message: "bienvenido a la api delilah resthon"})
})

module.exports = router
