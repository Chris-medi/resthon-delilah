const { joi } = require('joi');
const {schema_user} = require('../definir/schemas')

const validate_information = (objeto)=>{
   let valid = schema_user.validate(objeto) 
//    .valid(schema_user,objeto)
   let {  value ,error, warning } = valid
   return valid
}

module.exports = {
    validate_information
}