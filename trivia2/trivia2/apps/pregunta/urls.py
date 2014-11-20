from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *

urlpatterns = patterns('',
    url(r'^categoria/', categoria_view),
    url(r'^pregunta/', pregunta_view),
    url(r'^respuesta/', respuesta_view),
)