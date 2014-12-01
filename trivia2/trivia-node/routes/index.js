var express = require('express');
var router = express.Router();

var rooms=require("../sala/rooms");
var salas=rooms();

mysql=require("../db/mysql");
query= new mysql({host:"localhost",user:"root",password:"",database:"triviav2"});

var app = express();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express',room: salas.getRoom()});
});


router.get('/crearSala/', function(req, res) {
  res.render('crearSala', { title: 'Crea tu Sala'});
});


router.get('/registro/', function(req, res) {
  res.render('registro', { title: 'Registrate' });
});

router.get("/espera/",function(req,res){
	var con=res.req.query;
    salas.save(con);
    res.render('saladeespera', { title: 'Esperando...',objeto:con});
});

router.get('/game', function(req, res) {
	console.log("dentro de la vista de game...............");
  res.render('game', { title: 'juegos'});
});

module.exports = router;
