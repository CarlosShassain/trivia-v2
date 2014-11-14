from django.shortcuts import render, render_to_response
from django.template import RequestContext

from django.contrib.auth.models import User

# Create your views here.
def index(request):
	usuarios=User.objects.all()
	return render_to_response("index/index.html",{'usuarios':usuarios},context_instance=RequestContext(request))