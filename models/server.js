const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.middleware()
    this.routes()
  }

  middleware() {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes() {
    this.app.use('/api', require('../routes/registroRoutes'))
    this.app.use('/api/equipo', require('../routes/equipoRouters'))
    this.app.use('/servicios', require('../routes/serviciosRoutes'))
    this.app.use('/perfil', require('../routes/perfilRoutes'))

    // manejo de errores
    this.app.use((req, res, next) => {
      return res.status(400).json({ msg: 'Error.' })
    })
    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      return res.status(404).json({ msg: 'Error. Pagina no encontrada' })
    })
    this.app.use((err, req, res, next) => {
      console.error(err.stack)
      return res.status(500).json({ msg: 'Internal Server Error' })
    })
  }

  HEAD
  listen() {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando el el puerto: ${this.port}`)
    })
  }
}

HEAD
module.exports = Server
