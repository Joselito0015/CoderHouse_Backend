const productsController = require('../products/controller.products')
const realTimeProductsController = require('../products/controller.realtimeproducts')
const cartsController = require('../carts/controller.carts')
const messagesController = require('../chat/controller.chat')

const router = (app) => {
    app.use('/api/products',productsController)
    app.use('/api/realtimeproducts',realTimeProductsController)
    app.use('/api/carts',cartsController)
    app.use('/api/messages',messagesController)
}
 
module.exports = router