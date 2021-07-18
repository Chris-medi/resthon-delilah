const {validar_token} = require('./token');
const {connection} = require('../connection');



const validate_rol = (req,res,next)=>{
    const {authorization } = req.headers;
    const  {info_descode} = validar_token(authorization);
    // console.log(info_descode)
    connection.query('SELECT rol FROM Users Where email = ?',[info_descode],(err,rows)=>{
        // console.log(rows[0].rol)
        if(err){
            res.status(500).json({
                message:"Error en el servidor"
            })
        }
        // console.log(rows)
        if(rows[0].rol!=1){
            res.status(403).json({
                message:"no tienes permisos para realizar esta tarea"
            })
        }else{
            next();
        }
        if(rows.length==0){
            res.status(403).json({
                message:"no tienes permisos para realizar esta tarea!!"
            })
        }
        
    })

}

module.exports = {
    validate_rol
}