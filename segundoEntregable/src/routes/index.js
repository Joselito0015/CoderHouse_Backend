

const productsController = require('../controllers/controller.products')
const cartsController = require('../controllers/controller.carts')


const router = (app) => {
    app.use('/api/products',productsController)
    // app.use('/api/realtimeproducts',realTimeProductsController)
    app.use('/api/carts',cartsController)
}
 
module.exports = router