const { Router } = require('express');
const ProductDao = require('../dao/class/ProductDao')
const Product =  new ProductDao

const router = Router()


router.get('/', async (req,res) =>{
    const products= await Product.find()

    console.log(products)
    console.log(typeof(products))


    const limit =req.query.limit
    if (limit){
        res.send(products.slice(0,limit))
    }
    else
    {   
        res.render('realTimeProducts.handlebars',{products: products, script: '/js/index.js'})
    }
    
})


module.exports = router