function midguard(req,res,next){
    const body = req.body
    res.send(body.role)
    if(body.role === "admin"){
        next()
    }
}
module.exports= midguard