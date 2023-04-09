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
        // res.send(products)
        res.render('realTimeProducts.handlebars',{products})
    }
    
})


module.exports = router