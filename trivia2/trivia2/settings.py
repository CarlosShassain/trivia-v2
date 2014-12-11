"""
Django settings for trivia2 project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'bei@m5j)vvk1h)#th%3j!=%tdkhk(42oxj*%di7ujn&v@9#tku'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'trivia2.apps.pregunta',
    'trivia2.apps.usuario',
    'captcha',
    #'social_auth',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'trivia2.urls'

WSGI_APPLICATION = 'trivia2.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME':'triviav2',
        'HOST':'127.0.0.1',
        'PORT':'3306',
        'USER':'root'
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-bo'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'

TEMPLATE_DIRS=(os.path.join(BASE_DIR,"trivia2/plantillas"),)
STATICFILES_DIRS=(os.path.join(BASE_DIR,"trivia2/static"),)
MEDIA_ROOT=os.path.join(BASE_DIR,'trivia2/media')

#Capcha
RECAPTCHA_PUBLIC_KEY = '6Lc6tf4SAAAAABs8hOYSHFNaEjx5KV-r1AfFIwjT'
RECAPTCHA_PRIVATE_KEY = '6Lc6tf4SAAAAAFn4vk-_7Grm6eBuKi6SoZJry7T6'


#facebook
#AUTHENTICATION_BACKENDS = (
 #   'social_auth.backends.google.GoogleOAuth2Backend',
  #  'social_auth.backends.facebook.FacebookBackend',
   # 'django.contrib.auth.backends.ModelBackend',  
#)
#FACEBOOK_APP_ID = '539064209560004'

#FACEBOOK_API_SECRET = '0a3b9982fc38723714affd8d62409000'

#ACCOUNT_ACTIVATION_DAYS=7

#FACEBOOK_EXTENDED_PERMISSIONS = ['email']

#LOGIN_REDIRECT_URL = '/'

#LOGIN_URL = '/account/login/'

#LOGIN_REDIRECT_URL = '/account/post_login/'

#<<<<<<< HEAD
#SESSION_SERIALIZER = 'django.contrib.sessions.serializers.PickleSerializer'
