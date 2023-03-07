
const express = require('express')
const morgan = require('morgan')
const router = require('./routes')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/static',express.static(__dirname + '/public'));


router(app)

module.exports = app;