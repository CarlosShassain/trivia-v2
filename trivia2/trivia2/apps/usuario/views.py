from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse
from .forms import *

from .models import *
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate,logout
from django.contrib.sessions.backends.db import SessionStore
from captcha.fields import ReCaptchaField
# Create your views here.
def index(request):
	menu=permisos(request)
	usuarios=User.objects.all()
	return render_to_response("index/index.html",{'menu':menu,'usuarios':usuarios},context_instance=RequestContext(request))

def registro_view(request):
	menu=permisos(request)
	if request.method=="POST":
		formulario_registro=fusuario(request.POST)
		if formulario_registro.is_valid():
			nuevo_usuario=request.POST['username']
			formulario_registro.save()
			usuario=User.objects.get(username=nuevo_usuario)
			usuario.is_active=False
			usuario.save()
			perfil=Perfil.objects.create(user=usuario)
			return HttpResponseRedirect("/login/")
	else:
		formulario_registro=fusuario()
	return render_to_response("user/registrarse.html",{'menu':menu,'formulario':formulario_registro},context_instance=RequestContext(request))

def login_view(request):
	if request.method=="POST":
		formulario=AuthenticationForm(request.POST)
		if request.session['cont']>3:
			formulario2=fcapcha(request.POST)
			if formulario2.is_valid():
				pass
			else:
				datos={'formulario':formulario,'formulario2':formulario2}
				return render_to_response("user/login.html",datos,context_instance=RequestContext(request))		
		if formulario.is_valid:
			usuario=request.POST['username']
			contrasena=request.POST['password']
			acceso=authenticate(username=usuario,password=contrasena)
			if acceso is not None:
				if acceso.is_active:
					login(request, acceso)
					p=SessionStore()
					p["name"]=usuario
					p["estado"]="conectado"
					p.save()
					request.session["idkey"]=p.session_key
					del request.session['cont']
					return HttpResponseRedirect("/perfil/")
				else:
					login(request, acceso)
					return HttpResponseRedirect("/activar/")
			else:
				request.session['cont']=request.session['cont']+1
				aux=request.session['cont']
				estado=True
				mensaje="Error en los datos "+str(aux)
				if aux>2:
					formulario2=fcapcha()
					datos={'formulario':formulario,'formulario2':formulario2,'estado':estado,'mensaje':mensaje}
				else:
					datos={'formulario':formulario,'estado':estado,'mensaje':mensaje}
				return render_to_response("user/login.html",datos,context_instance=RequestContext(request))		
	else:
		request.session['cont']=0
		formulario=AuthenticationForm()
	return render_to_response("user/login.html",{'formulario':formulario},context_instance=RequestContext(request))

def activar_view(request):
	menu=permisos(request)
	if request.user.is_authenticated():
		usuario=request.user
		if usuario.is_active:
			return HttpResponseRedirect("/perfil/")
		else:
			if request.method=="POST":
				u=User.objects.get(username=usuario)
				perfil=Perfil.objects.get(user=u)
				formulario=fperfil(request.POST,request.FILES,instance=perfil)
				if formulario.is_valid():
					formulario.save()
					u.is_active=True
					u.save()
					return HttpResponseRedirect("/perfil/")
			else:
				formulario=fperfil()
			return render_to_response("user/activar.html",{'menu':menu,'formulario':formulario},context_instance=RequestContext(request))
	else:
		return HttpResponseRedirect("/login/")
def editar_perfil(request):
	if request.user.is_authenticated():
		us=request.user
		usuario=User.objects.get(username=us)
		perfil_usuario=Perfil.objects.get(user=usuario)
		if request.method=="POST":
			formulario=fperfil_modificar(request.POST,request.FILES,instance=perfil_usuario)
			if formulario.is_valid():
				formulario.save()
				return HttpResponseRedirect("/perfil/")
		else:
			formulario=fperfil_modificar(instance=perfil_usuario)
			return render_to_response("user/modificar.html",{"formulario":formulario},RequestContext(request))
	else:
		return HttpResponseRedirect("/login/")

def perfil_view(request):
	menu=permisos(request)
	return render_to_response("user/perfil.html",{'menu':menu,},context_instance=RequestContext(request))
def gamer_view(request):
	idsession=request.session["idkey"]
	return HttpResponseRedirect("http://localhost:3001/gamers/"+idsession)
def logout_view(request):
	p=SessionStore(session_key=request.session["idkey"])
	p["estado"]="desconectado"
	p["name"]=""
	p.save()
	logout(request)
	return HttpResponseRedirect("/")

def permisos(request):
	listadepermisos=[]
	usuario=request.user
	if usuario.has_perm("pregunta.add_categorias"):
		listadepermisos.append({"url":"/categoria/","label":"agregar categorias"})
	if usuario.has_perm("pregunta.add_pregunta"):
		listadepermisos.append({"url":"/pregunta/","label":"agregar preguntas"})
	if usuario.has_perm("pregunta.add_respuestas_opcionales"):
		listadepermisos.append({"url":"/respuesta/","label":"agregar respuestas"})
	if usuario.has_perm("pregunta.change_pregunta"):
		if usuario.has_perm("pregunta.delete_pregunta"):
			listadepermisos.append({"url":"/gestion/","label":"gestionar preguntas"})
	return listadepermisos