const bcrypt = require('bcrypt');


const encriptar =(password)=>{
   return bcrypt.hashSync(password,8);
    
}


const comparar_hash = (pass,hash)=>{
   return bcrypt.compareSync(pass,hash)
}


module.exports = {
    encriptar,
    comparar_hash
}