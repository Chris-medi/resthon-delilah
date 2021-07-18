
const {schema_user,schema_product,schema_product_update} = require('../definir/schemas')

const validate_information = (objeto)=>{
   let valid = schema_user.validate(objeto) 
//    .valid(schema_user,objeto)
   // let {  value ,error, warning } = valid
   return valid
}

const validate_product = (objeto) =>{
   let valid = schema_product.validate(objeto)
   // console.log(valid)
   return valid
};

const validate_product_update = (objeto) =>{
   let valid = schema_product_update.validate(objeto)
   // console.log(valid)
   return valid
};

module.exports = {
   validate_product,
    validate_information,
    validate_product_update
    
}