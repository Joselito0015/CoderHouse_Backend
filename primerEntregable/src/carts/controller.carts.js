const { Router } = require('express');
const cartManager= require('../public/js/cartManager');

const manager = new cartManager

const router = Router()

router.post('/', (req,res) => {
    const msg = manager.addCart()
    res.json({resolve: msg})
})

router.get('/:cid', (req,res) => {
    const {cid} = req.params

    const msg = manager.getCartById(cid)

    res.json({resolve: msg})

})

router.post('/:cid/product/:pid', (req,res) => {
    const {cid,pid} = req.params
    const msg = manager.getProductsFromCartById(cid,pid)

    res.json({resolve: msg})

})



module.exports = router