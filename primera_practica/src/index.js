
const express = require('express')
const morgan = require('morgan')
const router = require('./routes')
const handlebars = require('express-handlebars')
const mongoConnect = require('../db/index.js')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(express.static(__dirname + '/public'));
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')


router(app)
mongoConnect()

module.exports = app;