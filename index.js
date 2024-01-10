const express = require('express')
const app = express()
const env = require('./config/env.config')
const productRoute =require('./routes/product.route')
const categoryRoute = require('./routes/category.route')
const bodyparser = require('body-parser')
const mysql = require('./config/db.config')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')





app.use(express.json())
app.use(bodyparser.json())
app.use('/user', userRoute)
app.use('/category',categoryRoute)
app.use('/product',productRoute)
app.use('/auth',authRoute)





const port = env.PORT
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))
