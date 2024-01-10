const express = require("express")

const {register,refresh,login,logout} = require('../controller/auth.controller')
const authRoute = express.Router()

authRoute.post("/register",register)
authRoute.post("/refresh",refresh)
authRoute.post("/login",login)
authRoute.post("/logout",logout)




module.exports = authRoute