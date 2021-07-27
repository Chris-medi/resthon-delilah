
const {schema_user,schema_product,schema_product_update,schema_orden,schema_status} = require('../definir/schemas')

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

const validate_orden =  (objeto) =>{
   let valid = schema_orden.validate(objeto)
   // console.log(valid)
   return valid
};


const validate_update_status = (objeto) =>{
   const {status} = objeto
   let valid = schema_status.validate(objeto)
   const valores_validos = {
      "entregado":"entregado",
      "cancelado":"cancelado",
      "terminado":"terminado"
   }
   if(valid.error!=null){
         return valid.error.details[0].message
   }else{
      // console.log(valores_validos[status])
      if(valores_validos[status]== undefined){
         return {
            error:'valor invalido',
            valores_validos: [
               valores_validos['terminado'],
               valores_validos['entregado'],
               valores_validos['cancelado']
            ]
            
         }
      }else{
         return true
      }
      
   }

}
module.exports = {
   validate_product,
    validate_information,
    validate_product_update,
    validate_orden,
    validate_update_status
    
}