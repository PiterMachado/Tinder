const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const server = express()

mongoose.connect('mongodb+srv://admin01:admin01@cluster0.zxl3o.mongodb.net/tinderDBv2?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser:true
})

server.use(express.json())
server.use(routes)

server.listen(3333)