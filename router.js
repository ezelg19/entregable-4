const express = require('express')
const { Router } = express
const router = Router()

let productos = []

class GuardarProducto{
    constructor(title,price,thumbnail,id){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.id = id
    }
}
router.get('/', (req,res) =>{
    res.send(productos)
})

router.post("/", (req, res)=>{
    try{
        if (productos.length > 0){ 
            let id = productos[productos.length - 1].id + 1
            const guardado = new GuardarProducto(req.body.title, req.body.price, req.body.thumbnail, id)
            productos.push(guardado) 
        }
        else{ 
            let id = 1
            const guardado = new GuardarProducto(req.body.title, req.body.price, req.body.thumbnail, id)
            productos.push(guardado)
        }

        res.status(201).send({ status: "Guardado" , id: productos[productos.length-1].id})
    }
    catch(error){res.status(400).send({msg:"Error al cargar el producto",error: error})}
})

router.get("/:id", (req,res)=>{
    const { id } = req.params
    if (productos.find(item => item.id === parseInt(id))){
        res.status(200).json(productos.find(item => item.id === parseInt(id)))
    }
    else{ res.status(400).send({ error : 'producto no encontrado' })}
})

router.put("/:id",(req,res)=>{
    const { id } = req.params
    const guardado = new GuardarProducto(req.body.title, req.body.price, req.body.thumbnail, parseInt(id))
    const busqueda = productos.indexOf(productos.find(item => item.id === parseInt(id)))
    if (productos[busqueda]){
        productos[busqueda] = guardado
        res.status(200).send({msg: 'Producto actualizado'})
    }
    else{
        res.status(400).send({error: 'Producto no encontrado'})
    }
})

router.delete("/:id", (req,res)=>{
    const { id } = req.params
    const busqueda = productos.indexOf(productos.find(item => item.id === parseInt(id)))
    if (productos[busqueda]){
        productos = productos.filter(item => item.id !== parseInt(id))
        res.status(200).send({msg: 'Producto eliminado'})
    }
    else{
        res.status(400).send({error: 'Producto no encontrado'})
    }
})
module.exports = router;