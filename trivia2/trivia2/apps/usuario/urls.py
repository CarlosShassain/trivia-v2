from django.conf.urls import patterns, include, url
from django.contrib import admin
from views import *

urlpatterns = patterns('',
    url(r'^$', index),
    url(r'^registro/$',registro_view),
    url(r'^login/$',login_view),
)