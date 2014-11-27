var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/crearSala/', function(req, res) {
  res.render('crearSala', { title: 'Crea tu Sala' });
});
router.get('/registro/', function(req, res) {
  res.render('registro', { title: 'Registrate' });
});
router.get('/espera/', function(req, res) {
  res.render('saladeespera', { title: 'Esperando...' });
});
module.exports = router;
