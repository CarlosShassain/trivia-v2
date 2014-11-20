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
	if(request.method=="POST"):
		form_cat=Categorias_Form(request.POST)
		if(form_cat.is_valid()):
			form_cat.save()
			return HttpResponseRedirect("/categoria/")
	form_cat=Categorias_Form()
	return render_to_response("Question/categorias.html",{"form":form_cat},RequestContext(request))
def pregunta_view(request):
	if(request.method=="POST"):
		form_pre=Pregunta_Form(request.POST)
		if(form_pre.is_valid()):
			form_pre.save()
			return HttpResponseRedirect("/pregunta/")
	form_pre=Pregunta_Form()
	return render_to_response("Question/preguntas.html",{"form":form_pre},RequestContext(request))
def respuesta_view(request):
	if(request.method=="POST"):
		form_res=Respuestas_Opcionales_Form(request.POST)
		if(form_res.is_valid()):
			form_res.save()
			return HttpResponseRedirect("/respuesta/")
	form_res=Respuestas_Opcionales_Form()
	return render_to_response("Question/respuestas.html",{"form":form_res},RequestContext(request))
