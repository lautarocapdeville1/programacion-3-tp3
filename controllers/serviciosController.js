const fs = require('fs').promises

const getServicios = async (req, res) => {
  try {
    const data = await fs.readFile('./data/servicios.json', 'utf8')
    const servicios = JSON.parse(data)

    if (!servicios) {
      return res.status(404).json({ error: 'No se encontraron los servicios' })
    }

    return res.status(200).json(servicios)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `error ${error}` })
  }
}

module.export = { getServicios }
