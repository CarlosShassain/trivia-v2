from django.db import models
from thumbs import ImageWithThumbsField
from django.contrib.auth.models import User
# Create your models here.
class Perfil(models.Model):	
	user=models.OneToOneField(User,unique=True)
	pais=models.CharField(max_length="30", null=False)
	avatar=ImageWithThumbsField(upload_to="img_user",sizes=((50,50),(200,200)))