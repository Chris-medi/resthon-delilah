const dotenv = require('dotenv');
dotenv.config({path:__dirname + '/.env'})

let firma = process.env.FIRMA;

// console.log(dotenv.config())

module.exports={
    firma,
}