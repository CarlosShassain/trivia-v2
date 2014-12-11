from .forms import *
from .models import *
from django.contrib.auth.models import User

from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout,authenticate
from django.http import HttpResponseRedirect, HttpResponse

from django.shortcuts import render_to_response, redirect, render
from django.template import RequestContext, loader, Context, Template
from django.contrib.auth.decorators import login_required
from django.http import *


# Create your views here.

def categoria_view(request):
	menu=permisos(request)
	if(request.method=="POST"):
		form_cat=Categorias_Form(request.POST)
		if(form_cat.is_valid()):
			form_cat.save()
			return HttpResponseRedirect("/categoria/")
	form_cat=Categorias_Form()
	return render_to_response("Question/categorias.html",{'menu':menu,"form":form_cat},RequestContext(request))
def pregunta_view(request):
	menu=permisos(request)
	if(request.method=="POST"):
		form_pre=Pregunta_Form(request.POST)
		if(form_pre.is_valid()):
			form_pre.save()
			return HttpResponseRedirect("/pregunta/")
	form_pre=Pregunta_Form()
	return render_to_response("Question/preguntas.html",{'menu':menu,"form":form_pre},RequestContext(request))
def respuesta_view(request):
	menu=permisos(request)
	if(request.method=="POST"):
		form_res=Respuestas_Opcionales_Form(request.POST)
		if(form_res.is_valid()):
			form_res.save()
			return HttpResponseRedirect("/respuesta/")
	form_res=Respuestas_Opcionales_Form()
	return render_to_response("Question/respuestas.html",{'menu':menu,"form":form_res},RequestContext(request))
def modificar_pregunta(request,id):
	pregun=Pregunta.objects.get(pk=id)
	if request.method=="POST":
		fpregunta=Pregunta_Form(request.POST,instance=pregun)
		if fpregunta.is_valid():
			fpregunta.save()
			lista=Pregunta.objects.all()
			return render_to_response("Question/gestionar.html",{"lista":lista},RequestContext(request))
	else:
		fpregunta=Pregunta_Form(instance=pregun)
	return render_to_response("Question/modificar.html",{"fpregunta":fpregunta},RequestContext(request))
def eliminar_pregunta(request,id):
	eli=Pregunta.objects.get(pk=id)
	delet=eli.delete()
	lista=Pregunta.objects.all()
	return render_to_response("Question/gestionar.html",{"lista":lista},RequestContext(request))
	

def gestion_preguntas(request):
	lista=Pregunta.objects.all()
	return render_to_response("Question/gestionar.html",{"lista":lista},RequestContext(request))


def permisos(request):
	listadepermisos=[]
	usuario=request.user
	if usuario.has_perm("pregunta.add_categorias"):
		listadepermisos.append({"url":"/categoria/","label":"agregar categorias"})
	if usuario.has_perm("pregunta.add_pregunta"):
		listadepermisos.append({"url":"/pregunta/","label":"agregar preguntas"})
	if usuario.has_perm("pregunta.add_respuestas_opcionales"):
		listadepermisos.append({"url":"/respuesta/","label":"agregar respuestas"})
	return listadepermisos