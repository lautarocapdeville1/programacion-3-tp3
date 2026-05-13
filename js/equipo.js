const contenedorEquipo = document.querySelector('#contenedor-equipo')

const crearTarjetaMiembro = ({ nombre, rol, descripcion, imagen, alt }) => {
  const article = document.createElement('article')
  article.classList.add('equipo-miembro')

  article.innerHTML = `
    <img src="${imagen}" alt="${alt}" width="250" height="350" />
    <h2>${nombre}</h2>
    <h3>${rol}</h3>
    <p>${descripcion}</p>
  `

  return article
}

const obtenerEquipoDesde = async (url) => {
  const respuesta = await fetch(url)

  if (!respuesta.ok) {
    throw new Error(`No se pudo obtener el equipo desde ${url}`)
  }

  return respuesta.json()
}

async function getEquipo() {
  try {
    const urls = ['/api/equipo', 'http://localhost:3000/api/equipo']
    let equipo = null

    for (const url of urls) {
      try {
        equipo = await obtenerEquipoDesde(url)
        break
      } catch (error) {
        console.error(error)
      }
    }

    if (!equipo) {
      throw new Error('No se pudo cargar el equipo desde ninguna URL')
    }

    contenedorEquipo.innerHTML = ''
    equipo.forEach((miembro) => {
      contenedorEquipo.appendChild(crearTarjetaMiembro(miembro))
    })
  } catch (error) {
    console.error(error)
    contenedorEquipo.innerHTML = '<p>No se pudo cargar el equipo.</p>'
  }
}

getEquipo()
