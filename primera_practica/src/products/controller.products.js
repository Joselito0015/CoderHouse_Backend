const { Router } = require('express');
const ProductDao = require('../dao/class/ProductDao')


const Product = new ProductDao

const router = Router()


router.get('/', async (req,res) =>{
    const products = await Product.find()

    const limit =req.query.limit
    if (limit){
        res.render('home.handlebars',products.slice(0,limit))
    }
    res.render('home.handlebars',{products})

    
})


router.get('/:pid', async (req,res) =>{
    const id= Number( req.params.pid)
    const response = await Product.findOne(id)
    res.json({resolve:response})  
})


router.post('/', async  (req,res) =>{
    const {title,description,price,thumbnail,code,stock,category} = req.body

    const newProduct= {   
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category:category,
        status:true
    }

    const response= await Product.create(newProduct)
    
    res.json({resolve: response})
})



router.put('/:pid', async  (req,res) =>{
    const id = req.params.pid
    const {title,description,price,thumbnail,code,stock,category,status} = req.body

    const product= {   
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category:category,
        status:status
    }

    const response=  await Product.updateOne(product)

    res.json({resolve: response})
})


router.delete('/:pid', async  (req,res) =>{
    const id = req.params.pid
    const response= await Product.deleteOne(id)
    res.json({resolve: response})
})



module.exports = router