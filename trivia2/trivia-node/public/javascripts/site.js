jQuery(document).ready(function(){
	var socket=io.connect();
	var UserLis=Array();
	var joined=false;
	//inicio de session
	if($("#id_session")!=undefined && $("#id_session").val()!="")
	{
		//alert($("#id_session").val());
		socket.emit("setsession",{"idsession":$("#id_session").val()});
	}
	socket.on("setsession",function(response){
		if(response==false){
			console.log("Error al momento de creara la session")
			return;	
		}
	});
	socket.on("errorsession",function(){
		document.location.href="http://localhost:8000/blog/login/";		
	});
	//recibiendo conexion y listando salas y usuarios
	socket.on('conexion', function(data){
		UserLis=data;
		refreshUser(data.nombres);
		//console.log("ya respodnio "+data.nombre[0].nom_us+" y la url"+data.nombre[0].image);
		//refreshRoom(data.salas);
	});

	var refreshUser= function(names){
		html="";
		for (var i = 0; i < names.length; i++) {
			html+='<li class="media"><p><img class="media-object img-circle" style="max-height:40px;" src="#"/><h5>'+names[i]+'</h5></p></li>';

		};
		$("#UserL").html(html);
	}

	//conexion del usuario
	$("#empezar").click(function(event) {
		joined=true;
		socket.emit("empezar",{"nick":$("#nickname").val(),"room":"general"});
	});

	socket.on("confirma_conexion",function(response){
	//	refreshUser(UserLis);
		
		$("#mensajes").append('<li class="media text-info"><div class="media-body"><div class="media"><div class="media-body">'+response.texto+'</div></div></div></li>');
		document.location.href="http://localhost:3001/general/";	
		//$("#salaG").html(response.sala);
		
	});

	//chat para sala general
	$("#mensaje").keydown(function(){
		if(event.keyCode==13){
			socket.emit("mensaje",{"msn":$("#mensaje").val(),"nick":$("#nickname").val()});
			$(this).val("");
		}
	});
	socket.on("confirma_mensaje",function(response){
		$("#mensajes").append('<p class="text-danger"><h5>'+response.nick+'->'+response.msn+'</h5></p>');
	});

	//crear partida
	$("#crearPartida").click(function(event) {
		socket.emit("SetRoom",{"nick":$("#nickname").val(),"titulo":$("#titulo").val()});
	});
	socket.on("confirma_room",function(){
		console.log("se confirma creacion de sala");
	});

	// unirse a juego
	$("#unirse").click(function(){
		socket.emit("unirseAsala",{"titulo":$("#nomb").val(),"hreff":$("#href").val(),"nick":$("#nickname").val()});
	});
	socket.on("confirma_unirse",function(data){
		document.location.href="http://localhost:3001"+data.hreff;
		$("#star").attr('disabled', 'true');
	});

	//empezar partida
	$("#star").click(function(){
		socket.emit("stargame",{"numpre":$("#numpre").val(),"titulo":$("#titulo").val()})
		//$("#star").attr("disabled","true");
	});
	socket.on("confirma_stargame",function(data){
		html="";
		for (var i = 0; i < data.numpre; i++) {
			html+='<li><a id="boto" href="#" class="btn btn-primary btn-lg active" role="button" data-toggle="modal" data-target="#boto"> pregunta'+ (i+1)+'</a></li>';
		};
		$("#question").html(html);
	});
}); 