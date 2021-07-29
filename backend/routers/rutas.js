const express = require('express');

const router = express.Router();
const app = express();
const {connection} = require('../connection');
const {encriptar,comparar_hash} = require('../js/bcrypt');
const {crear_token} = require('../js/token');






router.get('/',(req,res)=>{
    res.json({ message: "bienvenido a la api delilah resthon"})
})

module.exports = router
