const fs = require ('fs');
const path = require ('path');

const rutaArchivo = path.join(__dirname, '../data/registro.json');

const registrarUsuario = (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    const fechaNacimiento = req.body.fechaNacimiento;

    if (!nombre || !email || !password || !fechaNacimiento) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const data = fs.readFileSync(rutaArchivo, 'utf-8');
    const usuarios = JSON.parse(data);
    
    }
    usuarios.push({
    id: Date.now(),
    nombre,
    email,
    fechaNacimiento,
    
    })
fs.writeFileSync(rutaArchivo, JSON.stringify(usuarios, null, 2));

    

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    

    module.exports = {
        registrarUsuario
    };

    