const { Router } = require('express')

const { getPerfilById } = require('../controllers/perfilController')

const routes = Router()

routes.get('/:id', getPerfilById)

module.exports = routes
