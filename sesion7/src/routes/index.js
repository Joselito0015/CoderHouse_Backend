

const productsController = require('../controllers/controller.products')
const cartsController = require('../controllers/controller.carts')
const cookieController = require('../controllers/controller.cookies')
const usersController = require('../controllers/controller.users')

const router = (app) => {
    app.use('/api/products',productsController)
    app.use('/api/carts',cartsController)
    app.use('/api/cookies',cookieController)
    app.use('/api/users',usersController)
}
 
module.exports = router