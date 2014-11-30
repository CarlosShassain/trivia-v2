var express = require('express');
var router = express.Router();
var rooms = new Array();
var app = express();
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', room:rooms});
});


router.get('/crearSala/', function(req, res) {
  res.render('crearSala', { title: 'Crea tu Sala'});
});


router.get('/registro/', function(req, res) {
  res.render('registro', { title: 'Registrate' });
});

/*
router.get('/espera/', function(req, res) {
  res.render('saladeespera', { title: 'Esperando...',room:rooms});
});
*/
router.get("/espera/",function(req,res){
    var con=convertir(req._parsedOriginalUrl.href);
    rooms.push(con);
    console.log(rooms);
    res.render('saladeespera', { title: 'Esperando...',objeto:con});
});

router.get('/game', function(req, res) {
  res.render('game', { title: 'juegos' });
});

module.exports = router;

var convertir=function(variable){
	var endos=variable.split("/?");
	var envarios=endos[1].split("&");
	var cadena="{";
	var ind;
	for (var i = 0; i < envarios.length; i++) {
		ind=envarios[i].split("=");
		cadena+="\""+ind[0]+"\" : \""+ind[1]+"\"";
		if(i+1!=envarios.length)
			cadena+=",";
	};
	cadena+="}";
	var obj=JSON.parse(cadena);
	return obj;
}