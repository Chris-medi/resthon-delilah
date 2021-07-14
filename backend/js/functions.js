const bcrypt = require('bcrypt')


const exitencia_Usuario = (name,contrasena)=>{
    const datos = [];
    let mensaje ;
    for(let i = 0 ;i < datos.length ; i++){
        if(datos.name[i] == name){
            if(datos.password[i] == contrasena){
                mensaje = true
            }else{
                mensaje = "incorrect password"
            }
        }else{
            mensaje = false
        }
    }
    return mensaje
}


const validar_informacion = (name,email,username)=>{
    const exepcion = {
            username: /^[a-zA-Z0-9\_\-]{1,16}$/,
            name: /^[a-zA-ZÀ-ÿ\s]{1,48}$/,
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }
    let response;
    if(exepcion.name.test(name)){
         reponse = true;
    }else{
        response = "Nombre incorrecto";
    }
    if(exepcion.username.test(username)){

    }else{
        reponse = "username-invalido";
    }
    if(exepcion.email.test(email)){
         response = true;
    }else{
        response = "email-incorrecto";
    }
    return response
}



//encriptar contraseña 
 const  encriptar_password =  (pass)=>{
    const vueltas = 8;
    const pass_encritada =  bcrypt.hashSync(pass,vueltas,(err)=>{
        if(err){
            return err
        }
    })
    return pass_encritada
 } 

 const buscar_msql = ()=>{

 }



// console.log(process.env.FOR)

module.exports = {
    exitencia_Usuario,
    validar_informacion,
    encriptar_password
}