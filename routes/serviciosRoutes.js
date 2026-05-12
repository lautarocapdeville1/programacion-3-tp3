const { Router } = require('express')
const { getServicios } = require('../controllers/serviciosController')

const routes = Router()

routes.get('/', getServicios)

module.exports = routes
