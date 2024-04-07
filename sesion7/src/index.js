
const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const handlebars = require('express-handlebars')
const mongoConnect = require('../db/index.js')
const cookieParser = require('cookie-parser')
const insertTestProducts = require('./seeds/index.js')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const {mongoDB} = require('./config/')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'));
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.use(cookieParser("secret"))

app.use(session({
    secret: "coderSecret",
    resave: true,
    store: MongoStore.create({
        mongoUrl: mongoDB,
        ttl: 60 * 60
    }),
    saveUninitialized: true
}))

router(app)
mongoConnect(app)

//testing
insertTestProducts()

module.exports = app;