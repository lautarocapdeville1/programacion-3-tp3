const fs = require('fs').promises

const getPerfilById = async (req, res) => {
  const id = parseInt(req.params.id)

  try {
    const data = await fs.readFile('./data/perfil.json', 'utf8')

    const perfiles = JSON.parse(data)

    const perfil = perfiles.find((p) => p.id === id)

    if (!perfil) {
      return res.status(404).json({
        error: 'Perfil no encontrado'
      })
    }

    res.json(perfil)
  } catch (error) {
    res.status(500).json({
      error: 'Error al leer el archivo'
    })
  }
}

module.exports = { getPerfilById }
