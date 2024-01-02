from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Profile(models.Model):
    author = models.TextField(unique=True)
    password = models.TextField()
    
class Post(models.Model):
    author = models.TextField()
    parent = models.CharField(default='')
    text = models.TextField()
    date = models.TextField()
    likes = models.IntegerField(default=0)
    likers = models.ManyToManyField(Profile, blank=True)
    image = models.URLField(blank=True, max_length=500)