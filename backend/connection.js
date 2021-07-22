const config = {
  host:'remotemysql.com',
  database: 'nV5Q3zY2ll',
  user:'nV5Q3zY2ll',
  password:'PGF6MA6aw5'
}
const mysql = require('mysql');
var connection = mysql.createConnection(config)

connection.connect((err)=>{
    if(err){
        console.log("error base de datos " + err)
        handleDisconnection()
    }
    console.log('conection exitosa')
})
function handleDisconnection() {
  connection.connect((err)=>{
    if(!err){
      console.log('reconnection')
    }
  })
   connection.on('error', function(err) {
       console.error('db error', err);
       if(err.code === 'PROTOCOL_CONNECTION_LOST') {
           console.error('db error execute reconnection:'+err.message);
           handleDisconnection();
       } else {
           throw err;
       }
   });
   
   module.exports = {
       connection
   }
}
handleDisconnection();



