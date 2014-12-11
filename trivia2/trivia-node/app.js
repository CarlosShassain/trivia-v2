var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//var sala = require('./routes/partida');

var rooms=require("./sala/rooms");
var salas=rooms();

//var mysql=require("./db/mysql");
//var query=mysql({host:"localhost",user:"root",password:"",database:"triviav2"});

var io=require("socket.io");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/*app.get('/crearSala', sala.get_crear_sala);
app.post('/crearSala', sala.post_crear_sala);

app.get('/game/:indice', sala.get_sala);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

//post
//post

var session=require("./session/django");
var reviewsession=session();


//socket
var PORT=3001;
var server=app.listen(PORT, function(){
    console.log("servidor corriendo en el puerto "+ PORT);
});
var sala=[];
var names=Array();
var sockets=io(server);
var roomWait=Array();
var idsala=1;
var objectUser=Array();
var contador=0;
sockets.on("connection",function (socket){
    sala=salas.getRoom();
    if(sala.length > 0){
        console.log("desde elservidor");
        for (var i = 0; i < sala.length; i++) {
            console.log(sala[i].titulo);
        };
    }
    sockets.emit("conexion",{"nombres":names, "salas": sala});
    
    socket.on("setsession",function(clientdata){
        socket.idsession=clientdata.idsession;
        reviewsession.getSession(socket.idsession,function(r){
            if(r)
            {   
                socket.emit("setsession",true);
            }else
            {
                socket.emit("setsession",r);
            }
        });
    });

    //cenvio de datos al cliente
    socket.on("empezar",function(clientdata){

        if(insertUser(clientdata.nick)){
            names.push(clientdata.nick);
        }
        objectUser.push({nam:clientdata.nick, room:clientdata.room});
        socket.leave(clientdata.room);
        listar(objectUser);
        socket.join(clientdata.room);
        socket.emit("confirma_conexion",{"texto":"estas en la sala"+clientdata.room});
        sockets.to(clientdata.room).emit("confirma_mensaje",{"msn":clientdata.nick+" se unio a la sala","nick":"server"}) 
                        
    });
    /*socket.on("conexionR",function(){re
        socket.emit("conexion",{"nombres":names, "salas": sala});
    })*/
    
    socket.on("mensaje",function(data){
        listar(objectUser);
        var sa=buscaroom(objectUser, data.nick);
        socket.room=sa;
        socket.join(sa);
        sockets.to(sa).emit("confirma_mensaje",data);    
    });

    //cambia sala
    socket.on("SetRoom",function(data){
        if(insertRoom(data.titulo,socket)){
            console.log(data.titulo+"desde server");
            for (var i = 0; i < objectUser.length; i++) {
                if(objectUser[i].nam==data.nick){
                    objectUser[i].room=data.titulo;
                }
            };
            var sala=data.titulo;
            socket.leave(sala);
            socket.room=sala;
            socket.join(sala);
            socket.emit("confirma_room");
            sockets.emit("confirma_mensaje",{"msn":data.nick+" cambio de sala","nick":"server"})
        }
    });

    //une a l room
    socket.on("unirseAsala",function(data){
        console.log("unirse a sala ................................:"+data.nick)
        for (var i = 0; i < objectUser.length; i++) {
            if(objectUser[i].nam==data.nick){
                objectUser[i].room=data.titulo;
            }
        };
        socket.emit("confirma_unirse",data);
    });

    //star games
    socket.on("stargame",function(data){
            socket.join(data.titulo);
            sockets.to(data.titulo).emit("confirma_stargame",data);
        
    });
});
var buscaroom=function(obj, date){
    for (var i = 0; i < obj.length; i++) {

        if(obj[i].nam==date)
            return obj[i].room; 
    };
    return null;
}
var listar=function(obj){
    for (var i = 0; i < obj.length; i++) {
        console.log(obj[i])
    };
}
var insertUser=function (nombre){
    for (var i = 0; i < names.length; i++) {
        if(names[i]==nombre){
            return false;
        }
    };
    return true;
}
var insertRoom=function (nombre,socket){
    sa=salas.getRoom();
    var con=0;
    var id=0;
    for (var i = 0; i < sa.length; i++) {
        if(sa[i].titulo==nombre){
            con=con+1;
            console.log(sa[i].titulo+".................................");
            id=sa[i].id;
        }
    };
    console.log("contanos "+con +" y otro:"+id)
    if(con>=2){
        salas.deleteRoom(id);
        return false;
    }
    else{
        socket.idsala=id;
        return true;
    }
}
