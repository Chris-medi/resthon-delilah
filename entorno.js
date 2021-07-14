const dotenv = require('dotenv');
dotenv.config({path:__dirname + '/.env'})

let firma = process.env.FIRMA;
let For = process.env.FOR;

// console.log("desde entorno "+firma)
// console.log(dotenv.config())

module.exports={
    firma,
    For
}