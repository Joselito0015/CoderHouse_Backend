const { Router } = require('express');
const Cart= require('../dao/class/cartDao');
const Product= require('../dao/class/ProductDao');

const cart = new Cart
const product = new Product

const router = Router()

//GET - ALL CARTS
router.get('/', async (req,res) => {
    const response = await cart.find()
    res.json({resolve: response})
})


//GET - ONE CART BY REQ.PARAMS
router.get('/:cid', async (req,res) => {
    const {cid} = req.params
    const response = await cart.findOnePopulate(cid)
    res.json({resolve: response})
})


//CREATE A NEW CART
router.post('/', async (req,res) => {
    const _cart= {   
        Products: [],
    }
    const response = await cart.create(_cart)
    res.json({resolve: response})
})

//POST - ADD A PRODUCT TO THE CART BY REQ.PARAMS
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
        console.log(_cart, "_cart")
        _response= await cart.updateOne(_cart)
        res.json({resolve: "Producto agregado con éxito",response: _response})
    }
    else{
    //aumentamos la candidad en uno
    _cart.products[indexProduct].quantity=_cart.products[indexProduct].quantity + 1
    console.log(_cart.products[indexProduct].quantity, "quantity")
    //Buscamos el indice del carrito y volvemos a agregarlo
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Producto aumentado",response: _response})
    }
})

//DELETE - elimina un producto del carrito
router.delete('/:cid/product/:pid', async (req,res) => {
    const {cid,pid} = req.params
    const _cart= await cart.findOne(cid)
    if (!_cart) {
        res.json({resolve: "Carrito no encontrado",response: _cart})
    }
    const listProductsfromCart = _cart.products
    const indexProduct = listProductsfromCart.findIndex(p => p._id == pid)
    if (indexProduct<0){
        res.json({resolve: "Producto No encontrado",response: _cart})
    }
    _cart.products.splice(indexProduct,1)
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Producto eliminado",response: _response})
});

//PUT - UPDATE THE CART WITH AN ARRAY OF PRODUCTS
router.put('/:cid', async (req,res) => {
    const {cid} = req.params
    const {products} = req.body
    const _cart= await cart.findOne(cid)
    if (!_cart) {
        res.json({resolve: "Carrito no encontrado",response: _cart})
    }
    _cart.products = products
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Carrito actualizado",response: _response})
});


//PUT - WILL UPDATE ONLY THE QUANTITY OF THE PRODUCT BY REQ.BODY
router.put('/:cid/product/:pid', async (req,res) => {
    const {cid,pid} = req.params
    const {quantity} = req.body

    const _cart= await cart.findOne(cid)
    if (!_cart) {
        res.json({resolve: "Carrito no encontrado",response: _cart})
    }
    const listProductsfromCart = _cart.products
    const indexProduct = listProductsfromCart.findIndex(p => p._id == pid)
    if (indexProduct<0){
        res.json({resolve: "Producto No encontrado",response: _cart})
    }
    _cart.products[indexProduct].quantity=quantity
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Producto actualizado",response: _response})
})

//DELETE - all the products from the cart
router.delete('/:cid', async (req,res) => {
    const {cid} = req.params
    const _cart= await cart.findOne(cid)
    if (!_cart) {
        res.json({resolve: "Carrito no encontrado",response: _cart})
    }
    _cart.products=[]
    _response= await cart.updateOne(_cart)
    res.json({resolve: "Carrito vacío",response: _response})
});



module.exports = router;