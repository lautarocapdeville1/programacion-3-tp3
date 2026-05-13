const fs = require('fs').promises
const path = require('path')

const getEquipo = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/equipo.json')
    const data = await fs.readFile(filePath, 'utf-8')
    const equipo = JSON.parse(data)

    return res.json(equipo)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al obtener el equipo' })
  }
}

module.exports = { getEquipo }
