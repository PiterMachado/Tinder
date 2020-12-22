const express = require('express')
const DevController = require('./controllers/DevController')

const routes = express.Router()

routes.post('/devs', DevController.store)

//export default routes
module.exports = routes