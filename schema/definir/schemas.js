const joi = require('joi');

const schema_user = joi.object().keys( {
    fullName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required(),
    userName:joi.string().required(),
})


const schema_product = joi.object().keys({
    name:joi.string().required(),
    price:joi.number().required()
})

module.exports = {
    schema_user,
    schema_product
} 