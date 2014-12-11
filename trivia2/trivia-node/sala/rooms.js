var rooms= function() {
	var room=new Array();
	var num=2;
	this.convertir=function(variable){
		var endos=variable.split("/?");
		var envarios=endos[1].split("&");
		var cadena="{";
		var ind;
		for (var i = 0; i < envarios.length; i++) {
			ind=envarios[i].split("=");
			cadena+="\""+ind[0]+"\" : \""+ind[1]+"\"";
			cadena+=",";
		};
		cadena+="\"path\":"+"\""+variable+"\",";
		cadena+="\"id\":"+"\""+num+"\"";
		cadena+="}";
		var obj=JSON.parse(cadena);
		return obj;
	}
	this.save=function(object){
		for (var i = 0; i < room.length; i++) {
			if(room[i].titulo==object.titulo){
				return false;
			}
		}
		room.push(object);
		num=num+1;
		return true;
	}
	this.getRoom=function(){
		return room;
	}
	this.deleteRoom=function(ind){
		for (var i = 0; i < room.length; i++) {
			if(room[i].id==ind){
				room.remove(room[i]);
				return;
			}
		};
		return;
	}
	return this;
}
module.exports= rooms;