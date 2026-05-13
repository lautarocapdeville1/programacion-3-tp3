const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(cors({ origin: ['http://127.0.0.1:5500', 'http://localhost:5500'] }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/servicios', require('./routes/serviciosRoutes'))

const rutaArchivo = path.join(__dirname, 'data/usuarios.json')

function leerUsuarios() {
  if (!fs.existsSync(rutaArchivo)) return []
  return JSON.parse(fs.readFileSync(rutaArchivo, 'utf8') || '[]')
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(usuarios, null, 2))
}

app.post('/registro', (req, res) => {
  const { nombre, email, password, fechanacimiento } = req.body

  let usuarios = leerUsuarios()

  if (usuarios.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'Email ya registrado' })
  }

  usuarios.push({ nombre, email, password, fechanacimiento })
  guardarUsuarios(usuarios)

  res.json({ mensaje: 'Registro exitoso' })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body

  let usuarios = leerUsuarios()

  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  )

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  res.json({ mensaje: 'Login exitoso' })
})

app.get('/usuarios', (req, res) => {
  const usuarios = leerUsuarios()
  res.json(usuarios)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
