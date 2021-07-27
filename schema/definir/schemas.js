const joi = require('joi');

const schema_user = joi.object().keys( {
    fullName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    userName:joi.string().required(),
})


const schema_product = joi.object().keys({
    name:joi.string().required(),
    link_imagen:joi.string().uri().required(),
    price:joi.number().required()
})

const schema_product_update = joi.object().keys({
    id:joi.number().required(),
    name:joi.string().required(),
    link_imagen:joi.string().uri().required(),
    price:joi.number().required()
})

const schema_orden = joi.object().keys({
    products_id:joi.array().required(),

})
const schema_status = joi.object().keys({
    status:joi.string().required(),
    order_id:joi.number().required()
})


module.exports = {
    schema_user,
    schema_product,
    schema_orden,
    schema_product_update,
    schema_status
} 