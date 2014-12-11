from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *

urlpatterns = patterns('',
    url(r'^categoria/', categoria_view),
    url(r'^pregunta/', pregunta_view),
    url(r'^respuesta/', respuesta_view),
    url(r'^gestion/', gestion_preguntas),
    url(r'^modificar/(?P<id>\d+)/$', modificar_pregunta),
    url(r'^eliminar/(?P<id>\d+)/$',eliminar_pregunta),
    
)