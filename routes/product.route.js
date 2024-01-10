const express = require('express')
const productRoute = express.Router()
const midguard = require('../middleware/middleware')
const{createProduct, findAllProduct, findByProduct,updateProduct,deleteProduct}= require('../controller/product.controller')
const authGuard = require('../middleware/auth.guard')
const roleGuard = require('../middleware/role.guard')





productRoute.post ('/',roleGuard("admin","user"),createProduct)
productRoute.get ('/',findAllProduct)
productRoute.get ('/:id',findByProduct)
productRoute.patch ('/:id',updateProduct)
productRoute.delete ('/:id',deleteProduct)
module.exports = productRoute