$(function($) {

	var socket=io();
	$("#crearPartida").click(function(event){
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
		alert("entra mierda");
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'html',
			data: {},
		})
		.done(function(html) {
			$("#games").html(html);
			//Games();
			init_chat();
		})
		.fail(function() {
			
		})
		.always(function() {
			
		});
	}

	//mensajes
	var init_chat=function()
	{
		$("#mensaje").keydown(function(event){
			if(event.keyCode==13)
			{
				socket.emit("mensajes",{"msj":$(this).val()})
				$(this).val("");
			}
		});
	}
	socket.on("mensajes",function(response){
        console.log(response);
        $("#mensajes").append("<li>"+response.msn+"</li>")
    });

    //
});
