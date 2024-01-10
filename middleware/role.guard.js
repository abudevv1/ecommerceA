function roleGuard(...roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
        next()
        return
    }
    res.status(403).json({message:`you have no right to ${req.method} to ${req.originalUl}`})

    }
}
module.exports = roleGuard
