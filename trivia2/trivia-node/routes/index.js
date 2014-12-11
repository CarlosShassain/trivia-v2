var express = require('express');
var router = express.Router();

var rooms=require("../sala/rooms");
var salas=rooms();

//mysql=require("../db/mysql");
//query= new mysql({host:"localhost",user:"root",password:"",database:"triviav2"});

var app = express();
var session=require("../session/django");
var s=session();

/* GET home page. */
router.get("/errorSession/",function(){
	res.writeHead("302",{"Location":"http://localhost:8000/login/"})
	res.end();
});
router.get('/', function(req, res) {
  res.render('index', { title: 'Triviador',room: salas.getRoom(),idsession:sessiones[req.cookies.sessionid].id,username:sessiones[req.cookies.sessionid].name});
});

var sessiones=Array();
router.get('/gamers/:id?', function(req, res) {

  	console.log(s.estado);                                                                                                                                    
  s.getSession(req.params.id, function(s){
  	if(s.estado=="conectado"){
  		req.params.username=s.name;
  		sessiones[req.cookies.sessionid]={id:req.params.id,name:s.name};
  		res.render('index', { title: 'Express',room: salas.getRoom(),sessionid:req.params.id,idsession:sessiones[req.cookies.sessionid].id,username:sessiones[req.cookies.sessionid].name});
  	}else{
  		res.writeHead("302",{"Location":"http://localhost:8000/login/"});
  		res.end();
  	}
  });
});


router.get('/crearSala/', function(req, res) {
  if(sessiones[req.cookies.sessionid]==undefined)
  {
    res.writeHead("302",{"Location":"http://localhost:8000/login/"});
    res.end();
    return;
  }
  res.render('crearSala', { title: 'Crea tu Sala'});
});


router.get('/registro/', function(req, res) {
	if(sessiones[req.cookies.sessionid]==undefined)
	{
		res.writeHead("302",{"Location":"http://localhost:8000/blog/login/"});
		res.end();
		return;
	}
  res.render('registro', { title: 'Registrate' });
});

router.get("/espera/",function(req,res){
	if(sessiones[req.cookies.sessionid]==undefined)
	{
		res.writeHead("302",{"Location":"http://localhost:8000/login/"});
		res.end();
		return;
	}
  var con=salas.convertir(req._parsedOriginalUrl.path);
    console.log(con);
    if(salas.save(con)){
      res.render('saladeespera', { title: 'Esperando...',objeto:con,room: salas.getRoom(),username:sessiones[req.cookies.sessionid].name,btn:"button"});
    }
    else{
      res.render('saladeespera', { title: 'Esperando...',objeto:con,room: salas.getRoom(),username:sessiones[req.cookies.sessionid].name,btn:"hiden"});
    }
});
router.get('/general/', function(req, res) {
  console.log(sessiones[req.cookies.sessionid]);
  if(sessiones[req.cookies.sessionid]==undefined)
  {
    res.writeHead("302",{"Location":"http://localhost:8000/login/"});
    res.end();
    return;
  }
  res.render('salaGeneral', { title: 'General',idsession:sessiones[req.cookies.sessionid].id,username:sessiones[req.cookies.sessionid].name,room: salas.getRoom()});
});
router.get('/game', function(req, res) {
  res.render('game', { title: 'juegos',room: salas.getRoom()});
});

module.exports = router;
