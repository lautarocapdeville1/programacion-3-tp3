# 🏋️ Gimnasio Gabrielli - TP N°3

## Grupo e Integrantes

| Nombre | GitHub |
|--------|--------|
| Lautaro Capdeville | lautarocapdeville1 |
| Bautista Cutini | bautista-cutini |
| Francesco Dicarli | fran-perfil |
| Santino Crivera | Santino-Crivera |
| Bautista Bartolini | Bautista-Bartolini |

---

## Descripción del Proyecto

Gimnasio Gabrielli es una página web para un gimnasio que permite a los usuarios conocer los servicios ofrecidos, el equipo de profesionales, registrarse e iniciar sesión para acceder a su perfil personal. El proyecto cuenta con un backend desarrollado en Node.js y Express que expone una API REST, y un frontend que consume dicha API de forma asíncrona.

---

## Metodología de trabajo con Git y GitHub

Se trabajó con una rama por integrante, además de una rama `dev` compartida y la rama `main` para producción.

**Flujo de trabajo:**
1. Cada integrante trabajó en su rama personal.
2. Los cambios se subieron a `dev` mediante pull requests.
3. Una vez validado el código en `dev`, se hizo merge a `main` para el deploy en Render.

**Ramas:**
- `main` — producción
- `dev` — integración
- `bautista-cutini` — rama de Bautista Cutini
- `Bautista-Bartolini` — rama de Bautista Bartolini
- `lautarocapdeville1` — rama de Lautaro Capdeville
- `francesco-dicarli` — rama de Francesco Dicarli
- `Santino-Crivera` — rama de Santino Crivera

---

## División de archivos entre integrantes

| Integrante | Archivos / Funcionalidades |
|------------|---------------------------|
| Bautista Cutini | `controllers/serviciosController.js` → `getServicios`, `getServiciosById` |
| Lautaro Capdeville | `controllers/equipoController.js` → `getEquipo` |
| Francesco Dicarli | `controllers/perfilController.js` → `getPerfil` |
| Santino Crivera | Efecto de carga (spinner) en el frontend |
| Bautista Bartolini | `controllers/authController.js` → `postLogin`, `register` |

---

## Distribución de archivos y carpetas

```
📦 programacion-3-tp3
├── 📁 assets/          → Imágenes y recursos estáticos
├── 📁 controllers/     → Lógica de cada endpoint
│   ├── serviciosController.js
│   ├── equipoController.js
│   ├── perfilController.js
│   └── authController.js
├── 📁 css/             → Estilos del frontend
├── 📁 data/            → Archivos JSON (base de datos simulada)
│   ├── servicios.json
│   ├── equipo.json
│   ├── perfil.json
│   └── usuarios.json
├── 📁 js/              → Scripts del frontend
├── 📁 models/          → Clases del servidor
│   └── server.js
├── 📁 pages/           → Páginas HTML
├── 📁 routes/          → Definición de rutas de la API
├── .env                → Variables de entorno (no subido al repo)
├── .gitignore
├── app.js              → Punto de entrada de la aplicación
└── package.json
```

---

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/servicios` | Retorna el listado completo de servicios |
| GET | `/servicios/:id` | Retorna el detalle de un servicio por ID |
| GET | `/equipo` | Retorna los integrantes del equipo |
| GET | `/perfil/:id` | Retorna los datos del usuario logueado |
| POST | `/login` | Valida usuario y contraseña |
| POST | `/register` | Registra un nuevo usuario |

---

## Funciones explicadas

### `getServicios` — serviciosController.js
Lee el archivo `servicios.json` y retorna el listado completo de servicios disponibles en el gimnasio. Si no encuentra el archivo, retorna un error 500.

```javascript
const getServicios = async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/servicios.json'), 'utf8')
    const servicios = JSON.parse(data)
    return res.status(200).json(servicios)
  } catch (error) {
    return res.status(500).json({ error: `error ${error}` })
  }
}
```

### `getServiciosById` — serviciosController.js
Recibe un `id` como parámetro en la URL, lee `serviciosDetalle.json` y retorna el servicio que coincida con ese ID. Si no existe, retorna un error 404.

```javascript
const getServiciosById = async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/serviciosDetalle.json'), 'utf8')
    const servicios = JSON.parse(data)
    const { id } = req.params
    const servicioId = servicios.find((s) => s.id === parseInt(id))
    if (!servicioId) return res.status(404).json({ msg: `No existe el servicio con id ${id}` })
    return res.status(200).json(servicioId)
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el servicio' })
  }
}
```

### `getEquipo` — equipoController.js
Lee el archivo `equipo.json` y retorna el listado de profesionales del gimnasio con su nombre, rol, descripción e imagen.

### `getPerfil` — perfilController.js
Recibe un `id` de usuario como parámetro, busca en `perfil.json` y retorna los datos del usuario: nombre, mail, fecha de registro, foto y últimos 3 pedidos.

### `postLogin` — authController.js
Recibe `email` y `password` desde el body de la request, los compara contra los datos en `usuarios.json` y retorna si las credenciales son correctas o no.

### `register` — authController.js
Recibe los datos de un nuevo usuario desde el body, los agrega al archivo `usuarios.json` y confirma el registro.

### `Server` (clase) — models/server.js
Clase que encapsula la configuración del servidor Express. En el constructor inicializa la app, el puerto, el middleware y las rutas. Expone el método `listen()` para iniciar el servidor.

```javascript
class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.middleware()
    this.rutas()
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando en el puerto: ${this.port}`)
    })
  }
}
```

---

## Estructura de los archivos JSON

### servicios.json
```json
{
  "id": 1,
  "nombre": "Plan Nutricional Personalizado",
  "precio": 50000,
  "desc": "Asesoramiento con dieta según objetivos."
}
```

### equipo.json
```json
{
  "nombre": "Lautaro Capdeville",
  "rol": "Entrenador personal",
  "descripcion": "Entrenador personal certificado con mas de 10 anos de experiencia.",
  "imagen": "../assets/img/entrenador-capdeville.jpg",
  "alt": "Lautaro Capdeville"
}
```

### usuarios.json
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "contraseña123",
  "fechanacimiento": "1990-01-01"
}
```

---

## Deploy

- **Backend (API):** [https://tp3-programacion.onrender.com](https://tp3-programacion.onrender.com)
