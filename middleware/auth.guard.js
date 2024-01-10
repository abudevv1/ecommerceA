const jwt = require("jsonwebtoken")
const env  = require("../config/env.config")
function authGuard(rea, res, next) {
    try {
        const token = req.headers .authorization?.split (" ")[1]  
        if (!token) {
            const error = new Error ("JWT must be provided");
            error.status = 401
            throw error
        }
        const decodedToken =  jwt.verify (token, env.ACCESS_TOKEN_SECRETS)
        req.id = decodedToken
        req.role = decodedToken
        next()
    }catch (error){
        res.status (error.status || 401).json({ error: "jwt error:" + error.message})
    }
}
module.exports = authGuard