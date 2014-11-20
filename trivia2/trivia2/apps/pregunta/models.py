from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Categorias(models.Model):
	nombre=models.CharField(max_length=100)
	def __unicode__(self):
		return "->%s "%(self.nombre)
		
class Pregunta(models.Model):
	Titulo=models.CharField(max_length=150)
	respuesta=models.CharField(max_length=150)
	categoria=models.ManyToManyField(Categorias)
	def __unicode__(self):
		return "->%s "%(self.Titulo)

class Respuestas_Opcionales(models.Model):
	resp1=models.CharField(max_length=150)
	resp3=models.CharField(max_length=150)
	resp2=models.CharField(max_length=150)
	pregunta=models.ForeignKey(Pregunta)
