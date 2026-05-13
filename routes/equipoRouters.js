const { Router } = require('express')
const { getEquipo } = require('../controllers/equipoControlles')

const router = Router()

router.get('/', getEquipo)

module.exports = router
