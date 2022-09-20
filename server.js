const express = require('express')
const productos = require('./router.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("./public"))
app.use("/api/productos", productos)



const PORT = 4000
app.listen(PORT,()=>console.log(`server en el puerto ${PORT}`))