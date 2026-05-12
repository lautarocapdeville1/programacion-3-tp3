const { Router } = require('express')
const { getServicios, getServiciosById } = require('../controllers/serviciosController')

const routes = Router()

routes.get('/', getServicios)
routes.get('/:id', getServiciosById)

module.exports = routes
