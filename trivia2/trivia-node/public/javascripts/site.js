$(function($) {
	var socket=io();
	$("#crearpartida").click(function(event){
		if($("#titulo").val()!=""){
			socket.emit("NewGame",{"nameTitle":$("#titulo").val()});
		}
	});
	socket.on("NewGame",function(response){
		if(response.bool)
		{
			alert("creado "+response.nameTitle);
			//$("#Sala").append("<h1>"+response.nameTitle+"</h1>")
			//document.location.href="http://localhost:3001/espera/";
			loadhtml("/game/");
		}
		else{
			alert("es false");
		}
	})
	var loadhtml=function(url){
		$.ajax({
			url: 'url',
			type: 'GET',
			dataType: 'html',
			data: {},
		})
		.done(function(html) {
			$("#content").html(html);
			//habilitamos el envio de mensajes
			//Games();
		})
		.fail(function() {
			
		})
		.always(function() {
			
		});
	}
});
