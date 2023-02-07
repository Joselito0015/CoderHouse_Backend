const express = require('express')
const ProductManager = require('./public/js/ProductManager')

const manager = new ProductManager

const port = 3000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/products', async (req,res) =>{
    const products= await manager.getProducts()
    

    const limit =req.query.limit
    if (limit){
        res.send(products.slice(0,limit))
    }
    else
    {
        res.send(products)
    }
    
})

app.get('/products/:pid', async (req,res) =>{
    const id= Number( req.params.pid)
    console.log(id)
    const product = await manager.getProductById(id)
    res.json(product)  
})


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})