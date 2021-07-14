const { valid } = require('joi');
const jwt = require('jsonwebtoken');
const {firma} = require('../../entorno')

const crear_token = (informacion)=>{
    const token = jwt.sign(informacion,firma);
    return token
};

const validar_token = (token)=>{
    let mensaje = true ;
        let response_validacion 
    try{
         response_validacion = jwt.verify(token,firma);
    }catch(err){
        mensaje = err
    }

    return {
        "validation" : mensaje,
        "info_descode" : response_validacion
    }
}


// console.log()


module.exports ={ 
    crear_token,
    validar_token
};