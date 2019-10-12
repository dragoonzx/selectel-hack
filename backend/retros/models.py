from django.db import models

# Create your models here.
class Users(models.Model):
    id = models.CharField(max_length = 100, primary_key = True)
    name = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)
