const  httpError500 = (err,res) =>{
    if(err){
        res.status(500).json({
            message:"Error en el servidor, vuelve a intentarlo"
        })
    }
}

module.exports = httpError500