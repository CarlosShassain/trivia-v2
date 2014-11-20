from django.forms import ModelForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import *

class Categorias_Form(ModelForm):
	class Meta:
		model=Categorias
class Pregunta_Form(ModelForm):
	class Meta:
		model=Pregunta
class Respuestas_Opcionales_Form(ModelForm):
	class Meta:
		model=Respuestas_Opcionales