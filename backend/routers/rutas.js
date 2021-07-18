const express = require('express');

const router = express.Router();
const app = express();
const {connection} = require('../connection');
const {encriptar,comparar_hash} = require('../js/bcrypt');
const {crear_token} = require('../js/token');
// app.use(express.json());

//edpoint usuario ingresar
router.post('/api/signin',(req,res)=>{
    const {email,password} = req.body
    // console.log(req.body);

    //llamar a la base de datos
    connection.query(`SELECT * FROM Users WHERE  email = ?`,[email],(err,rows)=>{
        if(err){
            res.status(500).json({
                message:"error intenete mas tarde",
                error:err.name
            })

            }
            if(!err){
                  if(rows.length == null){
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
                }else{
                        res.status(400).json({    
                                status:false,
                        message:"contraseña incorrecta"
                    })
            }
        }
    }
    // console.log(rows[0].email)
    // res.json({
    //             message:"operacion exitosa",
    //             data:{
    //             user:rows
    //         }
    //     })
     })

})





router.get('/',(req,res)=>{
    res.json({ message: "bienvenido a la api delilah resthon"})
})

module.exports = router
