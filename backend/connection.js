const config = {
  host:'sql10.freemysqlhosting.net',
  database:'sql10425003',
  user:'sql10425003',
  password:'mDNSBSxBhQ',
  port:'3306'
}
const mysql = require('mysql');
var connection = mysql.createConnection(config)



// const config2 ={
//   host:'remotemysql.com',
//   database: 'nV5Q3zY2ll',
//   user:'nV5Q3zY2ll',
//   password:'PGF6MA6aw5'
// }

const handleDiscount = ()=>{
  connection.connect((err)=>{
    if(err){
      setTimeout(handleDiscount(),2000)
    }
  })
}

connection.connect((err)=>{
    if(err){
        console.log("error base de datos " + err)
        return;
    }
    console.log('conection exitosa')
})
// connection.query('USE' + dbconfig.database);
connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code == 'PROTOCOL_CONNECTION_LOST') { 
      handleDiscount()                     
    } else {       
      handleDiscount()                     
      throw err;                                  
    }
  });


// connection.query('SELECT * FROM information_schema.tables',(err,)=>{

// })

 //     host:'remotemysql.com',
//     dialect:'mysql'
// });

// sequelize.authenticate()
//     .then(()=>{
//         console.log("connexion exitosa");
//     })
//     .catch( err =>{
//         console.log("error al conectar la base de datos: " + err);

//     })
//     .finally(()=>{
//         sequelize.close();
//     })

// sequelize.query("SELECT * FROM USERS",{type: sequelize.QueryTypes.SELECT})
//     .then((users)=>{
//         console.log(users)
//     })




module.exports = {
    // sequelize
    connection
}