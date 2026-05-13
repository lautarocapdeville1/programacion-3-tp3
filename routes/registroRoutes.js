const express = require('express');
const { Router } = require ('express')
const router = express.Router();

router.use('/', getusuarios);

const { registrarUsuario } = require('../controllers/resgistroController');
router.post('/registro', registrarUsuario);

module.exports = router;
