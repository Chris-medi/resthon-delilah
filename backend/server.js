require('../entorno')

//crear servidor 
const express = require('express');
const app = express();
const port = 3060;

//seguridad para sitio web y permisos
const cors = require('cors');
app.use(cors());
//-----------------
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }))




//definir rutas




//recibir parametros por el body
app.use(express.urlencoded({ extended: false} ));
app.use(express.json());

const Router = require('./routers/rutas');
app.use(Router);


//---------------rutas GET ---------------
const routerGet = require('./routers/get/rutasGet');
app.use('/api',routerGet);


//------------rutas PUT --------------
const routerPut = require('./routers/Put/rutaspPut')
app.use('/api',routerPut);


//------------ rutas POST --------------
const routerPost = require('./routers/post/rutasPost')
app.use('/api',routerPost);


//--------------- rutas DELETE --------------
const routerDelete = require('./routers/delete/rutasDelete');
app.use('/api',routerDelete);




app.listen(port,()=>{
    console.log("Escuchando servidor desde el puesto: "+ port )
});