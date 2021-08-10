require('../entorno')

//-----crear servidor 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

//seguridad para sitio web y permisos
const cors = require('cors');
app.use(cors());


//--------middleware--------
//const {validate_rol} = require('./js/validar-rol')


//recibir parametros desde el body
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

//------------definir rutas

const Router = require('./routers/rutas');
app.use(Router);


//---------------rutas GET ---------------
const routerGet = require('./routers/get/rutasGet');
app.use('/api',routerGet);


//--------------rutas PUT --------------
const routerPut = require('./routers/Put/rutaspPut')
app.use('/api',routerPut);


//-------------rutas POST --------------
const routerPost = require('./routers/post/rutasPost')
app.use('/api',routerPost);


//--------------- rutas DELETE --------------
const routerDelete = require('./routers/delete/rutasDelete');
app.use('/api',routerDelete);




app.listen(port,()=>{
    console.log("Listening on port: "+ port )
});