const { Router } = require('express');
const ProductManager = require('../public/js/ProductManager')
const manager = new ProductManager

const router = Router()


router.get('/', async (req,res) =>{
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


router.get('/:pid', async (req,res) =>{
    const id= Number( req.params.pid)
    const product = await manager.getProductById(id)
    res.json({resolve:product})  
})


router.post('/', async  (req,res) =>{
    const {title,description,price,thumbnail,code,stock,category} = req.body

    console.log(title,description,price,thumbnail,code,stock)

    const msg= await manager.addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
    )
    

    res.json({resolve: msg})
})



router.put('/:pid', async  (req,res) =>{
    const id = req.params.pid
    const {title,description,price,thumbnail,code,stock,category,status} = req.body

    console.log(id)
    console.log(title,description,price,thumbnail,code,stock,status)

    const msg=  await manager.updateProductById(id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category)

    res.json({resolve: msg})
})


router.delete('/:pid', async  (req,res) =>{
    const id = req.params.pid

    const msg= await manager.deleteProductById(id)

    res.json({resolve: msg})
})



module.exports = router