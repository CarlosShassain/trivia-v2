# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Categorias',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pregunta',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Titulo', models.CharField(max_length=150)),
                ('respuesta', models.CharField(max_length=150)),
                ('categoria', models.ManyToManyField(to='pregunta.Categorias')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Respuestas_Opcionales',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('resp1', models.CharField(max_length=150)),
                ('resp3', models.CharField(max_length=150)),
                ('resp2', models.CharField(max_length=150)),
                ('pregunta', models.ForeignKey(to='pregunta.Pregunta')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
