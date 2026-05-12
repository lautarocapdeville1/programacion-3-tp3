const express = require('express')
const cors = require('cors')
require('dotenv').config()

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
    }

    rutas() {
        this.app.use('/api/equipo', require('../routes/equipo'))

        //manejo de errores
        this.app.use((req, res, next) => {
            res.status(400).json({
                msg: 'Error'
            })
        })
        this.app.use((err, req, res, next) => {
            console.error(err.stack)
            next()
            return res.status(404).json({
                msg: 'Error. Pagina no encontrada'
            })
        })
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            return res.status(500).json({
                msg: 'Error internal server'
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }
}

module.exports = Server