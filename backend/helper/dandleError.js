const  httpError500 = (err,res) =>{
    if(err){
        res.status(500).json({
            message:"server error, retry"
        })
    }
}

module.exports = httpError500