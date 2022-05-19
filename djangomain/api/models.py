from django.db import models

# Create your models here.
class Activity(models.Model):
    type = models.CharField(max_length=20, unique=True)
    cost = models.FloatField(default=0)
    location = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)