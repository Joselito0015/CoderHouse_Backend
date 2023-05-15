const { Router } = require('express');
const Cart= require('../dao/class/cartDao');
const Product= require('../dao/class/ProductDao');

const cart = new Cart
const product = new Product

const router = Router()

router.post('/', async (req,res) => {
    const _cart= {   
        Products: [],
    }
    const response = await cart.create(_cart)
    res.json({resolve: response})
})

router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const response = await cart.findOne(cid)
    res.json({resolve: response})

})

router.post('/:cid/product/:pid', async (req,res) => {
    const {cid,pid} = req.params
    const _cart= await cart.findOne(cid)
    console.log(_cart)
    if (!_cart) {
        res.json({resolve: "Carrito no encontrado",response: _cart})
    }
    //Entregamos el producto encontrado
    const listProductsfromCart = _cart.products
    //Buscamos  si hay un index product conincidente
    const indexProduct = listProductsfromCart.findIndex(p => p._id == pid)
    //verificamos si el producto existe
    if (indexProduct<0){
        const productFind= await product.findOne(pid)
        console.log(productFind)
        if (productFind.length > 0){
            res.json({resolve: "Producto No encontrado",response: productFind})
        }

        const _product ={
            _id: pid,
            quantity: 1
        }

        _cart.products.push(_product)
        console.log(_cart)
        _response= await cart.updateOne(_cart)
        res.json({resolve: "Producto agregado con éxito",response: _response})
    }
    else{
    //aumentamos la candidad en uno
    _cart.products[indexProduct].quantity=_cart.products[indexProduct].quantity + 1
    //Buscamos el indice del carrito y volvemos a agregarlo
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Producto aumentado",response: _response})
    }
})

module.exports = router